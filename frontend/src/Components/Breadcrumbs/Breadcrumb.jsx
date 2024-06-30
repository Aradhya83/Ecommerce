import React from 'react'
import "./Breadcrumb.css"
import arrow_icon from "../Assets/images/breadcrum_arrow.png"

const Breadcrumb = (props) => {
  const {product} = props;
  return (
    <div className='breadcrumb'>
      HOME <img src={arrow_icon} alt=""/> Shop <img src={arrow_icon} alt=""/> 
      {product.category} <img src={arrow_icon} alt=""/> {product.name}
    </div>
  )
}

export default Breadcrumb