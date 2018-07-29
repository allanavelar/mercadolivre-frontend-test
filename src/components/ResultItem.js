/**
 * Result Item
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

export default function ResultItem(props) {
  return (
    <div className="result-item">
      <Link to={`/items/${props.id}`}>
        <div className="result-item-inner row">
          <div>
            <img src={props.picture.replace(/I.jpg/g,"P.jpg")} />
          </div>
          <div className="col info">
            <div>
              <span className="price">
                $ {props.price.amount.toLocaleString()}
              </span>
              {props.free_shipping &&
                <span className="free-shipping-image">free shipping</span>}
              <span className="state_name">
                {props.state_name}
              </span>
            </div>
            <div className="title">{props.title}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

ResultItem.propTypes = {
  id: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  free_shipping: PropTypes.bool,
  price: PropTypes.shape({
    amount: PropTypes.number,
  }),
  state_name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
