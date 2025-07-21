import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

//components import:-
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import HomePage from './components/HomePage.jsx'
import Profile from './components/Profile.jsx'
import LandingPage from './components/LandingPage.jsx'
import Post from './components/Post.jsx'
import PostDetails from './components/PostDetails.jsx'
import EditPost from './components/EditPost.jsx'

const router = createBrowserRouter([
  {
  path: '/',
  element: <App />,
  children:[
    {
      path:"/",
      element:<HomePage />
    },
    {
      path:"/signup",
      element:<Signup />
    },
    {
      path:"/login",
      element:<Login />
    },
    {
      path:"/profile",
      element:<Profile />
    },
    {
      path:"/landingPage",
      element:<LandingPage/>
    },
    {
      path:"/post",
      element:<Post/>
    },
    {
      path:"/post/:id",
      element:<PostDetails/>
    },
    {
      path:"/postedit/:id",
      element:<EditPost />
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router ={router} />
    </AuthProvider>
  </StrictMode>,
)
