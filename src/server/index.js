/**
 * NODE SERVER
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import _ from 'lodash'
import api from './api'
import express from 'express'
import fetch from 'node-fetch'
import reactEndpoint from './reactEndpoint'
import { resolve } from 'path'
import fs from 'fs'

const { NODE_ENV, PORT=3000 } = process.env
global.fetch = fetch

const app = express()
  .disable('x-powered-by')
  .use('/api', api)

if (NODE_ENV !== 'production') {
  const webpack = require('webpack'),
    webpackMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('../../webpack.config').default,
    compiler = webpack(config),
    middleware = webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    })

  let assets = []
  compiler.plugin('done', function(stats) {
    assets = _.entries(stats.compilation.assets)
              .map(([ fileName ]) => fileName)
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.use(function(req, res, next) {
    req.cssFiles = assets.filter(fileName => fileName.endsWith('.css'))
    req.jsFiles = assets.filter(fileName => fileName.endsWith('.js'))
    next()
  })
} else {

  const assetsDir = resolve('dist/assets'),
    assets = fs.readdirSync(assetsDir),
    cssFiles = assets.filter(f => f.endsWith('.css')),
    jsFiles = assets.filter(f => f.endsWith('.js'))

  app.use('/assets', express.static(assetsDir))
  .use(function(req, res, next) {
    _.assign(req, { jsFiles, cssFiles })
    next()
  })
}

app.use(reactEndpoint)
  .listen(PORT)
