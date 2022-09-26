import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Annoncement from '../components/Annoncement';
import './Productlist.css'
import { useLocation } from 'react-router-dom'
import { baseRequest } from '../requestMethod'
import { addProduct } from '../redux/cartRedux'
import { useAppDispatch, } from '../hooks'
import { formatCurrency } from '../uitilities/formatCurrency';
import {FaStar} from "react-icons/fa"
import axios from 'axios';


const SingleProduct =  () => {  
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product , setProduct]= useState([]);
    const[rating ,setRating] =useState(null) ;
    const[comment ,setComment] =useState("") ;
    const[hover,setHover] =useState(null) ;
    const [quantity,setQuantity] = useState(1);
    const dispatch = useAppDispatch();
 
  useEffect(()=>{
    const getProduct =async ()=>{
        try{
          const res:any = await baseRequest.get("/products/find/" +id);
          setProduct(res.data);
        }catch(err){

        }
    }
    getProduct();
},[id])
  //add to cart clicking
  const handleClick =(product)=>{
    dispatch(addProduct({...product,quantity}))
  }
  const reviewClick=async(e)=>{
    e.preventDefault();
    await axios.post(`http://localhost:4000/api/product/${id}/review`,{rating,comment})
    alert("Rated Successfully")
  }
  return (
    <div className='singleContain'>
        <Navbar/>
        <Annoncement/>
        <div className='wrappersingle'>
            <div className='imgcontain'>
                {//@ts-expect-error
                <img src={product.img} className='singleimage' alt="img" />}
            </div>
            <div className='singleInfo'>
                   {//@ts-expect-error
                <div className='singleTitle'><h1>{product.title}</h1></div>}
                  {//@ts-expect-error
                <div className='singledesc'><h3>{product.desc}</h3></div>}
                  {//@ts-expect-error
                <div className='singleprice'>{formatCurrency(product?.price)}</div>}
                <div className='addcontainer'>
                    <button className='buttoncontainer'onClick={()=>handleClick(product)}>ADD TO CART</button>
                </div>
                <br></br>
        <div className='row-my-5'>
          <div className='col-md-6'>
            <h6 className='mb-3'>REVIEWS</h6>
<div>
{

 [...Array(5)].map((star,i) =>{

const ratingValue = i+1 ;
return <label><input className='rating'
type="radio" name='rating'
value={ratingValue}onClick={() => setRating(ratingValue)}/>
 <FaStar  className='star' 
color={ratingValue <= (hover || rating) ?"#ffc107" : "#808080"} 
onMouseEnter={()=>setHover(ratingValue)}
onMouseLeave = {()=>setHover(null)}/>
</label>;})  }
<p>rating is{rating}..</p> 
<input type="text" className='review' name="comment" autoComplete="off" placeholder='Review' onChange={(e)=>setComment(e.target.value)} />
<button type="button" className='rate' onClick={reviewClick}>submit</button> 
</div>
 </div>
   </div>
    </div>
     </div>
        </div>
    
  )
}

export default SingleProduct

function toast(arg0: string) {
  throw new Error('Function not implemented.');
}
