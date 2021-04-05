import React from "react";
import { useProducts } from "../context/ProductContext";

const Toast = ({ message }) => {
  const { state } = useProducts();
  return (
    <div
      className={`${
        state.toast.tState ? `show-toast toast-${state.toast.bg}` : `hide-toast`
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
