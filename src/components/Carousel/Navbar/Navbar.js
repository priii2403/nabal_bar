import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import 'tailwindcss/tailwind.css';
import Footer from '../../Footer';
function Navbar() {
  return (
    <nav style={{backgroundColor: "#F1F9E3" }} className='bg-white px-6 py-3 shadow'>
      <div className='flex justify-between items-center'>
        {/* Brand name */}
        <div>
          <Link
            to='/product-list'
            className='text-gray-800 text-xl font-bold md:text-2xl hover:text-yellow-900'
          >
      NABAL-BAR
          </Link>
        </div>

        {/* Navigation links */}
        <div className='flex space-x-4'>
          <NavLink to='/product-list'>Home</NavLink>
          {/* <NavLink to='/shop'>Shop</NavLink> */}
          <NavLink to='/contact'>Contact</NavLink>
          <NavLink to='/about'>About</NavLink>
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
      className='text-gray-700 hover:text-yellow-900 font-medium transition ease-out duration-300'
    >
      {children}
    </Link>

  );
}

export default Navbar;