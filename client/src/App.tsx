import React, { useState } from 'react';
import {BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import './App.css';
import ChangePassword from './components/ChangePassword';
import CheckoutSuccess from './components/CheckoutSuccess';
import ForgotPassword from './components/ForgotPassword';
import { useAppSelector } from './hooks';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Sign from './pages/Sign';
import SingleProduct from './pages/SingleProduct';


const App=()=>{
  const user =useAppSelector((state=>state.user.currentUser ));
  const [show,setShow] = useState()
  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={user?<Home/>:<Navigate to="/register" />}>
        </Route>
        <Route path='/products/:catergory' element={<ProductList/>}>
        </Route>       
        <Route path='/product/:id' element={<SingleProduct/>}>
        </Route>
        <Route path='/cart' element={<Cart/>}>
        </Route>
        <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
        <Route path='/login' element={user ? <Navigate to="/" replace /> :  <Sign />} >
        </Route>
        <Route path='/register' element={user ? <Navigate to="/" replace /> :  <Register />} >
        </Route>
        <Route path='/otp' element={ <ForgotPassword show={show} setShow={setShow}/>} >
        </Route>
        <Route path='/changepassword' element={ <ChangePassword show={show} setShow={setShow}/>} >
        </Route>
      </Routes>
      </BrowserRouter> 

    </div>
  );
}

export default App;
