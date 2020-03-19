// Modules
import React from 'react'
import PropTypes from 'prop-types'

// Components
import Records from '../records/Records.js'

// Styles
import './Panel.css'

// Component: Panel
const Panel = props => (
  <aside className="panel">
    <b className="name">Codenames</b>
    {props.status &&
      <div
        className="status"
        style={{ color: props.status.color || 'black' }}>
        {props.status.text || ''}
      </div>
    }
    {props.instructions &&
      <div className="instructions">
        {props.instructions.text &&
          <p className="text">{props.instructions.text}</p>
        }
        {props.instructions.table &&
          <div className="table">
            {props.instructions.table.map((color, index) =>
              <div
                key={index}
                className="item"
                style={{ backgroundColor: color }}>
              </div>
            )}
          </div>
        }
      </div>
    }
    {props.records &&
      <Records
        categories={props.records.categories}
        data={props.records.data} />
    }
    <div className="options">
      {props.start &&
        <button
          className="restart"
          onClick={props.start}>
          {props.language.startGameText}
        </button>
      }
      {props.switch &&
        <button
          className="switch"
          onClick={props.switch}>
          {props.language.endTurnText}
        </button>
      }
      {props.restart &&
        <button
          className="restart"
          onClick={props.restart}>
          {props.language.newGameText}
        </button>
      }
    </div>
  </aside>
)

// Type checks
Panel.propTypes = {
  status: PropTypes.object,
  language: PropTypes.object,
  records: PropTypes.object,
  instructions: PropTypes.object,
  restart: PropTypes.func,
  start: PropTypes.func,
  switch: PropTypes.func
}

// Export
export default Panel
