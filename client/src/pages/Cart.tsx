import React, { useEffect } from 'react'
import Annoncement from '../components/Annoncement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './Productlist.css'
import PayButton from '../components/PayButton'
import { useAppSelector,useAppDispatch} from '../hooks'
import { decreaseCart,increaseCart, getTotal, clearCart } from '../redux/cartRedux'

const Cart = () => {
    const cart = useAppSelector(state=>state.cart)
    const dispatch = useAppDispatch()
    
    useEffect(()=>{
        //@ts-expect-error
        dispatch(getTotal());
    },[cart,dispatch])
   const handleClearCart =()=>{
   
     dispatch(clearCart())
   }
    const handleDecrease =(product)=>{
        console.log("hi")
      dispatch(decreaseCart(product));
    }
    const handleIncrease =(product)=>{
        dispatch(increaseCart(product))
    }
  return (
    <div className='cartcontain'>
        <Navbar/>
        <Annoncement/>
        <div className='cartwrapper'>
            <div className='carttitle'><h1>YOUR DRESS</h1></div>
            {cart.products.length === 0 ? (
                <div className='cart-empty'>
                    <p>your cart is currently empty</p>
                </div>
            ):(
                <div className='bottom'>
                <div className='infocart'>
                   { cart.products.map(product=>(<div className='cartproduct'>
                        <div className='cartdetail'>
                            <img className="cartimage" src={product.img} alt="img"/>
                            <div className='details'>
                                <div className='productname'><b>Product:</b>{product.title}</div>
                                <div className='productid'><b>ID</b>{product._id}</div>
                                <div className='productcolorcart'>{product.color}</div>
                                <div className='productsizecart'><b>Size:</b>{product.size}</div>
                           </div>
                           
                        </div>        
                        <div className='pricedetail'>
                            <div className='cartamountcontainer'>
                            <i className="fa fa-plus" aria-hidden="true" onClick={()=>handleIncrease(product)}></i>
                             <div className='cartamount'>{product.quantity}</div>
                            <i className="fa fa-minus" aria-hidden="true"onClick={()=>handleDecrease(product)}></i>
                            </div>
                            <div className='cartpriceamount'>{product.price*product.quantity}</div>
                        </div>
                    </div>
                    ))} 
                     {/* <div className='hr'></div> */}
                </div>

            </div>
            )}
            <div className='cart-summary'>
              <button className='summarybutton'onClick={()=>handleClearCart()} >clear cart</button>
                <div className='hr'></div>
                  <div className='hr'></div>
              <div className='summarycart'>
      
                    <div className='summarytitle'><h2>ORDER SUMMARY</h2></div>
                    <div className='summaryitems'>
                        <div className='summaryitemtext'>Subtotal</div>
                        <div className='summaryitemprice'>$ {cart.cartAmount}</div>
                    </div>
                    <PayButton cartItems ={cart.products}/>
                   {/* <button className='summarybutton'>CHECKOUT NOW</button> */}
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default Cart