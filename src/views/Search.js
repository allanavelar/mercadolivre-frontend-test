/**
 * View - Search
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import React from 'react'
import { routerShape } from 'react-router/lib/PropTypes'

import SearchBox from '../components/SearchBox'

export default class Search extends React.Component {

  render() {
    return (
      <div>
        <SearchBox router={this.props.router} />
      </div>
    )
  }

}

Search.propTypes = {
  router: routerShape,
}
