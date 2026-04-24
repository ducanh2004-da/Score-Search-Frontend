import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './configs/query-client.config';
import reactArrayToTree from 'react-array-to-tree'
import App from './App.tsx'
import './index.css'


const isProduction = import.meta.env.PROD || 'production'

if (!isProduction && typeof window !== 'undefined') {
  import('react-scan').then(({ scan }) => {
  scan({
      enabled: true
    })
  }).catch(err => {
    console.error('Failed to load react-scan:', err)
  })
}

const Provider = reactArrayToTree([
  <QueryClientProvider key="query-client" client={queryClient}>{null}</QueryClientProvider>,
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
)