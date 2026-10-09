import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ModalProvider } from '@kolkrabbi/kol-component/molecules/Modal'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* the KOL dialog for every prompt/confirm — the explorer's verbs and the upload question */}
    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>,
)
