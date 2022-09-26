import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks';
import {gapi} from 'gapi-script'
import {GoogleLogin ,GoogleLogout} from 'react-google-login'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { googleLogin, login } from '../redux/apiCalls';
import './Productlist.css'

const Sign = () => {
  const [username,setUsername]=useState(""); 
  const [password,setPassword]=useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 const [showLoginButton ,setShowLoginButton]=useState(true);
 const [showLogoutButton ,setShowLogoutButton]=useState(false);
 const location=useLocation();
const {isFetching,error} = useAppSelector(state=>state.user)

  const handleClick=(e)=>{
     e.preventDefault();
     login(dispatch,{username,password})
  }
  const client_Id = "357133286340-5gbinr7kv22f99bt99i50kk336par2if.apps.googleusercontent.com";
  const onLoginSuccess = async (res) => {
    const email = res?.profileObj?.email;

    const name = res?.profileObj?.name;

    const token = res?.tokenId;

    const googleId = res?.googleId;

    const imageUrl = res?.profileObj?.imageUrl;



    const result = {email,name,token,googleId,imageUrl}

    try {

      await googleLogin(dispatch,result)

        navigate("/login")

       

    } catch (error) {

        console.log(error)

    }
}
const onLoginFailure = (res) => {
console.log("Login Failed" ,res);
}
const onLogout=()=>{
alert("Signed out ");
setShowLoginButton(true);
 setShowLogoutButton(false);
 }
  // google api
 useEffect(()=>{
function start(){
gapi.client.init({
 clientId:client_Id,
 scope:"profile"
})
}
gapi.load('client:auth2',start)
})
const redirect = location.search ? location.search.split("=")[1] :"/";
  return ( 
    <div className='logincontain'>
    <div className='wrapperlogin'>
        <div className='logintitle'><h1>SIGN IN</h1></div>
        <form className='formlogin' > 
            <input className='inputlogin' name="username" placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
            <input className='inputlogin'placeholder='password' name="password" type='password' onChange={(e)=>setPassword(e.target.value)}/>
            <button className='loginbutton' onClick={handleClick} disabled={isFetching}
              style={{cursor:"not-allowed"}}>LOGIN</button>
             {error && <div className='error'style={{color:"red"}}>something went wrong..</div>}
             <Link to="/vpm" ><div className='loginlink'>DO NOT YOU REMEMBER THE PASSWORD?</div></Link>
            <Link to={redirect? `/register?redirect=${redirect}`:"/register"} className='loginlink'>CREATE A NEW ACCOUNT </Link>
        </form>
        {  showLoginButton ?<GoogleLogin   className='google'
        clientId={ client_Id}
        buttonText="Login"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={'single_host_origin'}
        />: "loading"}
       {showLogoutButton?
        <GoogleLogout    className='google'
        clientId={ client_Id}
        buttonText="Logout"
        onLogoutSuccess={onLogout}
       />:null  }
    </div>
</div>

  )
}

export default Sign