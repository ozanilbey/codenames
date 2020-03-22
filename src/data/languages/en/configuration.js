export default {
  code: 'tr',
  players: {
    'blue-agent': { displayName: 'blue agents' },
    'red-agent': { displayName: 'red agents' }
  },
  newGameText: 'new game',
  startGameText: 'start game',
  endTurnText: 'end turn',
  gameReadyText: 'Starting game...',
  gameOverText: 'Game over!',
  priorInstructionsText: 'Take a photo of this table or memorize it since this is the first and the last time you see it.',
  statusText: (state, player) => {
    if(state === 'won') {
      return `${player} wins!`
    } else if(state === 'switched') {
      const suffix = player.slice(-1) === 's' ? '' : 's'
      return `${player}'${suffix} turn`
    } else {
      return ''
    }
  }
}
