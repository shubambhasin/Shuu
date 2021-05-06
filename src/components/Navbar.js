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

  const activeStyle={
    color: "#ff7100"
  }
  return (
    <div className="navbar">
      <NavLink className="NavLinks brand-logo" to="/">
        <h1 className="h4 bold">Cart4Mothers</h1>

      </NavLink>
      <div className="nav-items flex gap-2">
        <NavLink className="NavLinks bold" end activeStyle={activeStyle} to="/">
          Home
        </NavLink>
        <NavLink className="NavLinks bold" activeStyle={activeStyle} to="/new-arrivals">
          Moms
        </NavLink>
        <NavLink className="NavLinks bold" activeStyle={activeStyle} to="/brands">
          Babies
        </NavLink>
        <NavLink className="NavLinks bold" activeStyle={activeStyle} to="/men">
          Clothing
        </NavLink>
        {/* <NavLink className="NavLinks" to="/women">
          Women
        </NavLink>
        <NavLink className="NavLinks" to="/blog">
          Blog
        </NavLink>
        <NavLink className="NavLinks" to="/contact-us">
          Contact us
        </NavLink> */}
      </div>
      <div className="nav-items flex gap-2">
        <NavLink className="NavLinks" activeStyle={activeStyle} to="/wishlist">
          Wishlist ({state.wishlist.length})
        </NavLink>
        <NavLink className="NavLinks" activeStyle={activeStyle} to="/cart">
          Cart ({state.cart.length})
        </NavLink>
        <NavLink className="NavLinks" activeStyle={activeStyle} to="/profile">
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
