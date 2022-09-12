import React,{useContext} from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

/* react toast */
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

/* component */
import Navbar from './screens/Navbar';
import Home from './screens/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import AdminDashboard from './Admin/AdminDashboard';
import Pnf from './util/Pnf';
import { GlobalContext } from './../GlobalContext';
import ProtectedRoute from './middleware/ProtectedRoute';
import Orders from './screens/Orders';
import Profile from './screens/Profile';
import Menu from './screens/Menu';

import ProductDetails from './Product/ProductDetails';
import CreateProduct from './Admin/CreateProduct';
import Cart from './Product/Cart';
import Offers from './screens/Offers';
import Checkout from './Product/Checkout';
import Orderlist from './Admin/Orderlist';
import AllUsers from './Admin/AllUsers';
import UpdateProduct from './Admin/UpdateProduct';
import Editprofile from './screens/Editprofile';
import Recover from './Auth/Recover';


function Main(props) {
  const context = useContext(GlobalContext)

  const [isLogged,setIsLogged] = context.authApi.isLogged;
  const [isAdmin,setIsAdmin] = context.authApi.isAdmin;
  const [isUser,setIsUser] = context.authApi.isUser;


  return (
    <Router>
        <Navbar />
        <ToastContainer autoClose={1500} position='top-center'/>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/menu'} element={<Menu/>}/>
            <Route path={'/offers'} element={<Offers/>}/>
            
            <Route path={'/login'} element={isLogged ? <Pnf/> : <Login/>}/>
            <Route path={'/recover'} element={isLogged ? <Pnf/> : <Recover/>}/>
            <Route path={'/register'} element={isLogged ? <Pnf/> : <Register/>}/>            

            <Route path={'/admin/dashboard'} element={
              <ProtectedRoute auth={isLogged}>
                <AdminDashboard/>
              </ProtectedRoute>
            }/>
            <Route path={'/admin/allOrders'} element={
              <ProtectedRoute auth={isLogged}>
                <Orderlist/>
              </ProtectedRoute>
            }/>
            <Route path={`/admin/allUsers`} element={
                                                        <ProtectedRoute  auth={isLogged} >
                                                                  <AllUsers/>
                                                          </ProtectedRoute>
                                                      }  />
              <Route path={`/product/update/:id`} element={
                                                        <ProtectedRoute  auth={isLogged} >
                                                                  <UpdateProduct/>
                                                          </ProtectedRoute>}/>            
            <Route path={'/profile'} element={
              <ProtectedRoute auth={isLogged}>
                <Profile/>
              </ProtectedRoute>
            }/>

            <Route path={'/editprofile/:id'} element={
                          <ProtectedRoute auth={isLogged}>
                            <Editprofile/>
                          </ProtectedRoute>
                        }/>

            <Route path={'/orders'} element={
              <ProtectedRoute auth={isLogged}>
                <Orders/>
              </ProtectedRoute>
            }/>

            <Route path={'/product/details/:id'} element={
              <ProtectedRoute auth={isLogged}>
                <ProductDetails/>
              </ProtectedRoute>
            }/>

            <Route path={'/product/create'} element={
              <ProtectedRoute auth={isLogged}>
                <CreateProduct/>
              </ProtectedRoute>
            }/>
            <Route path={`/product/cart`} element={
              <ProtectedRoute auth={isLogged}>
                <Cart/>
              </ProtectedRoute>
            }/>
            <Route path={`/checkout`} element={
              <ProtectedRoute  auth={isLogged} >
                  <Checkout/>
              </ProtectedRoute>
            }  />

            <Route path={'/*'} element={<Pnf/>}/>
        </Routes>
        

    </Router>
  )
}

export default Main