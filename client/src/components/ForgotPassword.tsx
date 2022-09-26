import axios from 'axios';
import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';

const ForgotPassword = ({show,setShow}) => {
    const [formData,setFormData] = useState({
        email:"",code:"",password:""
    }) 

    const navigate = useNavigate();
    const handleClick = () =>{
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
      await axios.post("http://localhost:4000/otp",formData)
      navigate("/changepassword")
    }
    const handleChange = (e:any) =>{
      setFormData({...formData,[e.target.name]:e.target.value}) 
      setShow({...formData,[e.target.name]:e.target.value}) 
      console.log(show);
      
  }
  return (
    <div style={{height:"100vh",justifyContent:"center",alignItems:"center"}}>
      <img src="https://img.freepik.com/free-psd/front-view-mock-up-laptop-with-pink-background_23-2148256272.jpg?w=740&t=st=1662978034~exp=1662978634~hmac=608a0a2d3ceb41100dbb40a5e519ae4954d20d04491055368233f0653e72b52c" alt="image"
      style={{height:"75vh",width:"100%"}}/>
       <Link to="/login"> <i className="fa-solid fa-backward mt-5 backward"></i><span className='backwardText'>Login Page</span></Link>
    <div className='container w-25' style={{justifyContent:"center"}}>
   
        {<form onSubmit={handleSubmit} autoComplete="off">
        <input className='form-control mb-3' type="email" name='email' placeholder='Please enter your Email Address' onChange={handleChange}/>
        <button type="submit" className='btn btn-danger w-100 forgotPasswordSubmit'  onClick={handleClick}>Submit</button>
        </form>
      }
     
    </div>
    </div>
  )
}

export default ForgotPassword