import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import Features from '../Components/Features/Features'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
        <Hero/>
        <Features/>
        <Popular/>
        <Offers/>
        <NewCollections/>
        <NewsLetter/>
    </div>
  )
}

export default Shop