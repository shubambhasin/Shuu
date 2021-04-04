import React from "react";
import { useProducts } from "../context/ProductContext";

const Cart = () => {
    const { state, dispatch } = useProducts()
  return (
    <div className="cart container">
      <h1 className="h1">This is a Cart</h1>
      {
          state.cart.map((data) => {
              return(
                  <p>{data.name}</p>
              )
          })
      }
    </div>
  );
};

export default Cart;
