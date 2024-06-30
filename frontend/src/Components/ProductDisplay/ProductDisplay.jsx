import React, { useContext } from 'react'
import "./ProductDisplay.css"
import star_icon from "../Assets/images/star_icon.png"
import star_dull_icon from "../Assets/images/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);

  return (
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className='productdisplay-img-list'>
                <img src={product.image} alt=""/> {/**product is an object that contains properties like image, name, etc. 
                  So, you need to access these properties through the product object:
                 * If you were to use props.image directly, it would imply that image is a direct property 
                  of the props object.
                  */}
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
            </div>
            <div className='productdisplay-img'>
                <img className="productdisplay-main-img" src={product.image} alt=""/>
            </div>
        </div>
        <div className='productdisplay-right'>
            <h1>{product.name}</h1>
            <div className='productdisplay-right-star'>
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_dull_icon} alt=""/>
                <p>(145)</p>
            </div>
            <div className='productdisplay-right-prices'>
                <div className='productdisplay-right-price-old'>${product.old_price}</div>
                <div className='productdisplay-right-price-new'>${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                A lightweight, usually knitted, pullover shirt, close-fitting with a round neckline and short sleeves,
                worn as an undershirt or an outer garment.
            </div>
            <div className='productdisplay-right-size'>
                <h1>Select Size</h1>
                <div className='productdisplay-right-sizes'>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>{
                addToCart(product.id);
            }}>
                ADD TO CART
                </button>
            <p className='productdisplay-right-category'>
                <span>Category: </span>Women, T-shirt, Crop Top</p>
                <p className='productdisplay-right-category'>
                <span>Tags: </span>Modern, Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay

/**Using product.image: You need to pass a product object as a prop, which contains the image property.
Using props.image: You pass the image property directly as a prop.

Using product.image:
product is an object derived from props.
product contains properties like image, name, etc.
Example: props.product.image.

Using props.image:
image is a direct property of the props object.
There is no product object; the image is passed directly as a prop.

Example of How Props Would be Passed
For product.image:
<ProductDisplay product={{ image: "image_url", name: "Product Name" }} />
For props.image:
<ProductDisplay image="image_url" name="Product Name" />

in short:
In your current setup, product is an object that includes properties like image, name, etc. 
Therefore, you access these properties through product (e.g., product.image). If you were passing image
directly as a prop, you would use props.image.The method of accessing these properties depends on 
how the props are structured and passed to the component.

*/