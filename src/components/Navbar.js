import React from "react";
import { NavLink } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const Navbar = () => {

  const { state, dispatch } = useProducts()
  return (
    <div className="navbar">
      <div className="nav-items flex gap-2">
        
        <NavLink className="NavLinks" to="/">
          Home
        </NavLink>
        <NavLink className="NavLinks" to="/new-arrivals">
          New Arrivals
        </NavLink>
        <NavLink className="NavLinks" to="/brands">
          Brands
        </NavLink>
        <NavLink className="NavLinks" to="/men">
          Men
        </NavLink>
        <NavLink className="NavLinks" to="/women">
          Women
        </NavLink>
        <NavLink className="NavLinks" to="/blog">
          Blog
        </NavLink>
        <NavLink className="NavLinks" to="/contact-us">
          Contact us
        </NavLink>
      </div>
      <div className="nav-items flex gap-2">
        <NavLink className="NavLinks" to="/wishlist">
          Wishlist ({state.wishlist.length})
        </NavLink>
        <NavLink className="NavLinks" to="/cart">
          Cart  ({state.cart.length})
        </NavLink>
        <NavLink className="NavLinks" to="/profile">
          Profile
        </NavLink>
        <NavLink className="NavLinks" to="/signup">
          Signup
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
