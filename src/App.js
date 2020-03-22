// Modules
import React, { Component } from 'react'

// Components
import Panel from './components/panel/Panel.js'
import Board from './components/board/Board.js'

// Utilities
import { upperCaseFirst } from './utilities/format.js'

// Data
import words from './data/languages/tr/words.json'
import language from './data/languages/tr/configuration.js'
import characters from './data/definitions/characters.js'

// State
const initialState = {
  started: false,
  ended: false,
  status: null,
  player: null,
  records: [],
  deck: []
}

// Application
class App extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
    this.configuration = {
      players: []
    }
    this.initiateGame = this.initiateGame.bind(this)
    this.generateGame = this.generateGame.bind(this)
    this.startGame = this.startGame.bind(this)
    this.evaluateMove = this.evaluateMove.bind(this)
    this.getOtherPlayer = this.getOtherPlayer.bind(this)
    this.switchPlayer = this.switchPlayer.bind(this)
    this.addRecord = this.addRecord.bind(this)
    this.setStatus = this.setStatus.bind(this)
    this.endGame = this.endGame.bind(this)
  }
  componentDidMount () {
    this.initiateGame()
  }
  initiateGame () {
    this.setState(initialState)
    this.generateGame()
  }
  generateGame () {
    // Get players
    this.configuration.players = Object.keys(characters).filter(character =>
      characters[character].isPlayer
    )
    let { players } = this.configuration
    // Shuffle players
    players.sort((a,b) => Math.random() - .5)
    // Create deck
    let deck = []
    Object.keys(characters).forEach(character => {
      let { count, color, isEndingGame = false } = characters[character]
      character === players[0] && count++
      for (let index = 0; index < count; index++) {
        deck.push({
          color,
          character,
          isEndingGame,
          id: `${character}/${index + 1}`,
          word: words.splice(Math.floor(Math.random() * words.length), 1)[0],
          isFlipped: false
        })
      }
    })
    // Shuffle deck
    deck.sort((a,b) => Math.random() - .5)
    // Set final data
    this.setState({
      deck,
      player: players[0]
    })
    // Set status
    this.setStatus(language.gameReadyText)
  }
  startGame () {
    let { player } = this.state
    this.setState({
      started: true
    })
    // Set status
    this.setStatus(
      language.statusText(
        'switched',
        language.players[player].displayName
      ),
      characters[player].color
    )
  }
  evaluateMove (index) {
    const { deck, player } = this.state
    const { players } = this.configuration
    // Get other player
    const otherPlayer = this.getOtherPlayer(player)
    // Flip item
    deck[index] = {
      ...deck[index],
      isFlipped: true
    }
    this.setState({ deck })
    // Add record
    this.addRecord(deck[index].word, player, player === deck[index].character)
    // Evaluate
    if (deck[index].isEndingGame) {
      this.endGame(otherPlayer)
    } else if (
      players.includes(deck[index].character) &&
      deck.filter(item =>
        item.character === deck[index].character && !item.isFlipped
      ).length === 0
    ) {
      this.endGame(deck[index].character)
    } else if (deck[index].character !== player) {
      this.setStatus(
        language.statusText(
          'switched',
          language.players[otherPlayer].displayName
        ),
        characters[otherPlayer].color
      )
      this.setState({
        player: otherPlayer
      })
    }
  }
  getOtherPlayer (player) {
    const { players } = this.configuration
    return players[1 - players.indexOf(player)]
  }
  switchPlayer () {
    const player = this.getOtherPlayer(this.state.player)
    this.setState({ player })
    this.setStatus(
      language.statusText('switched', language.players[player].displayName),
      characters[player].color
    )
  }
  addRecord (word, player, isSuccessful) {
    this.setState({
      records: [
        ...this.state.records,
        { word, player, isSuccessful }
      ]
    })
  }
  setStatus (text, color = 'black') {
    this.setState({
      status: { text, color }
    })
  }
  endGame (winner) {
    this.setState({
      ended: true
    })
    this.setStatus(
      `${
        language.gameOverText
      } ${
        upperCaseFirst(
          language.statusText('won', language.players[winner].displayName)
        )
      }`,
      characters[winner].color
    )
  }
  render () {
    let { started, ended, status, deck, records } = this.state
    let { players } = this.configuration
    return (
      <div
        className="app"
        lang={language.code}>
        <Board
          deck={deck}
          disabled={!started || ended}
          evaluate={this.evaluateMove} />
        <Panel
          status={status}
          language={language}
          restart={this.initiateGame}
          {...(started
            ? {
            records: {
              categories: players.map(player => ({
                id: player,
                label: language.players[player].displayName
              })),
              data: records
            },
            switch: this.switchPlayer
          }
          : {
            instructions: {
              text: language.priorInstructionsText,
              table: deck.map(item => item.color)
            },
            start: this.startGame
          }
        )} />
      </div>
    )
  }
}

// Export
export default App
