import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import CheckAuth from './components/CheckAuth.jsx';
// Pages
import Landing from './pages/Landing.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import TicketDetailsPage from './pages/Ticket.jsx';
import Tickets from './pages/Tickets.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/dashboard",
    element: 
    <CheckAuth protected={true} >
      <Tickets />
    </CheckAuth>
  },{
    path: "/ticket/:id",
    element: 
    <CheckAuth protected={true} >
      <TicketDetailsPage />
    </CheckAuth>
  },
  {
    path: "/login",
    element: 
    <CheckAuth protected={false} >
      <Login />
    </CheckAuth>
  },
  {
    path: "/signup",
    element: 
    <CheckAuth protected={false} >
      <Signup />
    </CheckAuth>
  },
  {
    path: "/admin",
    element: 
    <CheckAuth protected={true} >
      <Admin />
    </CheckAuth>
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
