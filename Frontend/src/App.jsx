import { useState } from 'react'
import AllRoutes from './routes/AllRoutes'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <AllRoutes/>
    <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  )
}

export default App
