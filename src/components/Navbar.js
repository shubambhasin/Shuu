import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";

const Navbar = () => {
  const { state, dispatch } = useProducts();
  const { login, setLogin } = useAuth();

  const signOut = () => {
    setLogin(false);
    localStorage.setItem("user", JSON.stringify({ login: false }));
  };
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
          Cart ({state.cart.length})
        </NavLink>
        <NavLink className="NavLinks" to="/profile">
          Profile
        </NavLink>
        {login && (
          <button className="btn btn-red" onClick={signOut}>
            SignOut
          </button>
        )}
        {!login && (
          <NavLink className="NavLinks" to="/signup">
            Signup
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
