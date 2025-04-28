import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";

import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter.jsx';
import { Authprovider } from './context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
   <Authprovider>
   <RouterProvider router={AppRouter}/>
   <Toaster></Toaster>
   </Authprovider>
    
  </StrictMode>,
)
