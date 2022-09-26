import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footContain'>
        <div className='leftFoot'>
            <div className='logo'>
                <h1>LAVA.</h1>
            </div>
            <div className='logoDesc'>
                <p>There are many variations pf passages of lorem Ipsum available,but the majority have suffered 
                alteration in some form,by injected humour, or randomised words don't look even slightly 
                believable.</p> 
            </div>
        </div>
        <div className='centerFoot'>
            <div className='titleFoot'>
               <h3>Useful Links</h3> 
            </div>
            <div className='list'>
                <ul>
                    <Link to="/">
                    <li className='listItem'>Home</li>
                    </Link>
                    <Link to="/cart">
                    <li className='listItem'>Cart</li></Link>
                    <Link to="/products/women">
                    <li className='listItem'>Woman Fashion</li></Link>
                    <li className='listItem'>My Account</li>
                </ul>
            </div>
        </div>
        <div className='rightFoot'>
            <div className='titleRight'>
                <h4>Contact</h4>
            </div>
            <div className='contactFoot'>
            <i className="fas fa-map-marker-alt" style={{marginRight:"10px"}}></i>
                622 sowkarpet ,chennai 600097
            </div>
            <div className='contactFoot'>
            <i className="fas fa-phone-alt"  style={{marginRight:"10px"}}></i>
               +91 23 45 2798
            </div>
            <div className='contactFoot'>
            <i className="fas fa-mail-bulk"  style={{marginRight:"10px"}}></i>
                contact@shapiy.sha
            </div>
            <img src="https://i.ibb.co/Qfvn4z6/payment.png" className='footimage' alt="img"/>
        </div>
    </div>
  )
}

export default Footer