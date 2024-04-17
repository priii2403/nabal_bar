import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./Navbar.css";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={isSticky ? "navbar sticky" : "navbar"}>
      <div className="flex justify-between items-center">
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
        <div className="hidden md:flex md:space-x-4">
          <NavLink to="/product-list">Home</NavLink>
          <NavLink to="/product-list">Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden">
          <NavLink to="/product-list">Home</NavLink>
          <NavLink to="/product-list">Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
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
