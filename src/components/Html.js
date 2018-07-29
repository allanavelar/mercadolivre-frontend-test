/**
 * HTML BASE
 *
 * @author Allan Avelar <contact@allanavelar.com>
 * @license MIT
 */

import React from 'react'
import PropTypes from 'prop-types'

export default function Html(props) {
  return (
    <html>
      <head>
        <title>MercadoLivre Front-End Test - Allan Avelar</title>
        {props.cssFiles.map(file =>
          <link key={file} href={'/assets/' + file} rel="stylesheet"/>
        )}
      </head>
      <body>
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `window.INIT_STATE = ${JSON.stringify(props.INIT_STATE)}`,
        }} />
        <div id="app" dangerouslySetInnerHTML={{__html: props.markup}}></div>
        {props.jsFiles.map(file =>
          <script key={file} src={'/assets/' + file}></script>
        )}
      </body>
    </html>
  )
}

Html.propTypes = {
  cssFiles: PropTypes.arrayOf(PropTypes.string),
  INIT_STATE: PropTypes.object,
  jsFiles: PropTypes.arrayOf(PropTypes.string),
  markup: PropTypes.string,
}
