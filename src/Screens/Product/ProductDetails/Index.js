import React from "react";
import { useLocation } from "react-router-dom";
import "../Productlist.css";
import { Colors, product_price } from "../../../components/utils";
const Index = () => {
  const phoneNumber = "919724817980";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const location = useLocation();
  const { name, url, ingredients } = location.state.file;

  const handleAddToCartClick = () => {
    window.location.href = whatsappUrl;
  };
  return (
    <main className="main-container">
      <div className="content-container">
        <div className="image-container">
          <img
            className="product-image"
            src={url}
            alt={name}
            width={300}
            height={300}
          />
        </div>
        <div className="details-container">
          <h1 className="product-name">{name}</h1>

          <div className="price-info">
            {name === "Cucumber" ||
            name === "Three Layer (Multani Mitti, Coffee, Besan)" ? (
              <div className="price-box">
                <div className="price-box-header">{"80gm"}</div>
                <div className="price-box-divider"></div>
                <div className="price-box-body">{"₹79.00"}</div>
              </div>
            ) : name === "Scrub" ? (
              <div className="price-box">
                <div className="price-box-header">{"60gm"}</div>
                <div className="price-box-divider"></div>
                <div className="price-box-body">{"₹69.00"}</div>
              </div>
            ) : (
              product_price.map((item, index) => (
                <div className="price-box" key={index}>
                  <div className="price-box-header">{item.weight}</div>
                  <div className="price-box-divider"></div>
                  <div className="price-box-body">{item.amount}</div>
                </div>
              ))
            )}
          </div>

          <hr className="my-3"></hr>
          <div className="ingredients-title">Ingredients:</div>
          <div className="ingredients-text">{ingredients}</div>
          <div className="mt-2">
            <button onClick={handleAddToCartClick} className="inquiry-button">
              Inquiry
              <svg
                className="ml-2 h-5 w-5 mr-0"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
