/**
 * Breadcrumb
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import React from 'react'
import PropTypes from 'prop-types'

export default function Breadcrumb({ categories }) {
  return (
    <div className="breadcrumb">
      {categories.map((category, i) =>
        <li className="breadcrumb-item" key={i}>{category}</li>
      )}
    </div>
  )
}

Breadcrumb.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}
