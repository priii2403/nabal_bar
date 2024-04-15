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
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const ftechdata = async () => {
      setloading(true);
      try {
        const db = getStorage();
        const promises = products.map(async (product) => {
          const storageRef = ref(db, product.path);
          const url = await getDownloadURL(storageRef);
          return {
            name: product.name,
            url: url,
            ingredients: product.ingredients,
          };
        });
        const productData = await Promise.all(promises);
        console.log("Product data:", productData);
        setFiles(productData);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
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
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    ); // Display full-screen loader
  }
  return (
    <div className="px-5 py-10 ">
      <Carousel showThumbs={false} infiniteLoop={true} interval={2000}>
        {files.slice(7, 12).map((file, index) => (
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
        <h2 style={{ fontSize: "28px", textAlign: "center", color: "green" }}>
          Our Products
        </h2>
      </div>
      <div className="py-10">
        {/* <div className="card-container"> */}
        <div className="GridContainer mt-0 p-5 md:px-16 grid gap-10 md:grid-cols-3">
          {files.map((file, index) => (
            <div
              style={{ backgroundColor: "#F1F9E3" }}
              className="card"
              onClick={() => {
                handleSubmit(index, file);
              }}
            >
              <img src={file.url} alt={file.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="font-bold">{file.name}</h5>
                <span className="block text-gray-500 text-sm">${800}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "#5D7031",
            marginRight: "55px",
            marginLeft: "55px",
          }}
        >
          <div className="products-header">
            <h2
              style={{
                fontSize: "28px",
                textAlign: "center",
                color: "#EDECAF",
                paddingTop: "10px",
              }}
            >
              Recommand for you
            </h2>
            <div style={{ flex: "row", textAlign: "center", padding: "10px" }}>
              <h1 style={{ color: "#FFFFFF" }}>
                When you switch to Jeveos product and there is no turning back
                because we prepare a luxurious range of natural soaps which are
                safe and effective for your skin. Result-driven ayurvedic
                products that are clinically approved for all skin types and
                ages.
              </h1>
            </div>
          </div>

          <div className="GridContainer mt-0 p-5 md:px-16 grid gap-10 md:grid-cols-3">
            <div class="card">
              <img
                src="https://plus.unsplash.com/premium_photo-1679064286963-a23c975812f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Card Image"
                class="card-image"
              />
              <div class="card-content">
                <h3 class="card-title"> Clinically Tested</h3>

                <a href="#" class="card-link">
                  Healthy + Handmade
                </a>
              </div>
            </div>
            <div class="card">
              <img
                src="https://plus.unsplash.com/premium_photo-1684407616836-7943cf1f3192?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Card Image"
                class="card-image"
              />
              <div class="card-content">
                <h3 class="card-title"> No Chemicals</h3>

                <a href="#" class="card-link">
                  Palm free with absolutley no toxins
                </a>
              </div>
            </div>
            <div class="card">
              <img
                src="https://images.unsplash.com/photo-1661450159298-d58a3b98f3a4?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Card Image"
                class="card-image"
              />
              <div class="card-content">
                <h3 class="card-title"> Natural Ingrediants</h3>

                <a href="#" class="card-link">
                  Highest Quality of plant-based materials
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageList;
