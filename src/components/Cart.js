import React from "react";
import { useProducts } from "../context/ProductContext";
import CartCard from "./CartCard";

const Cart = () => {
  const { state, dispatch } = useProducts();

  const totalCartPrice = () => {
    return state.cart.reduce((a, b) => a.price + b.price);
  };
  return (
    <div className="cart container">
      <div className="cart-container flex j-space-between">
        <div className="product-cart">
          {state.cart.map((data) => {
            return <CartCard key={data.id} product={data} />;
          })}
        </div>
        <div className="cart-total">
          <h1>Total items: {state.cart.length}</h1>
         Total Amount {totalCartPrice()}
        </div>
      </div>
    </div>
  );
};

export default Cart;
