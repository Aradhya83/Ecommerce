import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/images/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOrder, setSortOrder] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSort = (order) => {
    setSortOrder(order);
    setDropdownOpen(false);
  };

  const sortedProducts = [...all_product]
    .filter(item => props.category === item.category)
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.new_price - b.new_price;
      } else if (sortOrder === 'desc') {
        return b.new_price - a.new_price;
      }
      return 0;
    });

  return (
    <div className='shopcategory-banner'>
      <img className='bannerimg' src={props.banner} alt='' />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='shopcategory-sort' onClick={() => setDropdownOpen(!dropdownOpen)}>
          Sort by <img src={dropdown_icon} alt='' />
          {dropdownOpen && (
            <div className='sort-dropdown'>
              <p onClick={() => handleSort('asc')}>Price: Low to High</p>
              <p onClick={() => handleSort('desc')}>Price: High to Low</p>
            </div>
          )}
        </div>
      </div>
      <div className='shopcategory-products'>
        {sortedProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      <div className='shopcategory-loadmore'>
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
