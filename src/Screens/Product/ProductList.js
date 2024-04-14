import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
// Initialize Firebase
import { storage } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./Productlist.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { products } from "../../components/utils";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const StorageList = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const ftechdata = async () => {
      try {
        const db = getStorage();
        const promises = products.map(async (product) => {
          const storageRef = ref(db, product.path);
          const url = await getDownloadURL(storageRef);
          return { name: product.name, url: url,ingredients:product.ingredients };
        });
        const productData = await Promise.all(promises);
        console.log("Product data:", productData);
        setFiles(productData);
      } catch (error) {
        console.log(error);
      }
    };
    ftechdata();
  }, []);
  console.log(files);
  const handleSubmit = (index, file) => {
    console.log(file);
    try {
      navigate(`/product/${index}`, { state: { file } });
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };
  return (
    <div className="px-20 py-10">
      <Carousel showThumbs={false} infiniteLoop={true} interval={2000}>
        {files.slice(0, 5).map((file, index) => (
          <div key={index} style={{ height: "500px" }}>
            <img
              src={file.url}
              alt={file.name}
              style={{ maxWidth: "100%", maxHeight: "120%" }}
            />
          </div>
        ))}
      </Carousel>
      <div className="products-header">
        <h2 style={{ fontSize: "28px", textAlign: "center" }}>Our Products</h2>
      </div>
      <div className="py-10">
        <div className="card-container">
          {files.map((file, index) => (
            <div
              className="card"
              onClick={() => {
                handleSubmit(index, file);
              }}
            >
              <img src={file.url} alt={file.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{file.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorageList;
