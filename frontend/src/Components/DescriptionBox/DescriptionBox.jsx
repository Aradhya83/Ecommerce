import React from 'react'
import "./DescriptionBox.css"
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className='descriptionbox-navigator'>
            <div className='descriptionbox-nav-box'>Description</div>
            <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
        </div>
        <div className='descriptionbox-description'>
            <p>
            E-commerce websites revolutionize shopping by offering convenience and accessibility. 
            They allow users to browse, compare, and purchase products from home, with intuitive navigation and 
            secure payment options. Featuring user reviews, personalized recommendations, and diverse product 
            categories, these platforms cater to all shopping needs, making them essential in modern retail.
            </p>
            <p>
            E-commerce websites have transformed retail by providing a convenient and efficient shopping experience.
             They enable users to explore a wide range of products, compare prices, and make purchases from 
             anywhere, at any time. With secure payment methods, user reviews, and personalized recommendations, 
             customers can shop confidently. They cater to various needs, from fashion and electronics to daily essentials, 
              making them a cornerstone of modern shopping.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox