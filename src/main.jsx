import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from "./router.jsx";
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '../src/style/sb-admin-2.css';
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" reverseOrder={false}/> {/* Toast notifications */}
        <Router />
        {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </StrictMode>,
)
