import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React,{useEffect,useState} from 'react';
import TypingEffect from '../../components/TypingEffect';
import { slides } from '../../components/utils';
import './aboutUs.css'; 

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [image, setImages] = useState([]);
  useEffect(() => {
  
    const fetchImages = async () => {
    try {
        const db = getStorage();
       
        const promises = slides.map(async (product) => {
          const storageRef = ref(db, product.image);
          const url = await getDownloadURL(storageRef);
          return {
            name: product.title,
            url: url,
            quote: product.quote,
          };
        });
        const productData = await Promise.all(promises);
        console.log("Product data:", productData);
        setImages(productData);
   
      } catch (error) {
        console.log(error);
      
      }
    };
  fetchImages();
  }, []);
  console.log(image[4]?.url);
  return (
    <div className="about-us-container">
      <div className="image-container">
        <img src={image[4]?.url} alt="About Us" />
        <div className="quote-box" style={{ fontFamily: "Urbanist" }}>
      <TypingEffect text="'Nabel's story is simple and here we share our experience in developing this online store.'" />
    </div>
      </div>
      <div className="content-container">
        <div className="contactheader" style={{ fontFamily: 'Gotu-Regular' }}>
          <h2>About Us</h2>
        </div>
        <div className="about-text" style={{ fontFamily: 'Urbanist-Italic' }}>
          <p className='about-padding'>
            We created Nables to build a range of natural handmade soap products that are not only good for human beings but safe for our environment. As our products are made with active ingredients extracted from nature that make them pure, fresh, and natural, and free from synthetic ingredients, artificial fragrances, artificial colors, detergents, and synthetic preservatives.
          </p>
          <p className='about-padding'>
            They are perfect to apply on skin, hair, and face as they contain butter, natural clays, herbs, tea tree oil, charcoal, vitamins, and pure botanical essential oils ingredients to leave your skin clean, soft, silky, and healthy. Our handmade natural soaps are made in small batches, as all the ingredients are carefully mixed in precise quantities to increase their shelf life.
          </p>
          <p className='about-padding'>
            Also, you can find the ingredients on the label for every product you buy from us. This way you can get to know the importance of using natural handmade soap products in your life when compared to artificial cosmetic products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;