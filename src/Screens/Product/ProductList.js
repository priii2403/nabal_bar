import React, { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import {
  carousel_image,
  Colors,
  products,
  reviews,
} from "../../components/utils";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductList = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const initialProductsToShow = 12; // Initial number of products to display
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const cardWidth = 250; // Adjust based on your card width
    const container = document.getElementById("card-container");
    const maxScroll = container.scrollWidth - container.clientWidth;
    let newPosition;

    if (direction === "left") {
      newPosition = Math.max(scrollPosition - cardWidth * 3, 0);
    } else {
      newPosition = Math.min(scrollPosition + cardWidth * 3, maxScroll);
    }

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
  };

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
    <div className="px-0 py-0 ">
<div style={{ position: "relative", maxHeight: "400px", overflow: "hidden" }}>
  <img
    src={carousel_image[6]} // Assuming carousel_image is an array of image URLs
    alt={carousel_image[6]} // Assuming you want to use the image URL as alt text
    style={{ width: "100%", height: "auto" }} // Make the image full width while maintaining aspect ratio
  />
  <p style={{ fontFamily:'Gotu-Regular' , fontSize: "20px", color: "white", position: "absolute", bottom: "280px", left: "50%", transform: "translateX(-50%)" }}>
THE BEAUTY OF THE BEST
  </p>
  <p style={{ fontFamily:'Gotu-Regular' , fontSize: "40px", color: "white", position: "absolute", bottom: "210px", left: "50%", transform: "translateX(-50%)" }}>
    Complete your elastic skin
  </p>
  <p style={{ fontFamily:'Gotu-Regular' , fontSize: "40px", color: "white", position: "absolute", bottom: "160px", left: "50%", transform: "translateX(-50%)" }}>
    with the apricot collagen line.
  </p>
</div>


    
    
      <div className="products-header">
        <h2 style={{ fontSize: "28px", textAlign: "center", color: "green" }}>
          Our Products
        </h2>
      </div>
      {loading ? ( // Conditional rendering of loader
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div
          style={{
            // backgroundColor: "#F1F9E3",
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "10px",
          }}
          className="py-10"
        >
          <div className="GridContainer mt-0 p-2 md:p-5 md:px-10 md:py-5 grid gap-5 md:gap-5 md:grid-cols-3">
            {visibleProducts.map((file, index) => (
              <div class="card" key={index}>
                <div class="card-image">
                  <img src={file.url} alt={file.name} />
                </div>
                <div class="card-details">
                  <div className="card-row">


                  <h5 style={{marginLeft:"15px"}}class="card-title"> {file.name} </h5>
               
                  <h6 style={{marginLeft:"5px",marginTop:'10px',fontSize:'10px'}}>(100gm)</h6>
                  </div>
                  <h5 class="card-detail"> Exfoliation | Affordability | Versatility</h5>
                  <div class="price-container">
                    <span class="price">₹89</span>
                  </div>
                  <button
                    onClick={() => {
                      handleSubmit(index, file);
                    }}
                    class="view-more-button"
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
                  color: "#E9E1B0",
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
