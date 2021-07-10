import axios from "axios";
import React from "react";
import { instance } from "../api/axiosapi";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import {
  ADD_TO_WISHLIST,
  CLEAR_CART,
  DECREASE_QTY,
  INCREASE_QTY,
  MOVE_TO_WISHLIST,
  REMOVE_FROM_CART,
} from "../reducer/actions";
import { notify } from "../utils/notification";

const CartCard = ({ product }) => {
  const { state, dispatch } = useProducts();
  const { authToken } = useAuth();

  const isInWishlist = (product) => {
    if (
      state.wishlist.filter((data) => data._id === product._id).length === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const MOVE_TO_WISHLIST = (product) => {
    if (!isInWishlist(product)) {
      (async (req, res) => {
        try {
          notify("Adding to wishlist ⏳ ");
          const response = await instance.post("/wishlist", {
            ...product,
          });
          if (response.status.success) {
            removeFromCart(product);
            dispatch({ type: ADD_TO_WISHLIST, payload: product });
            notify("Added to wishlist ✅ ");
          }
          if (response.status.error) {
            notify("Unknown error occurred");
          }
        } catch (error) {
          console.log("Error from cart card, add to wishlist ", error);
          notify("Unknown error occurred");
        }
      })();
    } else {
      try {
        removeFromCart(product);
        dispatch({ type: REMOVE_FROM_CART, payload: product });
        notify("Already in wishlist");
      } catch (error) {
        console.log(error);
        notify("Error adding to wishlist ❌");
      }
      // TODO: add toast here
    }
  };

  const removeFromCart = (product) => {
    if (state.cart.length === 1) {
      clearCart();
    } else {
      (async () => {
        try {
          const cartProductId = product._id;

          console.log(cartProductId);

          const response = await instance.delete(`/cart/${cartProductId}`);

          console.log(response);
          if (response.data.success) {
            dispatch({ type: REMOVE_FROM_CART, payload: product });
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  };

  const clearCart = async () => {
    try {
      const response = await instance.delete("/cart");
      console.log(response);
      if (response.data.success) {
        dispatch({
          type: CLEAR_CART,
        });
      }
    } catch (error) {
      console.log("Error from clear cart", error);
    }
  };

  const increaseQuantity = async (product) => {
    try {
      const response = await instance.post(`/cart/${product.product._id}`);
    } catch (error) {
      console.log(error);
    }
    // dispatch({ type: INCREASE_QTY, payload: product })
  };
  return (
    <div className="cart-card pop-out">
      <img src={product.product.image} alt="cart-card" className="responsive" />
      <p>{product.product.name}</p>
      <p>Price: Rs. {product.product.price}</p>

      <span className="flex j-centre">
        <button
          className="btn btn-sm btn-blue"
          onClick={() => dispatch({ type: DECREASE_QTY, payload: product })}
        >
          {" "}
          -{" "}
        </button>
        <span className="b1px"> {product.quantity}</span>
        <button className="btn btn-sm btn-blue" onClick={increaseQuantity}>
          {" "}
          +{" "}
        </button>
      </span>
      <span className="flex j-centre gap-2 mtb1-rem">
        {" "}
        <button
          className="btn btn-sm btn-red"
          onClick={() => removeFromCart(product)}
        >
          Remove
        </button>
        <button
          onClick={() => MOVE_TO_WISHLIST(product)}
          className="btn btn-sm btn-red"
        >
          Move to Wishlist
        </button>
      </span>
    </div>
  );
};

export default CartCard;
