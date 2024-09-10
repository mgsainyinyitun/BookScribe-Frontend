import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { CtxProvider } from './Ctx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <CtxProvider>
        <App />
      </CtxProvider>
  </StrictMode>,
)
