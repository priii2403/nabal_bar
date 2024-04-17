import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./Navbar.css";
function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={isSticky ? "navbar sticky" : "navbar"}>
      <div className="flex justify-between items-center ">
        <div style={{ fontFamily: "Urbanist", color: "#5d7132" }}>
          <Link
            to="/product-list"
            className="text-gray-800 text-xl font-bold md:text-2xl hover:text-yellow-900"
            style={{ color: "#5d7132" }}
          >
            NABAL-BAR
          </Link>
        </div>

        {/* Navigation links */}
        <div className="flex space-x-4">
          <NavLink  style={{ color: "#707070" }} to="/product-list">Home</NavLink>
          <NavLink style={{ color: "#707070" }} to="/product-list">Products</NavLink>
          <NavLink style={{ color: "#707070" }} to="/contact">Contact</NavLink>
          <NavLink style={{ color: "#707070" }} to="/about">About</NavLink>
        </div>
      </div>
    </nav>
  );
}

// NavLink component to handle navigation links
function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-gray-700 hover:text-yellow-900 font-medium transition ease-out duration-300"
    >
      {children}
    </Link>
  );
}

export default Navbar;
