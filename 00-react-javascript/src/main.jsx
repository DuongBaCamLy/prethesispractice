import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import Register from './pages/register.jsx'
import UserPage from './pages/user.jsx'  
import Homepage from './pages/home.jsx'        
import LoginPage from './pages/login.jsx'



import { createBrowserRouter, 
         RouterProvider } 
  from "react-router-dom";
import { AuthWrapper } from './component/context/auth.context.jsx'


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
    {    path: "/Login", 
         element: <LoginPage/>
    },
  ]);
    
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
    <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>,
)
