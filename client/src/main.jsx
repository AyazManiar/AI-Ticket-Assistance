import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import CheckAuth from './components/checkAuth.jsx';
// Pages
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import TicketDetailsPage from './pages/Ticket.jsx';
import Tickets from './pages/Tickets.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    Component: 
    <CheckAuth protected={true} >
      <Tickets />
    </CheckAuth>
  },{
    path: "/ticket/:id",
    Component: 
    <CheckAuth protected={true} >
      <TicketDetailsPage />
    </CheckAuth>
  },
  {
    path: "/login",
    Component: 
    <CheckAuth protected={false} >
      <Login />
    </CheckAuth>
  },
  {
    path: "/signup",
    Component: 
    <CheckAuth protected={false} >
      <Signup />
    </CheckAuth>
  },
  {
    path: "/",
    Component: 
    <CheckAuth protected={true} >
      <Ticket />
    </CheckAuth>
  },
  {
    path: "/admin",
    Component: 
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
