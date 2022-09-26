import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Annoncement from '../components/Annoncement'
import Navbar from "../components/Navbar"
import Products from '../components/Products'
import './Productlist.css'

const ProductList = () => {
    const location = useLocation();
    const cat:any =location.pathname.split("/")[2];
    const [filter,setFilter]=useState({});
    const [sort,setSort] =useState("newest");

    const handleFilters =(e:any)=>{
         const value = e.target.value;
         setFilter({
            ...filter,
            [e.target.id] :value,
         })
    };
    
    // console.log(filter);
  return (
    <div className='productContain'>
        <Navbar/>
        <Annoncement/>
        <div className='titleFilter'>
           <h1>{cat}</h1> 
        </div>
        <div className='filterProduct'>
            <div className='filter'>
                <div className='filterText'>Filter Products:</div>
                <select className='select' id="desc" onChange={handleFilters}>
                    <option disabled>brand</option>
                    <option >MODERN-FIT</option>
                    <option >tradtion</option>
                    <option >goa</option>
                    <option >trendy</option>
                    <option>jacket</option>
                </select>
                <select className='select' id="size" onChange={handleFilters}>
                <option disabled>size</option>
                    <option >XS</option>
                    <option >S</option>
                    <option >M</option>
                    <option >L</option>
                    <option >XL</option>
                    <option>XXL</option>
                </select>
            </div>
            <div className='filter'> 
             <div className='filterText'>Sort Products:</div>
             <select className='select' onChange={(e)=>setSort(e.target.value)}>
             <option value="newest">Newest</option>
                    <option value="asc">Price (asc)</option>
                    <option value="desc" >Price (desc)</option>
            </select>
             </div>
        </div>
    
        <Products cat={cat} filter={filter} sort={sort} />
    </div>
  )
}

export default ProductList