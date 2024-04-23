import React, { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import {
  Colors,
  products,
  slides,
} from "../../components/utils";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductList = () => {
  
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [image, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const initialProductsToShow = 12; 


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const db = getStorage();
        const promises = products.map(async (product) => {
          const storageRef = ref(db, product.path);
          const url = await getDownloadURL(storageRef);
          return {
            name: product.name,
            url: url,
            ingredients: product.ingredients,
            benifit: product.benifit,
          };
        });
        const productData = await Promise.all(promises);
        console.log("Product data:", productData);
        setFiles(productData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchImages = async () => {
      setLoading(true);
      try {
        const db = getStorage();
        console.log("db", db);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData() && fetchImages();
  }, []);

  const handleSubmit = (index, file) => {
    console.log(file);
    try {
      navigate(`/product/${index}`, { state: { file } });
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const visibleProducts = showMore
    ? files
    : files.slice(0, initialProductsToShow);

  return (
    <div className="px-0 py-0">
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        interval={2000}
        autoPlay={true}
        dynamicHeight={true}
        style={{ display: "flex" }}
      >
        {image.map((image, index) => (
          <div
            key={index}
            style={{ display: "flex", width: "100%", height: "100%" }}
          >
            <div
              style={{
                width: "50%",
                position: "relative",
              }}
            >
              <img
                src={image.url}
                alt={image.url}
                style={{ width: "100%", height: "80%" }}
              />
            </div>
            <div
              style={{
                width: "50%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.mainTheme2,
              }}
            >
              <p
                style={{
                  color: "#E9E1B0",
                  fontWeight: "bold",
                  padding: "10px",
                  margin: "20px",
                  marginTop: "10px",
                  textAlign: "center",
                  fontSize: "2vw",
                  borderWidth: 2,
                  height: "25%",
                  borderColor: "#E9E1B0",
                  marginBottom: "100px",
                }}
              >
                {image.quote}
              </p>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="products-header">
        <h2 style={{ fontSize: "28px", textAlign: "center", color: "green" }}>
          Our Products
        </h2>
      </div>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div
          style={{
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "10px",
          }}
          className="py-10"
        >
          <div className="GridContainer mt-0 p-2 md:p-5 md:px-10 md:py-5 grid gap-5 md:gap-5 md:grid-cols-3">
            {visibleProducts.map((file, index) => (
              <div className="card" key={index}>
                <div className="card-image">
                  <img src={file.url} alt={file.name} />
                </div>
                <div
                  className="card-details"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="card-row">
                    <h5 style={{ marginLeft: "15px" }} className="card-title">
                      {file.name}
                    </h5>
                    <h6
                      style={{
                        marginLeft: "5px",
                        marginTop: "10px",
                        fontSize: "10px",
                      }}
                    >
                      {file.name === "Cucumber" &&
                      file.name === "Three Layer (Multani Mitti, Coffee, Besan)"
                        ? "(80gm)"
                        : file.name === "Scrub"
                        ? "(60gm)"
                        : "(100gm)"}
                    </h6>
                  </div>
                  <h5 className="card-detail">{file.benifit}</h5>
                  <div className="price-container">
                    <span className="price">₹89</span>
                  </div>
                  <button
                    onClick={() => {
                      handleSubmit(index, file);
                    }}
                    className="view-more-button"
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!showMore && (
            <div style={{ textAlign: "center", marginTop: "5px" }}>
              <button
                style={{
                  backgroundColor: "#5D7031",
                  color: "#fffff",
                  fontWeight: "bold",
                  padding: "10px",
                }}
                onClick={toggleShowMore}
              >
                Show more
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
