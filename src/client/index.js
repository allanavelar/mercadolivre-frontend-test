/* eslint-env browser */
import { Router, browserHistory } from 'react-router'
import React from 'react'
import Routes from '../components/Routes'
import { render } from 'react-dom'

render(
  <Router routes={Routes()} history={browserHistory}/>,
  document.getElementById('app')
)
