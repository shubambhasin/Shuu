import React from "react";
import { useProducts } from "../context/ProductContext";
import {
  DECREASE_QTY,
  INCREASE_QTY,
  REMOVE_FROM_CART,
} from "../reducer/actions";

const CartCard = ({ product }) => {
  const { name, id, price, quantity, image } = product;
  const { dispatch } = useProducts();
  return (
    <div className="cart-card">
      <img src={image} alt="cart-card" className="responsive" />
      <p>{name}</p>
      <p>Price: Rs. {price * quantity}</p>
      <div className="flex j-space-between">
        <span>
          <button
            className="btn btn-blue"
            onClick={() => dispatch({ type: DECREASE_QTY, payload: product })}
          >
            {" "}
            -{" "}
          </button>
          <span className="b1px"> {quantity}</span>
          <button
            className="btn btn-blue"
            onClick={() => dispatch({ type: INCREASE_QTY, payload: product })}
          >
            {" "}
            +{" "}
          </button>
        </span>
        <span>
          {" "}
          <button
            className="btn btn-red"
            onClick={() =>
              dispatch({ type: REMOVE_FROM_CART, payload: product })
            }
          >
            Remove
          </button>
        </span>
      </div>
    </div>
  );
};

export default CartCard;
