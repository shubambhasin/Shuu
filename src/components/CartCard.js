import React from "react";
import { useProducts } from "../context/ProductContext";
import {
  ADD_TO_WISHLIST,
  DECREASE_QTY,
  INCREASE_QTY,
  MOVE_TO_WISHLIST,
  REMOVE_FROM_CART,
} from "../reducer/actions";

const CartCard = ({ product }) => {
  const { name, id, price, quantity, image } = product;
  const { state, dispatch } = useProducts();

  const isInWishlist = (product) => {
    if (state.wishlist.filter((data) => data.id === product.id).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const MOVE_TO_WISHLIST = () => {
    if (!isInWishlist(product)) {
      dispatch({ type: ADD_TO_WISHLIST, payload: product });
      dispatch({ type: REMOVE_FROM_CART, payload: product });
    } else {
      dispatch({ type: REMOVE_FROM_CART, payload: product });
      // TODO: add toast here
    }
  };

  return (
    <div className="cart-card pop-out">
      <img src={image} alt="cart-card" className="responsive" />
      <p>{name}</p>
      <p>Price: Rs. {price * quantity}</p>

      <span className="flex j-centre">
        <button
          className="btn btn-sm btn-blue"
          onClick={() => dispatch({ type: DECREASE_QTY, payload: product })}
        >
          {" "}
          - {" "}
        </button>
        <span className="b1px"> {quantity}</span>
        <button
          className="btn btn-sm btn-blue"
          onClick={() => dispatch({ type: INCREASE_QTY, payload: product })}
        >
          {" "}
          +{" "}
        </button>
      </span>
      <span className="flex j-centre gap-2 mtb1-rem">
        
          {" "}
          <button
            className="btn btn-sm btn-red"
            onClick={() =>
              dispatch({ type: REMOVE_FROM_CART, payload: product })
            }
          >
            Remove
          </button>
          <button onClick={() => MOVE_TO_WISHLIST(product)} className="btn btn-sm btn-red">Move to Wishlist</button>
        
      </span>
    </div>
  );
};

export default CartCard;
