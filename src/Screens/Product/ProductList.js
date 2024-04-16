import React, { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { products } from "../../components/utils";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductList = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const initialProductsToShow = 9; // Initial number of products to display

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
    fetchData();
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

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const visibleProducts = showMore ? files : files.slice(0, initialProductsToShow);

  return (
    <div className="px-5 py-10">
      <Carousel showThumbs={false} infiniteLoop={true} interval={2000} dynamicHeight={true}>
        {files.slice(7, 12).map((file, index) => (
          <div key={index} style={{ height: "300px" }}>
            <img src={file.url} alt={file.name} style={{ maxWidth: "100%", maxHeight: "170%" }} />
          </div>
        ))}
      </Carousel>
      <div className="products-header">
        <h2 style={{ fontSize: "28px", textAlign: "center", color: "green" }}>Our Products</h2>
      </div>
      <div className="py-10">
        <div className="GridContainer mt-0 p-5 md:px-16 grid gap-10 md:grid-cols-3">
          {visibleProducts.map((file, index) => (
            <div
              key={index}
              className="card"
              onClick={() => {
                handleSubmit(index, file);
              }}
            >
              <img src={file.url} alt={file.name} className="card-img-top" />
              <div className="card-body">
                <h5 style={{ color: "green" }} className="card-title">
                  {file.name}
                </h5>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="line" style={{ width: "50%", height: "2px", backgroundColor: "grey" }}></div>
                  <div className="price-container">
                    <span className="price">${300}</span>
                  </div>
                  <div className="line" style={{ width: "50%", height: "2px", backgroundColor: "grey" }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!showMore && (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={toggleShowMore}>Show more</button>
    </div>
  )}
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
            <div style={{ flex: "row", textAlign: "center", padding: "40px", paddingTop: "30px", paddingBottom: "40px" }}>
              <h1 style={{ color: "#FFFFFF" }}>
                When you switch to Jeveos product and there is no turning back because we prepare a luxurious range of natural soaps which are safe and effective
                for your skin. Result-driven ayurvedic products that are clinically approved for all skin types and ages.
              </h1>
            </div>
          </div>
          <div className="GridContainer mt-0 p-10 md:px-16 grid gap-10 md:grid-cols-3">
            {/* Recommended products */}
          </div>
        </div>
    
      </div>
    </div>
  );
};

export default ProductList;
