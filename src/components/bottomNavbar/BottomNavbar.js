import React from "react";
import { activeStyle } from "../../utils/styles";
import { NavLink } from "react-router-dom";
import "./bottomnavbar.css";
import { useProducts } from "../../context/ProductContext";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineHeart, AiOutlineShop } from "react-icons/ai";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const BottomNavbar = () => {
  const { state } = useProducts();
  return (
    <div className="bottom-navbar jcc aic">
      <NavLink className="NavLinks" end activeStyle={activeStyle} to="/">
        <span className="flex flex-col aic jcc">
          <AiOutlineHome size={28} />
          <small className="light-small">Home</small>
        </span>
      </NavLink>
      <NavLink
        className="NavLinks"
        activeStyle={activeStyle}
        to="/new-arrivals"
      >
        <span className="flex flex-col jcc aic">
          <AiOutlineShop size={28} />
          <small className="light-small">Shop</small>
        </span>
      </NavLink>
      <NavLink className="NavLinks" activeStyle={activeStyle} to="/wishlist">
        <span className="flex flex-col jcc aic">
          <AiOutlineHeart size={28} />
          <small className="light-small">Wishlist</small>
        </span>
        {/* ({state.wishlist.length}) */}
      </NavLink>
      <NavLink className="NavLinks" activeStyle={activeStyle} to="/cart">
        <span className="flex flex-col jcc aic">
          <FiShoppingCart size={28} />
          <small className="light-small">Cart</small>
        </span>
        {/* ({state.cart.length}) */}
      </NavLink>
      <NavLink className="NavLinks" activeStyle={activeStyle} to="/profile">
        <span className="flex flex-col jcc aic">
          <FiUser size={28} />
          <small className="light-small">Profile</small>
        </span>
      </NavLink>
    </div>
  );
};

export default BottomNavbar;
