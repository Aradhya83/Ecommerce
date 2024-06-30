import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Footer from './Components/Footer/Footer';
import men_banner from "./Components/Assets/images/banner_mens.png"
import women_banner from "./Components/Assets/images/banner_women.png"
import kid_banner from "./Components/Assets/images/banner_kids.png"



function App() {
  return (
    <div>
      <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route path="/men" element={<ShopCategory banner = {men_banner} category ="men" />}/>
        <Route path="/women" element={<ShopCategory banner={women_banner} category ="women"/>}/> {/**here category is a prop */}
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category ="kid"/>}/>
        <Route path="/product" element={<Product/>}>
        <Route path=":productId" element={<Product/>}/>{/**id path is used and the product element/component will be rendered */}
        </Route>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter> 
    </div>
  );
}
/*as we want our navbar in every page, it would be wrapped inside browserrouter*/ 
export default App;
