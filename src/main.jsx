import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import { Routes } from './config/routes'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Routes}/>
  </React.StrictMode>
)
