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
  const [loading, setLoading] = useState(false);
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

  const visibleProducts = showMore
    ? files
    : files.slice(0, initialProductsToShow);

  return (
    <div className="px-0 py-0 ">
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        dynamicHeight={true}
      >
        {carousel_image.map((file, index) => (
          <div key={index} style={{ height: "300px" }}>
            <img
              src={file}
              alt={file}
              style={{ maxWidth: "100%", maxHeight: "170%" }}
            />
          </div>
        ))}
      </Carousel>
      <div className="products-header">
        <h2 style={{ fontSize: "28px", textAlign: "center", color: "green" }}>
          Our Products
        </h2>
      </div>
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
        <div class="card">
        <div class="card-image">
          <img src={file.url} alt={file.name} />
        </div>
        <div class="card-details">
          <h5 class="card-title">  {file.name}</h5>
          <div class="price-container">
            <span class="price">$50</span>
          </div>
            <button class="view-more-button">View More</button>
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
      <div
        style={{
          backgroundColor: "#5D7031",
          borderRadius: "5px",
        }}
      >
        <div className="products-header">
          <h2
            style={{
              fontSize: "28px",
              textAlign: "center",
              color: "#EDECAF",
              paddingTop: "30px",
            }}
          >
            Recommand for you
          </h2>
          <div
            style={{
              flex: "row",
              textAlign: "center",
              padding: "40px",
              paddingTop: "30px",
              paddingBottom: "20px",
            }}
          >
            <h1 style={{ color: "#FFFFFF", fontFamily: "Urbanist-Italic" }}>
              When you switch to Jeveos product and there is no turning back
              because we prepare a luxurious range of natural soaps which are
              safe and effective for your skin. Result-driven ayurvedic products
              that are clinically approved for all skin types and ages.
            </h1>
          </div>
        </div>

        <div className="GridContainer mt-0 p-10 md:px-16 grid gap-10 md:grid-cols-3">
          <div style={{ backgroundColor: Colors.mainTheme2 }} class="R-card">
            <img
              src="https://plus.unsplash.com/premium_photo-1679064286963-a23c975812f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card Image"
              class="card-image"
            />
            <div class="card-content">
              <h3
                class="card-tit"
                style={{ color: "white", fontFamily: "Urbanist" }}
              >
                {" "}
                Clinically Tested
              </h3>

              <a href="#" class="card-link">
                Healthy + Handmade
              </a>
            </div>
          </div>
          <div style={{ backgroundColor: Colors.mainTheme2 }} class="R-card">
            <img
              src="https://plus.unsplash.com/premium_photo-1684407616836-7943cf1f3192?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card Image"
              class="card-image"
            />
            <div class="card-content">
              <h3
                class="card-tit"
                style={{ color: "white", fontFamily: "Urbanist" }}
              >
                No Chemicals
              </h3>

              <a href="#" class="card-link">
                Palm free with absolutley no toxins
              </a>
            </div>
          </div>
          <div style={{ backgroundColor: Colors.mainTheme2 }} class="R-card">
            <img
              src="https://images.unsplash.com/photo-1661450159298-d58a3b98f3a4?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card Image"
              class="card-image"
            />
            <div class="card-content">
              <h3 style={{ color: "white" }} class="card-tit">
                {" "}
                Natural Ingrediants
              </h3>

              <a href="#" class="card-link">
                Highest Quality of plant-based materials
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="products-header">
          <h2
            style={{
              fontSize: "28px",
              textAlign: "center",
              color: "#5D7031",
              paddingTop: "10px",
              paddingBottom: "20px",
            }}
          >
            TESTIMONIALS
          </h2>
        </div>
        <div style={{ marginBottom: "150px" }} className="scrollable-cards">
          <div className="arrow left" onClick={() => handleScroll("left")}>
            &lt;
          </div>
          <div className="card-container-test" id="card-container">
            {reviews.map((item, index) => (
              <div key={index} className="card-test">
                <div className="content">{item.content}</div>
                <div className="author-container">
                  <span className="dash"> - </span>
                  <span>{item.author}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="arrow right" onClick={() => handleScroll("right")}>
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
