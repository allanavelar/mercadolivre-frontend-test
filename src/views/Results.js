/**
 * View - Results
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import React from 'react'
import PropTypes from 'prop-types'
import { locationShape, routerShape } from 'react-router/lib/PropTypes'
import assign from 'lodash/assign'

import * as api from '../components/api'
import Breadcrumb from '../components/Breadcrumb'
import ResultItem from '../components/ResultItem'
import SearchBox from '../components/SearchBox'
import View from './View'

export default class Results extends View {

  constructor(props, context) {
    super(props, context)
    this.state = this._getInitState('Results') || { categories: [], items: [] }
  }

  componentDidMount() {
    this.searchItems()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.query.search !== this.props.location.query.search) {
      this.searchItems()
    }
  }

  fetchData() {
    const { search } = this.props.location.query
    return api.searchItems(search)
  }

  searchItems() {
    const { search } = this.props.location.query
    this.fetchData()
    .then(results => {
      this.setState(() => assign(results, { search }))
    })
  }

  render() {
    return (
      <div className="results">
        <SearchBox router={this.props.router} />
        <div className="container">
          <Breadcrumb categories={this.state.categories} />
          <div className="view-content">
            {this.state.items.map(result =>
              <ResultItem key={result.id} {...result} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

Results.contextTypes = {
  data: PropTypes.object,
}

Results.propTypes = {
  router: routerShape,
  location: locationShape,
}
