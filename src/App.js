import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes ,Route} from "react-router-dom";
import Navbar from './components/Carousel/Navbar/Navbar';
import Footer from './components/Footer';
import ProductList from './Screens/Product/ProductList';
import ProductDetails from './Screens/Product/ProductDetails/Index'
import ContactUs from './Screens/ContactUs/Index'
import AboutUs from './Screens/AboutUs/Index'
function App() {
  return (
    <Router>
      <Navbar totalItems={5} />
    <Routes>
      <Route path="/product-list" exact element={< ProductList/>} />
      <Route path="/product/:id" element={<ProductDetails/>} />
      <Route path="/contact" element={<ContactUs/>} />
      <Route path="/about" element={<AboutUs/>} />
    </Routes>
  </Router>
  );
}

export default App;
