/**
 * Main entry point for the React application.
 * 
 * This file sets up the React application by importing necessary libraries and components,
 * creating a root element, and rendering the main application component.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from "./config/router.jsx";
import '../src/style/sb-admin-2.css';
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient();

/**
 * Create a root element and render the main application component.
 * 
 * @returns {JSX.Element} - The main application component.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" reverseOrder={false}/> {/* Toast notifications */}
        <Router />
        {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </StrictMode>,
)