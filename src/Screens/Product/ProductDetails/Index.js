import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "../Productlist.css";
const Index = () => {
  const location = useLocation();
  // const { id } = useParams();
  // const file = files[id];
  const { id, name, url, ingredients } = location.state.file;

  return (
    <main  className="mt-0 md:mt-20 w-screen h-screen md:h-full md:mb-60   ">
      <div className="flex flex-col md:flex-row justify-center gap-x-12 ">
        <div className="flex flex-col relative">
          <img
            class="h-120 mx-auto w-full md:h-full md:rounded-md mt-10 mb-10 max-w-lg"
            src={url}
            alt={name}
            // style={{ height: '100', width: '100', maxWidth: '50%' }}
          />
         
        </div>
        <div className="flex flex-col w-full p-6 md:p-0 md:w-72 ">
          <h1 className="font-bold text-green-900 text-3xl mt-10">{name}</h1>
          <span
            dangerouslySetInnerHTML={{ __html: "100gm" }}
            className="block text-gray-500 text-sm"
          />
          <span className="text-gray-500 mt-3">${300}</span>
          <hr className="my-3"></hr>

          <div className="text-gray-600 text-xl">ingredients :</div>
          <div className="text-gray-400 text-xl">{ingredients}</div>
          <div className="mt-2  0">
            <button
              // onClick={() => onAddToCart(id)}
              style={{backgroundColor:"#8a9557"}}
              className="flex uppercase mt-5 px-3 py-2 text-white text-sm font-medium rounded hover:bg-yellow-800 focus:outline-none focus:bg-yellow-800 disabled:opacity-30"
              // disabled={item.is.sold_out}
            >
              {false ? <p>Sold Out</p> : <p>Add to Cart</p>}{" "}
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
