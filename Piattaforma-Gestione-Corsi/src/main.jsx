import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StoreProvider } from './state/user/StoreProvider';

import { Protected } from './components/Protected/Protected';

import { MainLayout } from './Layouts/MainLayout';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import { Corsi } from './pages/Corsi/Corsi';
import { Utenti } from './pages/Utenti/Utenti';
import { ProfiloUtente } from './pages/ProfiloUtente/ProfiloUtente';
import { Logs } from './pages/Logs/Logs';
import { NotFound } from './pages/NotFound/NotFound';

const router = createBrowserRouter([
  {
    element:  <StoreProvider>
                <MainLayout />
              </StoreProvider>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Login",
        element: <Login />
      },
      {
        path: "/Signup",
        element: <Signup />
      },
      {
        path: "/Corsi",
        element: <Corsi />
      },
      {
        path: "admin/",
        children: [
          {
            path: "Utenti",
            element: (
              <Protected>
                <Utenti />
              </Protected>
            )
          },
          {
            path: "Logs",
            element: (
              <Protected>
                <Logs />
              </Protected>
            )
          },
        ]
      },
      {
        path: "/ProfiloUtente",
        element:  
            <Protected>
              <ProfiloUtente />
            </Protected>,
        
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = { router } />
)