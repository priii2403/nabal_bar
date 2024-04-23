import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./Navbar.css";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToMiddle = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight / 6,
      behavior: "smooth",
    });
    closeMobileMenu();
  };

  return (
    <nav className={isSticky ? "navbar sticky" : "navbar"}>
      <div className="flex justify-between items-center">
        <div style={{ fontFamily: "Urbanist", color: "#5d7132" }}>
          <Link
            to="/product-list"
            className="text-gray-800 text-xl font-bold md:text-2xl hover:text-yellow-900"
            style={{ color: "#5d7132" }}
            onClick={scrollToMiddle} // Scroll to middle when clicking NABAL-BAR
          >
            NABAL-BAR
          </Link>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex md:space-x-4">
          <NavLink to="/product-list" onClick={closeMobileMenu}>
            Home
          </NavLink>
          <NavLink to="/product-list" onClick={scrollToMiddle}>
            Products
          </NavLink>
          <NavLink to="/contact" onClick={closeMobileMenu}>
            Contact
          </NavLink>
          <NavLink to="/about" onClick={closeMobileMenu}>
            About
          </NavLink>
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
        <div ref={mobileMenuRef} className="mobile-menu md:hidden">
          <NavLink to="/product-list" onClick={closeMobileMenu}>
            Home
          </NavLink>
          <NavLink to="/product-list" onClick={scrollToMiddle}>
            Products
          </NavLink>
          <NavLink to="/contact" onClick={closeMobileMenu}>
            Contact
          </NavLink>
          <NavLink to="/about" onClick={closeMobileMenu}>
            About
          </NavLink>
        </div>
      )}
    </nav>
  );
}

// NavLink component to handle navigation links
function NavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-gray-700 hover:text-yellow-900 font-medium transition ease-out duration-300"
    >
      {children}
    </Link>
  );
}

export default Navbar;
