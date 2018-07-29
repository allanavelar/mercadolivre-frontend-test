/**
 * Routes
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import React from 'react'
import { IndexRoute, Route } from 'react-router'

import Results from '../views/Results'
import Search from '../views/Search'
import Item from '../views/Item'

export default function Routes() {
  return (
    <Route path="/">
      <IndexRoute component={Search} />
      <Route path="items" component={Results} />
      <Route path="items/:id" component={Item} />
    </Route>
  )
}
