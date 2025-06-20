import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginSystem from './LoginSystem'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginSystem />
  </StrictMode>,
)
