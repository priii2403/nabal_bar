import React, { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Colors, products, slides } from "../../components/utils";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductList = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [image, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
            benefit: product.benefit, // Fixed typo in product property name
          };
        });
        const productData = await Promise.all(promises);
        setFiles(productData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    // fetch image function
    const fetchImages = async () => {
      setLoading(true);
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
        setImages(productData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
    fetchImages();

    // handle resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // handle navigate product
  const handleSubmit = (index, file) => {
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
  console.log("isMobile", isMobile)
  return (
    <div className="px-0 py-0">
      <Carousel
        showThumbs={false}
        showMore={false}
        infiniteLoop={true}
        interval={2000}
        autoPlay={false}
        dynamicHeight={true}
        style={{ display: "flex" }}
      >
        {image.map((image, index) => (


          !isMobile ? (
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
          ) : (<div
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            <img
              src={image.url}
              alt={image.url}
              style={{ width: "100%", height: "60%" }}
            />
          </div>)
        ))}
      </Carousel>

      <div className="products-header mt-3">
        <h2 className="text-center text-green-500 text-2xl">
          Our Products
        </h2>
      </div>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="md:mx-10 sm:mx-10 custom-min-width ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:grid-cols-3">
            {visibleProducts.map((file, index) => (
              <div className="card" key={index}>
                <div className="card-image">
                  <img src={file.url} alt={file.name} />
                </div>
                <div className="card-details flex flex-col items-center justify-center">
                  <div className="card-row">
                    <h5 className="card-title">
                      {file.name}
                    </h5>
                    <h6 className="text-xs">
                      {file.name === "Cucumber" ||
                        file.name === "Three Layer (Multani Mitti, Coffee, Besan)"
                        ? "(80gm)"
                        : file.name === "Scrub"
                          ? "(60gm)"
                          : "(100gm)"}
                    </h6>
                  </div>
                  <h5 className="card-detail">{file.benefit}</h5>
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
            <div className="text-center mt-5 mb-5">
              <button
                className="bg-green-700 text-white font-bold py-2 px-4 rounded "
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
