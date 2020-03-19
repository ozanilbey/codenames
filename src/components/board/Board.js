// Modules
import React from 'react'
import PropTypes from 'prop-types'

// Components
import Card from '../card/Card.js'

// Styles
import './Board.css'

// Component: Board
const Board = props => (
  <main
    className={
      (props.disabled ? 'disabled ' : '') +
      'board'
    }>
    {props.deck && props.deck.length > 0 &&
      <div className="collection">
        {props.deck.map((item, index) =>
          <Card
            key={index}
            {...item}
            onClick={() => !item.isFlipped &&
              props.evaluate(index)
            } />
        )}
      </div>
    }
  </main>
)

// Type checks
Board.propTypes = {
  deck: PropTypes.array,
  disabled: PropTypes.bool,
  evaluate: PropTypes.func
}

// Export
export default Board
