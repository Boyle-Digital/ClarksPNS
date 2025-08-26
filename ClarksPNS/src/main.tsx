// src/main.tsx
import { createRoot } from 'react-dom/client'   // ⬅️ named import
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <App />
)
