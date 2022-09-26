import React from 'react'
import Navbar from '../components/Navbar'
import Annoncement from '../components/Annoncement'
import Slider from '../components/Slider'
import Catergories from '../components/Catergories'
import Footer from '../components/Footer'


const Home = () => {
  return (


    <div>
      <Annoncement/>
      <Navbar/>
       <Slider/>
       <Catergories/>
       {/* <Products cat={undefined} filter={undefined} sort={undefined}/> */}
       {/* <Newsletter/> */}
       <Footer/>
      </div>
  ) 
}

export default Home