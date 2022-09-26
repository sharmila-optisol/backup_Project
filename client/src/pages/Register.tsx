import React, { useState } from 'react'
import { useAppDispatch,useAppSelector} from '../hooks';
import { register } from '../redux/apiCalls';
import './Productlist.css'


const Register = (history) => {
  const [username,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useAppDispatch();
const user = useAppSelector((state)=>state.user);
  console.log("user:",user)

  const handleClick=(e)=>{
     e.preventDefault();
     register(dispatch,{username,email,password})
  }
 
  return (
<div className='registercontain'>
    <div className='wrapperRegister'>
        <div className='registertitle'><h1>CREATE AN ACCOUNT</h1></div>
        {/* {error && "user already exist"} */}
        <form className='form' onSubmit={handleClick}>
            {/* <input className='inputregister' placeholder='name' name="username" onChange={e=>setName(e.target.value)}/> */}
            {/* <input className='inputregister'placeholder='last name'name="username" onChange={e=>setName(e.target.value)}/> */}
            <input className='inputregister'placeholder='username' name="username" onChange={e=>setUserName(e.target.value)}/>
            <input className='inputregister' placeholder='email' name="email" onChange={e=>setEmail(e.target.value)}/>
            <input className='inputregister' placeholder='password' name="password" onChange={e=>setPassword(e.target.value)}/>
            {/* <input className='inputregister' placeholder='confirm password' name="password" onChange={e=>setPassword(e.target.value)}/> */}
            <div className='agreement'>
                By creating in an account, I consent to he processing of my personal
                data in accordance with the <b>PRIVACY POLICY</b>
            </div>
            <button className='registerbutton'
            style={{cursor:"not-allowed"}}>CREATE</button>
            
         
        </form>
    </div>
</div>
  )
}

export default Register