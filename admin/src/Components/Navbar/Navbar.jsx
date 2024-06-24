import React from 'react'
import "./Navbar.css"
import navlogo from '../../assets/logomasara.png'
import navProfile from '../../assets/3.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='nav-logo' src={navlogo} alt=""/>
        <img className='nav-profile' src={navProfile} alt=""/>
    </div>
  )
}

export default Navbar