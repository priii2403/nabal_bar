import React from "react";
import { useLocation } from "react-router-dom";
import "../Productlist.css";
import { Colors, product_price } from "../../../components/utils";
const Index = () => {
  const phoneNumber = '919724817980';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const location = useLocation();
  const { id, name, url, ingredients } = location.state.file;

  const handleAddToCartClick = () => {
    window.location.href = whatsappUrl;
  };
  return (
    <main className="mt-0 md:mt-20 w-screen h-screen md:h-full md:mb-60   ">
      <div className="flex flex-col md:flex-row justify-center gap-x-12 ">
        <div className="flex flex-col relative">
          <img
            class="h-140 mx-auto w-full md:h-full md:rounded-md mt-10  max-w-lg"
            src={url}
            alt={name}
          />
        </div>
        <div className="flex flex-col w-full p-6 md:p-0 md:w-72">
          <h1 className="font-bold text-green-900 text-3xl mt-10">{name}</h1>

        {    console.log("name",name)}
          <div className="text-gray-500 text-sm flex flex-row mt-5">
          {
  (name === 'Cucumber' || name === "Three Layer (Multani Mitti, Coffee, Besan)") ? (
    <div style={{ borderColor: Colors.mainTheme2 }} className="flex flex-col mr-4 border rounded">
      <div style={{ backgroundColor: Colors.mainTheme2, color: "#ffff", paddingRight: "20px", paddingLeft: "20px", fontSize: "10px" }}>{"80gm"}</div>
      <div className="line" style={{ width: "100%", height: "2px", backgroundColor: "grey" }}></div>
      <div style={{ paddingRight: "10px", paddingLeft: "10px", paddingTop: "5px", paddingBottom: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>{"₹79.00"}</div>
    </div>
  ) : (
    name === "Scrub" ? (
      <div style={{ borderColor: Colors.mainTheme2 }} className="flex flex-col mr-4 border rounded">
        <div style={{ backgroundColor: Colors.mainTheme2, color: "#ffff", paddingRight: "20px", paddingLeft: "20px", fontSize: "10px" }}>{"60gm"}</div>
        <div className="line" style={{ width: "100%", height: "2px", backgroundColor: "grey" }}></div>
        <div style={{ paddingRight: "10px", paddingLeft: "10px", paddingTop: "5px", paddingBottom: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>{"₹69.00"}</div>
      </div>
    ) : (
      product_price.map((item, index) => (
        <div style={{ borderColor: Colors.mainTheme2 }} className="flex flex-col mr-4 border rounded" key={index}>
          <div style={{ backgroundColor: Colors.mainTheme2, color: "#ffff", paddingRight: "20px", paddingLeft: "20px", fontSize: "10px" }}>{item.weight}</div>
          <div className="line" style={{ width: "100%", height: "2px", backgroundColor: "grey" }}></div>
          <div style={{ paddingRight: "10px", paddingLeft: "10px", paddingTop: "5px", paddingBottom: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.amount}</div>
        </div>
      ))
    )
  )
}
            {/* {
              name === 'Cucumber' &&b 
            } */}
          
          </div>

          <hr className="my-3"></hr>

          <div className="text-gray-600 text-xl">ingredients :</div>
          <div className="text-gray-400 text-xl">{ingredients}</div>
          <div className="mt-2  0">
            <button
onClick={handleAddToCartClick}
              style={{ backgroundColor: Colors.mainTheme2 }}
              className="flex uppercase mt-5 px-3 py-2 text-white text-sm font-medium rounded hover:bg-yellow-800 focus:outline-none focus:bg-yellow-800 disabled:opacity-30"
            >
              {<p >Inquiry</p>}
              <svg
                className="ml-2 h-5 w-5 mr-0"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
