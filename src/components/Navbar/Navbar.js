import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { IoFilter } from "react-icons/io5";
import "./navbar.css";
import { activeStyle } from "../../utils/styles";
const Navbar = () => {
  const { state, showSidebar, setShowSidebar } = useProducts();
  const { login, setLogin } = useAuth();

  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("user");
    setLogin(false);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <NavLink className="NavLinks brand-logo" to="/">
        <h1 className="h3 bold f-orange">Cart4Mothers</h1>
      </NavLink>
      <div className="nav-items flex gap-2"></div>
      <div className="nav-items  aic flex gap-2 wide-navbar">
        <NavLink className="NavLinks bold" end activeStyle={activeStyle} to="/">
          Home
        </NavLink>
        <NavLink
          className="NavLinks bold"
          activeStyle={activeStyle}
          to="/new-arrivals"
        >
          Shop
        </NavLink>
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
          <button className="btn btn-sm btn-outline-red" onClick={signOut}>
            SignOut
          </button>
        )}
        {!login && (
          <NavLink className="NavLinks" to="/login">
            Login
          </NavLink>
        )}
      </div>
      <div className="hamburger-navbar flex aic jcc gap-1">
        <span className="h5">Filters </span>
        <IoFilter
          size={28}
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>
    </div>
  );
};

export default Navbar;
