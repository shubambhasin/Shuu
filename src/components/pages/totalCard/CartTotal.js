import React, { useState } from "react";
import { useProducts } from "../../../context/ProductContext";

const CartTotal = () => {
  const [price, setTotalPrice] = useState(0);
  const { state } = useProducts();
  const cartTotalPrice = state.cart.map(
    (data) => data.quantity * data.product.price
  );
 const total =(cartTotalPrice.reduce((a, b) => a + b));
  return <div>Rs: {total}</div>;
};

export default CartTotal;
