import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { ChosenThemeProvider, ThemeProvider } from '@/providers'
import App from './App'
import './syntax.css'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter basename='ui-components'>
      <ChosenThemeProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ChosenThemeProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
