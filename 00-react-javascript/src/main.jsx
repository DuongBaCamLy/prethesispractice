import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import Register from './pages/register.jsx'
import UserPage from './pages/user.jsx'  
import Homepage from './pages/home.jsx'        



import { createBrowserRouter, 
         RouterProvider } 
  from "react-router-dom";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        { index: true,
          element: <Homepage/> 
        },
        {
          path: "/user", 
          element: <UserPage/>
        },
        {
          path: "/Homepage", 
          element: <Homepage/>
        }
      ]
    },
    {    path: "/register", 
         element: <Register/>
    },
  ]);
    
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
