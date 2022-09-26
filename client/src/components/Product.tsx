import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../uitilities/formatCurrency';

type ProductProps ={
    item :any
}
const Product = (props:ProductProps) => {
  return (
    <div className='material'>
        {/* <div className='circle'></div> */}
            <img src={props.item.img}  className='circle-image' alt="img" />
            <div className='circle-item'>
                <div className='circle-icon'>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </div>
                <div className='circle-icon'>
                  <Link to={`/product/${props.item._id}`}>
                <i className="fa fa-search" aria-hidden="true"></i>
                </Link>
                </div>
                <div className='circle-icon'>
                <i className="fa fa-heart" aria-hidden="true"></i>
                </div>
           
           </div>
           <div className='products-name'style={{position:"absolute",bottom:0,zIndex:"10"}}>{props.item.title}</div>
           <div className='products-desc' style={{position:"absolute",top:300,zIndex:"10"}}>{props.item.desc}</div>
            <div className='products-price'style={{position:"absolute",top:350,zIndex:"10"}}>{formatCurrency(props.item?.price)}</div>
           </div>
  )
}

export default Product