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
    <main className="container">
      <div className="flex flex-col md:flex-row justify-center gap-x-12">
        <div className="relative">
          <img className="product-image" src={url} alt={name} />
        </div>
        <div className="details-container">
          <h1 className="product-title">{name}</h1>
          <div className="prices-container">
            {name === "Cucumber" || name === "Three Layer (Multani Mitti, Coffee, Besan)" ? (
              <PriceCard weight="80gm" amount="₹79.00" />
            ) : name === "Scrub" ? (
              <PriceCard weight="60gm" amount="₹69.00" />
            ) : (
              product_price.map((item, index) => (
                <PriceCard key={index} weight={item.weight} amount={item.amount} />
              ))
            )}
          </div>
          <hr className="separator" />
          <div className="ingredients-container">
            <div className="label">Ingredients:</div>
            <div className="ingredients">{ingredients}</div>
          </div>
          <div className="button-container">
  <button className="inquiry-button" onClick={handleAddToCartClick}>
    <span>Inquiry</span>
    <svg
      className="button-icon"
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

const PriceCard = ({ weight, amount }) => (
  <div className="price-card">
    <div className="weight">{weight}</div>
    <div className="amount">{amount}</div>
  </div>
);

export default Index;
