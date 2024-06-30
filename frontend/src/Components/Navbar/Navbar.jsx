import React, { useContext, useRef } from 'react'
import "./Navbar.css"
import logo from "../Assets/images/logomasara.png"
import cart_icon from "../Assets/images/cart_icon.png"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from "../Assets/images/next-removebg-preview.png"
const Navbar = () => {
    const [menu, setMenu] = useState("shop");
     const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
           menuRef.current.classList.toggle('nav-menu-visible');
           e.target.classList.toggle('open');
    }
  return (
    <div className='navbar'>
        <div className='nav-logo'>
             <Link to="/"> <img src={logo} alt = ""/></Link>
        </div>
        <img onClick={dropdown_toggle} src={nav_dropdown} alt="" className='nav-dropdown'/>
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=> {setMenu("shop")}}><Link to="/" style={{textDecoration: 'none', color:'black'}}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=> {setMenu("men")}}><Link to="/men" style={{textDecoration: 'none' , color:'black'}}>Men</Link>{menu==="men"?<hr/>:<></>}</li>
            <li onClick={()=> {setMenu("women")}}><Link to="/women" style={{textDecoration: 'none' , color:'black'}}>Women</Link>{menu==="women"?<hr/>:<></>}</li>
            <li onClick={()=> {setMenu("kids")}}><Link to ="/kids" style={{textDecoration: 'none' , color:'black'}}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
          {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>:  
          <Link to="/login"><button>Login</button></Link>}
            <Link to="/cart"> <img src={cart_icon} alt=""/></Link> 
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar