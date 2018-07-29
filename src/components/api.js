/**
 * API Fetch
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import { stringify } from 'querystring'

const { PORT=3000 } = process.env
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${PORT}/api/`

function fetchData(url) {
  return fetch(API_BASE_URL + url).then(res => res.json())
}

export function fetchItem(id) {
  return fetchData('item/' + id)
}

export function searchItems(q) {
  return fetchData('items?' + stringify({ q }))
}
