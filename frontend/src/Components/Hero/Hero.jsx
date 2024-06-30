import React from 'react';
import "./Hero.css";
import arrow_icon from "../Assets/images/arrow.png";

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-left'>
      <h4>Trade-in-offer</h4>
   <h2>Super value deals</h2>
   <h1>On all products</h1>
   <p>Save more with coupons & up to 70% off!</p>
   <button>Latest Collection
          <img src={arrow_icon} alt="arrow icon" />
          </button>
        </div>
        </div>
      
  );
}

export default Hero;
