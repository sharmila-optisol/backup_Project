import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/Topbar';
import "./app.css"
import Home from './pages/home/Home';
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import UserLis from './pages/userlist/UserLis';
import User from './pages/user/User';
import NewProduct from './pages/newproduct/NewProduct';
import ProductList from './pages/productlist/ProductList';
import Product from './pages/product/Product';
import Login from './pages/login/Login';

function App() {
  const admin = JSON.parse(localStorage.getItem("persist:root"))
  console.log("admin:",admin)
  return (
    
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login />}>
          </Route>
    </Routes>
   
    {admin && (<><Topbar />
   <div className="container">
      <Sidebar />
      <Routes>
        <Route  path="/" element={ <Home />}>
         </Route>
         <Route path="/users" element={<UserLis />}>
        </Route>
        <Route path="/user/:userId" element={<User />}>
        </Route>
        {/* <Route path="/newUser" element={<NewUser />}>
        </Route> */}
        <Route path="/products" element={ <ProductList />}>
        </Route>
        <Route path="/product/:productId" element={<Product />}>
        </Route>
        <Route path="/newproduct" element={<NewProduct />}>
          </Route>
      
          </Routes>
    </div>
    </>
   ) }
  </BrowserRouter>
  )}   


export default App;
