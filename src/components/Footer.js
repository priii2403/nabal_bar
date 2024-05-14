import React from "react";
import { useNavigate } from "react-router-dom";
import { Colors } from "./utils";

function Footer() {
  const navigate = useNavigate();

  const renderContact = () => {
    navigate("/contact");
  };

  return (
    <div
      style={{ backgroundColor: Colors.mainTheme2, Colors: "#ffff" }}
      className="bg-green-200 py-8 md:py-5"
    >



      <div className="container mx-auto px-4 py-10 md:flex md:items-center md:justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0 ">
          <h2
            style={{ color: "#ffff", fontWeight: "bold" }}
            className="text-4xl fo"
          >
            Find us.
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between ">
            <p
              style={{ fontFamily: "Urbanist" }}
              className="text-white mt-4 md:w-2/3 mx-auto md:mx-0"
            >
              To: Rafala ,Distict:Amreli Pincode: 365440, Gujarat,India
            </p>
            <button
              onClick={renderContact}
              style={{ backgroundColor: "#5d7132", marginTop: "20px" }}
              className="bg-gray-600 text-white font-bold px-6 py-3 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 "
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
