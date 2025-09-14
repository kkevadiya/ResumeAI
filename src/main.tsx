import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ResumeProvider } from './contexts/ResumeContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx'; // Import the new provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap everything with AuthProvider */}
    <AuthProvider>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </AuthProvider>
  </React.StrictMode>,
)