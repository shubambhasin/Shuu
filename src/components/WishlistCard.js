import axios from "axios";
import React from "react";
import { instance } from "../api/axiosapi";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { MOVE_TO_CART, REMOVE_FROM_WISHLIST } from "../reducer/actions";
import { notify } from "../utils/notification";

const WishlistCard = ({ product }) => {
  console.log(product)
  const { state, dispatch } = useProducts();

  const isInCart = (product) => {
    if (state.cart.filter((data) => data._id === product._id).length !== 0)
      return true;
    else return false;
  };
  const moveToCart = (product) => {
    if (!isInCart(product)) {
      (async () => {
        try {
          notify("Moving to cart");
          const response = await axios.post(
            "https://databaseforecomm-1.shubambhasin.repl.co/cart",
            { ...product, quantity: 1, isInCart: true }
          );
          console.log(response);
          if (response.data.success) {
            notify("Added to cart ✅");
            dispatch({ type: MOVE_TO_CART, payload: product });
            dispatch({ type: REMOVE_FROM_WISHLIST, payload: product });
          }
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      notify("already in cart ❌");
      // dispatch({ type: REMOVE_FROM_WISHLIST, payload: product })
      // TODO: alert("already in cart");
    }
    removeFromWishlist(product);
  };
  const removeFromWishlist = (product) => {
    const wishlistProductId = product._id;
    console.log(wishlistProductId);
    if (state.wishlist.length === 1) {
      clearWishlist();
    } else {
      (async () => {
        try {
          const response = await instance.delete(
            `/wishlist/${wishlistProductId}`
          );
          if (response.data.success) {
            dispatch({ type: REMOVE_FROM_WISHLIST, payload: product });
            notify("Removed from wishlist successfully ✅");
          }
        } catch (error) {
          notify("Error occurred ❌");
        }
      })();
    }
  };
  const clearWishlist = async () => {
    try {
      notify("Clearning wishlist ⏳");
      const response = await instance.delete("/wishlist");
      console.log(response);
      if (response.data.success) {
        dispatch({ type: REMOVE_FROM_WISHLIST, payload: product });
        notify("Removed from wishlist successfully ✅");
      }
    } catch (error) {
      notify("Error occured while clearing wishlist ❌");
      console.log("Error from clear wishlist", error);
    }
  };
  return (
    <div className="wishlist-card pop-out p1-rem">
      <img
        src={product.product.image}
        alt="wishlist-card"
        className="responsive"
      />
      <p>{product.product.name}</p>
      <p>Price: Rs.{product.product.price}</p>
      <div className="flex j-space-between">
        <span>
          {product.product.inStock === false && (
            <button className="btn btn-outline" disabled={true}>
              Out of stock
            </button>
          )}
          {product.product.inStock === true && (
            <button className="btn btn-red" onClick={() => moveToCart(product)}>
              Move to cart
            </button>
          )}
          <button
            className="btn btn-blue"
            onClick={() => removeFromWishlist(product)}
          >
            Remove
          </button>
        </span>
      </div>
    </div>
  );
};

export default WishlistCard;
