import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import { ItemsContext } from './contex.jsx'
import RouterPage from './Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ItemsContext>
        <RouterPage />
      </ItemsContext>
    </BrowserRouter>
  </StrictMode>
)

