import { RouterProvider } from 'react-router-dom'
import { router } from './router/index'

import { Toaster } from './components/sonner'

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <RouterProvider router={router} />
    </>
  )
}