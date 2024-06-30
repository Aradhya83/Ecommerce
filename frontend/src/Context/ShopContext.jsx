import React, {createContext, useEffect} from "react";
import { useState } from "react";
export const ShopContext = createContext(null);


const getDefaultCart =  () => {
    let cart = {}; //empty object
    for(let index= 0; index<300;index++){
        cart[index]=0;
    }
    return cart;
}
/*this is a function to create an empty cart. It is an object where key= productid and value= product quantity*/


const ShopContextProvider = (props) => {

const [all_product, setAll_product] = useState([]);
const [cartItems, setCartItems] = useState(getDefaultCart());
// here we will get an empty cart whose length = all_product.length    

useEffect(()=>{
fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>setAll_product(data))

if(localStorage.getItem('auth-token')){
    fetch('http://localhost:4000/getcart',{
        method: "POST",
        headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json'
        },
        body: "",
    }).then((res)=>res.json()).then((data)=>setCartItems(data))
}
},[])

const addToCart = (itemId) =>{
   setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}));
   if(localStorage.getItem('auth-token')){
    fetch('http://localhost:4000/addtocart', {
        method:'POST',
        headers:{
            Accept: 'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json'
        },
        body: JSON.stringify({"itemId": itemId}),
    }).then((res)=>res.json()).then((data)=>console.log(data))
   }
}

/**So, { ...prev, [itemId]: prev[itemId] + 1 } creates a new object where all the previous key-value pairs are
  retained (...prev), but the value corresponding to the itemId key is incremented by 1. This new object is then 
  passed to setCartItems to update the state. */

const removeFromCart = (itemId) =>{
    setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/removefromcart', {
            method:'POST',
            headers:{
                Accept: 'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"itemId": itemId}),
        }).then((res)=>res.json()).then((data)=>console.log(data))
    }
 }


 const getTotalCartAmount = () => {
   let totalAmount = 0;
   for(const item in cartItems){
    if(cartItems[item]>0){
        let iteminfo = all_product.find((product)=>product.id===Number(item));
        totalAmount+= (iteminfo.new_price*cartItems[item]);
    }  
   }
   return totalAmount;
 }


 const getTotalCartItems = () => {
    let totalitem = 0;
    for(const item in cartItems){
             if(cartItems[item]>0){
                totalitem+= cartItems[item];
             }
    }
    return totalitem;
 }


 const contextValue = {getTotalCartItems,all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount};/** here we will insert any data and functions that will be provided in the shopcontext
 provided as a value, and then we can access this data and functions in any component*/
 /*The data of all the products can now be passed on to the children components of this contextprovider
 without having to pass props through every level of component tree*/
 // product data and cartitem will be passed to everycomponent so that cart can be updated/accessed from anywhere
 
return (
<ShopContext.Provider value={contextValue}>
     {/*here, this value will be the one that
 is passed to the children components, in this case the value equals the productdata*/}

    {props.children}
</ShopContext.Provider>
)
}

export default ShopContextProvider;

