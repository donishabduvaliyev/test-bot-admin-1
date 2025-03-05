import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Router } from 'react-router-dom'
import { ItemsContext } from './contex.jsx'
import RouterPage from './Router.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter >
    <ItemsContext>
      <StrictMode>
        <RouterPage />
      </StrictMode>
    </ItemsContext>
  </BrowserRouter>
)
