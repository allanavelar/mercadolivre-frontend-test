/**
 * View - Item
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'react-router/lib/PropTypes'
import padStart from 'lodash/padStart'
import sample from 'lodash/sample'

import * as api from '../components/api'
import Breadcrumb from '../components/Breadcrumb'
import SearchBox from '../components/SearchBox'
import View from './View'

export default class Item extends View {

  constructor(props, context) {
    super(props, context)
    this.handleBuy = this.handleBuy.bind(this)
    this.state = this._getInitState('Item') || { categories: [] }
  }

  componentDidMount() {
    this.setData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.router.params.id !== this.props.router.params.id) {
      this.setData()
    }
  }

  setData() {
    this.fetchData().then(data => this.setState(() => data))
  }

  fetchData() {
    return api.fetchItem(this.props.router.params.id)
  }

  handleBuy() {
    this.refs.buy.innerHTML = sample([
      'Buy Now',
      'Comprar',
      'Comprare',
      'Acheter',
    ])
  }

  render() {
    const { item } = this.state
    return (
      <div className="item">
        <SearchBox router={this.props.router} />
        <div className="container">
          <Breadcrumb categories={this.state.categories} />
          {item &&
            <div className="view-content">
              <div className="row">
                <div className="col text-center">
                  <img src={item.picture} />
                </div>
                <div className="col-3">
                  <div className="cond-sold">
                    {item.condition === 'new' ? 'Novo' : 'Usado'}
                    {' '}- {item.sold_quantity}
                    {item.sold_quantity === 1 ? ' vendido' : ' vendidos'}
                  </div>
                  <div className="title">{item.title}</div>
                  <div className="price">
                    R$ {Math.floor(item.price.amount).toLocaleString()}
                    <span>{padStart(item.price.decimals, 2, '0')}</span>
                  </div>
                  <button ref="buy" className="btn btn-primary btn-block"
                          onClick={this.handleBuy}>Comprar</button>
                </div>
                <div className="description col-12">
                  <label>Descrição do vendedor</label>
                  <div dangerouslySetInnerHTML={{
                    __html: item.description.replace(/\n/g,"<br />") }}
                  ></div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }

}

Item.contextTypes = {
  data: PropTypes.object,
}

Item.propTypes = {
  router: routerShape,
}
