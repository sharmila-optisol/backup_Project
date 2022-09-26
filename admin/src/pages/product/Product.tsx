import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../Hook';
import { updateProducts } from '../../Redux/apiCalls';
import { userRequest } from '../../requestMethods';


const Product = () => {
    const [input,setInput] = useState({});
    const [cat,setCat] = useState([]);
    const {productId} = useParams();
    console.log(productId)
    const dispatch = useAppDispatch(); 
    const [product,setProduct] = useState([])
    // const product = useSelector((state:any)=>
    // state.product.products.find((product)=>product._id === productId))
   
   useEffect(()=>{
    userRequest.get(`/products/find/${productId}`).then(res =>{
       setProduct([res.data])
    })
    
   },[dispatch,productId])

    const navigate = useNavigate()

const handleClick =(e)=>{
  e.preventDefault();
  const id:any =productId;
  console.log("id",id)
  const products = {...input,categories:cat};
  console.log(products)
  updateProducts(id,products,dispatch)
  //navigate("/products")
}
const handleChange=(e)=>{
    setInput(prev=>  
      {  return {...prev,[e.target.name]:e.target.value} }
)} 

const handleCat=(e)=>{
    setCat(e.target.value.split(","));
  }
console.log(cat);
  return (
    
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newproduct">
              <button className="productAddButton">Create</button>
            </Link>
          </div>
          {product.length >0 &&<div className="productTop">
              {/* <div className="productTopLeft">
    
              </div> */}
              <div className="productTopRight">
                  <div className="productInfoTop">
                      <img src={ product[0].img} alt="img"/>
                      <span className="productName">{ product[0].title}</span>
                  </div>
                  <div className="productInfoBottom">
                      <div className="productInfoItem">
                          <span className="productInfoKey">id:</span>
                          <span className="productInfoValue">{ product[0]._id}</span>
                      </div>
                      <div className="productInfoItem">
                          <span className="productInfoKey">sales:</span>
                          <span className="productInfoValue">5123</span>
                      </div>
                      <div className="productInfoItem">
                          <span className="productInfoKey">in stock:</span>
                          <span className="productInfoValue">{ product[0].inStock}</span>
                      </div>
                  </div>
              </div>
          </div>}
          <div className="productBottom">
              <form className="productForm">
                  <div className="productFormLeft">
                      <label>Product Name</label>
                      <input name="title" type="text" placeholder="title"  onChange={handleChange}/>
                      <label>Product Description</label>
                      <input name="desc" type="text" placeholder='desc'  onChange={handleChange} />
                      <label>Categories</label>
                      <input type="text" placeholder="jeans,shirt"  onChange={handleCat} />
                      <label>Price</label>
                      <input name="price" type="text" placeholder='price' onChange={handleChange}/>
                      <label>In Stock</label>
                      <select name="inStock" id="idStock">
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                      </select>
                  </div>
                  <div className="productFormRight">
                      {/* <div className="productUpload">
                          <img src={product.img} alt="" className="productUploadImg" />
                          <label htmlFor="file">                   
                              <Publish/>
                          </label>
                          <input type="file" id="file" style={{display:"none"}} />
                      </div> */}
                      <button onClick={handleClick} className="productButton">Update</button>
                  </div>
              </form>
          </div>
        </div>
      );
  
}

export default Product