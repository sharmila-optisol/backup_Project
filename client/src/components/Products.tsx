import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Product from './Product'

const Products = ({cat,filter,sort}) => {
  const [products,setProducts]=useState([]);
  const [filteredProducts,setFilteredProducts]=useState([]);
  console.log(products);
  
//products from backend
  useEffect(()=>{
     const getProducts =async ()=>{
      try{
          const res = await axios.get(cat ?`http://localhost:4000/products?catergory=${cat}`:"http://localhost:4000/products");
          setProducts(res.data);
      }catch(err){
         console.log(err)
      }
     }
     getProducts();
  },[cat]);
//whenever we change any filters we are gone to change the filtered products
useEffect(()=>{
  cat && setFilteredProducts(
    products.filter((item)=>
      Object.entries(filter).every(([key,value])=>
        item[key]?.includes(value)
      )
    )
  );
},[products,cat,filter])
//sorting the price 
useEffect(()=>{
  if(sort === "newest"){
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>a.createdAt - b.createdAt)
    )
  }else if(sort === "asc"){
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>a.price - b.price)
    )
  }else{
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>b.price - a.price)
    )
  }
},[sort]);
  return (
    <div className='dress-product'>
        {cat ? filteredProducts.map((item)=>(
            <Product item={item} key={item.id} />
        )):products.slice(0,8).map((item)=>(
          <Product item={item} key={item.id}/>
      ))}

    </div>
  )
}

export default Products