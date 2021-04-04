import React, { createContext, useContext, useReducer, useState } from "react";
import reducerFunction from "../components/reducer/reducerFunction";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [loader, setLoader] = useState(true)
  const [state, dispatch] = useReducer(reducerFunction, {
    products: [],
    cart: [],
    wishlist: [],
  });
  return (
    <>
      <ProductContext.Provider value={{ state, dispatch, loader, setLoader }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};

export const useProducts = () => useContext(ProductContext);
