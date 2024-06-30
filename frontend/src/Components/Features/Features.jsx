import React from 'react';
import "./Features.css";
import f1 from "../Assets/images/f1.png"
import f2 from "../Assets/images/f2.png"
import f3 from "../Assets/images/f3.png"
import f4 from "../Assets/images/f4.png"
import f5 from "../Assets/images/f5.png"
import f6 from "../Assets/images/f6.png"
const Features = () => {
  return (
    <section id="feature" className="section-p1">
      <div className="fe-box">
        <img src={f1} alt="Feature 1" />
        <h6>Free Shipping</h6>
      </div>
      <div className="fe-box">
        <img src={f2} alt="Feature 2" />
        <h6>Online Order</h6>
      </div>
      <div className="fe-box">
        <img src={f3} alt="Feature 3" />
        <h6>Save Money</h6>
      </div>
      <div className="fe-box">
        <img src={f4} alt="Feature 4" />
        <h6>Promotions</h6>
      </div>
      <div className="fe-box">
        <img src={f5} alt="Feature 5" />
        <h6>Happy Sell</h6>
      </div>
      <div className="fe-box">
        <img src={f6} alt="Feature 6" />
        <h6>Support</h6>
      </div>
    </section>
  );
}

export default Features;
