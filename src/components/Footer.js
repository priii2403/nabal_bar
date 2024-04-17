import React from "react";
import { useNavigate } from "react-router-dom";
import { Colors } from "./utils";

function Footer() {
  const navigate = useNavigate();

  const renderContact = () => {
    navigate("/contact");
  };

  const renderAccount = () => {
    navigate("/about");
  };

  return (
    <div
      style={{ backgroundColor: Colors.mainTheme2, Colors: "#ffff" }}
      className="bg-green-200 py-8 md:py-5"
    >
      <div className="container mx-auto px-4 md:flex md:items-center md:justify-between ">
        <div className="text-center md:text-left mb-6 md:mb-0 ">
          <h2 style={{ color: "#ffff" ,fontWeight:'bold'}} className="text-4xl fo">
            Find us.
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between ">
  <p  style ={{fontFamily: "Urbanist"}}className="text-white mt-4 md:w-2/3 mx-auto md:mx-0">
    Corporate Office Address: 194-0013 Tokyo, Machida, Haramachida, 6 Chome−9−8, Aeta Machida, 4th Floor BUSO AGORA
  </p>
  <button
    onClick={renderContact}
    style={{backgroundColor:"#5d7132"}}
    className="bg-gray-600 text-white font-bold px-6 py-3 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4"
  >
    Contact Us
  </button>
</div>

        </div>
      </div>
      <div className='flex space-x-4  px-20 py-5'>
            <strong className='text-xl text-white'>NABAL BAR</strong>
            <a onClick={renderAccount} className='cursor-pointer text-white hover:text-green-600 uppercase'>About</a>
            <a className='cursor-pointer text-white hover:text-green-600 uppercase'>Services</a>
            <a className='cursor-pointer text-white hover:text-green-600 uppercase'>Why us</a>
            <a onClick={renderContact} className='cursor-pointer text-white hover:text-green-600 uppercase'>Contact</a>
          </div>
      <hr className="border-white  md:my-12" />
      <p className="text-white text-center">
        Created in React by Jerome Tolentino
      </p>
    </div>
  );
}

export default Footer;
