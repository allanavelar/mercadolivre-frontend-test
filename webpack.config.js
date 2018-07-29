/* eslint-env node */
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { join } from 'path'
import webpack from 'webpack'

const { NODE_ENV } = process.env,
  development = NODE_ENV === 'development'

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: development,
})

const config = {
  devtool: development && 'cheap-eval-source-map',
  entry: [
    './src/client/style.scss',
    './src/client/index',
  ],
  output: {
    filename: '[name].[hash].js',
    path: join(__dirname, 'dist', 'assets'),
    publicPath: '/assets/',
  },
  module: {
    rules: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: [ 'babel-loader' ],
    }, {
      test: /\.scss$/,
      loader: extractSass.extract({
        use: [ {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader',
        } ],
        // use style-loader in development
        fallback: 'style-loader',
      }),
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'url-loader',
      options: {
        limit: 30000,
        name: '[name]-[hash].[ext]',
      },
    } ],
  },
  plugins: [
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify('/api/'),
      'process.env.IS_BROWSER': JSON.stringify(true),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    extractSass,
  ],
}

if (development) {
  config.entry.unshift('webpack-hot-middleware/client?reload=true')
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

export default config
