// Modules
import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './Records.css'

// Component: Records
const Records = props => (
  <div className="records">
    {props.categories.map((category, listIndex) =>
      <ul
        key={listIndex}
        className="list">
        {props.data.filter(record => record.player === category.id).length > 0 &&
          <li className="label item">{category.label}</li>
        }
        {props.data
          .filter(record => record.player === category.id)
          .map((record, index) =>
            <li
              key={index}
              className="item">
              <b className="result">{record.isSuccessful ? '✓' : '✗'}</b>
              <span>{record.word}</span>
            </li>
          )
        }
      </ul>
    )}
  </div>
)

// Type checks
Records.propTypes = {
  categories: PropTypes.array,
  data: PropTypes.array
}

// Export
export default Records
