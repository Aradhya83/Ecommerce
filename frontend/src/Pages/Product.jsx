import React, { useContext } from 'react'
import "./CSS/Product.css"
import { useParams } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumbs/Breadcrumb';
import { ShopContext } from '../Context/ShopContext';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId}= useParams();
  /**Route Definition: In the App component, the route is defined with a dynamic segment :productId. 
   This means that any URL matching /user/someValue will render the Product component, and someValue will 
   be captured as the userId parameter.
useParams Hook: Inside the Product component, the useParams hook is used to
 extract the productId from the URL. The hook returns an object with key-value pairs corresponding to the 
 dynamic segments of the URL. */

 const product = all_product.find((e)=>
   e.id === Number(productId));
  return (
    <div>
      <Breadcrumb product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product