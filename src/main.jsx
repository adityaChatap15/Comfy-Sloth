import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import { ContextProvider } from './context/ContextProvider'
import { AuthProvider } from "./context/ContextProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
