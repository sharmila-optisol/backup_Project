import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
const Slider = () => {
   return (
<Carousel variant="dark">
      <Carousel.Item>
        <img  height="500px"
          src="https://m.media-amazon.com/images/I/61Ov56SdKVS._UX679_.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
        <div className='InfoContain'> 
        <div className='title'><h1>SUMMER SALE</h1></div>
        <div className='description'><p>DON'T COMPROMISE ON STYLE!GET DRESS 30% OFF FOR SUMMER SALE</p></div>
        <div className='btn btn-warning'>SHOW NOW</div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img  height="500px"
          src="https://m.media-amazon.com/images/I/61A9P4jysmL._UX679_.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
        <div className='InfoContain'> 
        <div className='title'><h1>WINTER SALE</h1></div>
        <div className='description'><p>DON'T COMPROMISE ON STYLE!GET DRESS 30% OFF FOR WINTER SALE</p></div>
        <div className='btn btn-warning'>SHOW NOW</div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img  height="500px"
          src="https://m.media-amazon.com/images/I/61LLaoqUwFL._AC_UL320_.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
        <div className='InfoContain'> 
        <div className='title'><h1>ADI SALE</h1></div>
        <div className='description'><p>DON'T COMPROMISE ON STYLE!GET DRESS 30% OFF FOR ADI SALE</p></div>
        <div className='btn btn-danger'>SHOW NOW</div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Slider