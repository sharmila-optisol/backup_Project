import axios from 'axios';
import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ChangePassword = ({show,setShow}) => {

  
    const [formData,setFormData] = useState({
        email:show?.email,code:"",password:""
    }) 
 
    console.log(show?.email);
    
    const navigate = useNavigate();
   
 
const ChangepasswordHandle = async (e) =>{ 
    e.preventDefault()
    await axios.post("http://localhost:4000/changepassword",formData)
    console.log(formData);
    navigate("/")
 
}

const handleChange = (e:any) =>{
    setFormData({...formData,[e.target.name]:e.target.value}) 
    setShow({...formData,[e.target.name]:e.target.value}) 
    console.log(show);
    
}

  return (
    <div  style={{height:"100vh"}}>
     <Link to="/login"> <i className="mt-5" >Back to Login Page</i></Link>
       <div>
      <form className='container' onSubmit={ChangepasswordHandle} autoComplete="off">
        <input type="email" name='email' className='form-control mb-3'  value={show?.email} disabled placeholder='Email'/>
        <img src="https://c8.alamy.com/comp/HAM5P6/change-your-password-privacy-policy-protection-security-system-concept-HAM5P6.jpg" alt="=omg"
         style={{height:"50vh",width:"150vh"}}/>
         <br/><br/>
          <input type="password" name="password"style={{alignItems:"center",justifyContent:"center" }} placeholder='Password' onChange={handleChange}/>
                <br/><br/>
          <input type="text" name="code" placeholder='OTP'style={{alignItems:"center",justifyContent:"center"}} onChange={handleChange}/>
          <br/><br/>
          <button type='submit' className='btn btn-danger d-flex align-items-center'>Change Password</button>
        </form>
    </div>
    </div>
  )
}

export default ChangePassword