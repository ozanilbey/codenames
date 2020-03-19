// Modules
import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

// Component: Card
const Card = props => (
  <div className="card">
    <div
      className={
        (props.isFlipped ? 'flipped ' : '') +
        "container"
      }
      onClick={props.onClick}>
      <div className="front">{props.word}</div>
      <div
        className="back"
        style={{
          backgroundImage: `url("images/characters/${props.id}.png")`
        }}>
      </div>
    </div>
  </div>
)

// Type checks
Card.propTypes = {
  id: PropTypes.string,
  word: PropTypes.string,
  isFlipped: PropTypes.bool,
  onClick: PropTypes.func
}

// Export
export default Card
