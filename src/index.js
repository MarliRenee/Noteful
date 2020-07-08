import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App/App'

library.add(faPlus, faTrashAlt, faCheckDouble)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
