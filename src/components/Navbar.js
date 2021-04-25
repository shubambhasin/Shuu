import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const Navbar = () => {

  const { state, dispatch } = useProducts()
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
          Wishlist ({state.wishlist.length})
        </Link>
        <Link className="links" to="/cart">
          Cart  ({state.cart.length})
        </Link>
        <Link className="links" to="/profile">
          Profile
        </Link>
        <Link className="links" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
