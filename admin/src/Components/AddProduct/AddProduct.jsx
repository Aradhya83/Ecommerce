import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from '../../assets/upload_area.svg'

 const AddProduct = () => {

    const [image,setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }


    //so basically in this code, firstly we are sending an http request to the server, specifically a post request on the '/upload' url 
    //indicating that we want to upload an image and we expect the response in json, the body of our request will contain formData object 
    //that contains our image, this FormData object will handle the transferring of binary files(image). The response in then parsed
    //using resp.json() and converted back to the original object and stored in response data. If the upload was a success that means we
    //can now add the product to the backend so then we fetch the url of the image uploaded and store that url as the product's image(which
    //was initialized to "")that we are about to upload. We then hit the /addproduct endpoint using a post http request to add our product
    //on the backend. The response is expected again in json and the content we will be sending in is json format. So we will convert body
    //to json format using stringify, the response is then parsed to extract the original object form accordingly a response is displayed in the
    //form of an alert
    
    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails; //copy of product object

        let formData = new FormData();//This allows you to send files and other data using the multipart/form-data encoding. 
        //This encoding is necessary because it allows binary data (like images) to be sent over HTTP.
        formData.append('product', image); //appending the image in formdata

        //sending form data to API
        await fetch('http://localhost:4000/upload', { //hitting this endpoint in order to perfom the upload function
            // then upon the successful uploading, we will fetch the image's url
            method:'POST',//using this POST method
            headers: {
                Accept:'application/json'
            }, 
            body:formData, //form data will contain the image with the fieldname product
        }).then((resp) => resp.json()).then((data) => {responseData = data})
        if(responseData.success){
            //success means that image has successfully been saved in Multer image storage
            product.image = responseData.image_url; //getting through upload endpoint
            console.log(product);
            await fetch('http://localhost:4000/addproduct', {//hitting this endpoint to perform the upload function
                method:'POST',
                headers:{
                        Accept: 'application/json', //indicating server that - the request body contains json data/ we need json data as a response
                        'Content-Type': 'application/json',
                },// backend would upload this product on mongodb
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{//When you use resp.json(), you are converting the JSON-formatted response body back into its original form as a JavaScript object
                data.success?alert("Product Added"): alert("Failed");
            })
        }
    }

  return (
    <div className='add-product'>
<div className='addproduct-itemfield'>
<p>Product Title</p>
<input value ={productDetails.name} onChange={changeHandler} type="text" name = "name" placeholder='Type here'/>
</div>
<div className='addproduct-price'>
    <div className='addproduct-itemfield'>
        <p>Price</p>
        <input type="text" value ={productDetails.old_price} onChange={changeHandler} name="old_price" placeholder='Type here'/>
    </div>
    <div className='addproduct-itemfield'>
        <p>Offer Price</p>
        <input type="text" value ={productDetails.new_price} onChange={changeHandler} name="new_price" placeholder='Type here'/>
    </div>
</div>
<div className='addproduct-itemfield'>
    <p>Product Category</p>
    <select name='category' value ={productDetails.category} onChange={changeHandler} className='add-product-selector'>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="kid">Kids</option>
    </select>
</div>

<div className='addproduct-itemfield'>
<label htmlFor='file-input'>
    <img src={image?URL.createObjectURL(image):upload_area} alt="" className='addproduct-thumbnail-img'/>
</label>
<input onChange={imageHandler}type="file" name='image' id="file-input" hidden/>
</div>
<button onClick={() => {Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}


export default AddProduct