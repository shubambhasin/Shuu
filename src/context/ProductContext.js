import React, { createContext, useContext, useReducer, useState } from "react";
import { HIGH_TO_LOW, LOW_TO_HIGH } from "../reducer/actions";
import reducerFunction from "../reducer/reducerFunction";

export const ProductContext = createContext();



export const ProductProvider = ({ children }) => {
    const [loader, setLoader] = useState(true)
  const [state, dispatch] = useReducer(reducerFunction, {
    products: [],
    cart: [],
    wishlist: [],
    toast : {
        tState:false,
        bg: ""
      },
      inStock: true,
      sortBy: "",
      fastDelivery: true
  });

  console.log("************************cart**************",state.cart)
  return (
    <>
      <ProductContext.Provider value={{ state, dispatch, loader, setLoader }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};

export const useProducts = () => useContext(ProductContext);
