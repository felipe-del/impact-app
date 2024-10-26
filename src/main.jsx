import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import { Routes } from './config/routes'
import { UserProvider } from './context/userContext'
import '../src/style/sb-admin-2.css';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={Routes}/>
    </UserProvider>
  </React.StrictMode>
)
