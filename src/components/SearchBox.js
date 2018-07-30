/**
 * Search Box
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import React from 'react'
import { Link } from 'react-router'
import { routerShape } from 'react-router/lib/PropTypes'

export default class SearchBox extends React.Component {

  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(event) {
    event.preventDefault()
    this.props.router.push({
      pathname: '/items',
      query: { search: this.refs.search.value },
    })
  }

  render() {
    return (
      <nav className="search-box navbar navbar-light">
        <div className="container">
          <div className="row">
            <Link className="logo" to="/">
              <span className="brand-image">Mercado Libre</span>
            </Link>
            <form className="form-inline col" onSubmit={this.handleSearch}
                  action="/items">
              <div className="input-group">
                <input ref="search" className="form-control" type="text"
                       name="search" placeholder="Nunca dejes de buscar"
                       defaultValue={this.props.router.location.query.search} />
                <button className="input-group-addon">
                  <span className="search-image">Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    )
  }

}

SearchBox.propTypes = {
  router: routerShape.isRequired,
}
