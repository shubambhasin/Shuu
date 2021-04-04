import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-items flex gap-2">
        
        <Link className="links" to="/">
          Home
        </Link>
        <Link className="links" to="/new-arrivals">
          New Arrivals
        </Link>
        <Link className="links" to="/brands">
          Brands
        </Link>
        <Link className="links" to="/men">
          Men
        </Link>
        <Link className="links" to="/women">
          Women
        </Link>
        <Link className="links" to="/blog">
          Blog
        </Link>
        <Link className="links" to="/contact-us">
          Contact us
        </Link>
      </div>
      <div className="nav-items flex gap-2">
        <Link className="links" to="/wishlist">
          Wishlist
        </Link>
        <Link className="links" to="/cart">
          Cart
        </Link>
        <Link className="links" to="/profile">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
