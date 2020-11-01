import React from 'react'
import { render } from 'react-dom'
import App from './app'
import 'leaflet/dist/leaflet.css'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { mainTheme } from 'Config/Config.theme'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
  }
`

render(
  <ThemeProvider theme={mainTheme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
)
