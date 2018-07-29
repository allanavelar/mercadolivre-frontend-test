/**
 * Data Provider
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import React from 'react'
import PropTypes from 'prop-types'
import { RouterContext } from 'react-router'

export default class DataProvider extends React.Component {

  getChildContext() {
    return { data: this.props.data }
  }

  render() {
    return <RouterContext {...this.props}/>
  }

}

DataProvider.propTypes = {
  data: PropTypes.object,
}

DataProvider.childContextTypes = {
  data: PropTypes.object,
}
