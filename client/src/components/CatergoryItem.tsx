import React from 'react'
import { Link } from 'react-router-dom'

type CatergoryProps ={
    item :any
}
const CatergoryItem = (props:CatergoryProps) => {
  return (
    <div className='category'>
      <Link to={`/products/${props.item.cat}`}>
        <img className='img-cat' src={props.item.img} alt="img"/>
        <div className='Info'>
        <div className='titlecategory'>
            <h1>{props.item.title}</h1>
        </div>
        <div className='btn btn-outline-light'>SHOP NOW</div>
        </div>
        </Link>
        
        
    </div>
  )
}

export default CatergoryItem