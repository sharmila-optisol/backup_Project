import React from 'react'
import { categories } from '../data'
import CatergoryItem from './CatergoryItem'

const Catergories = () => {
  return (
    <div className='dress'>
         {categories.map((item)=>(
             <CatergoryItem item={item} key={item.id}/>
          ))}
        
    </div>
   
  
  )
}

export default Catergories