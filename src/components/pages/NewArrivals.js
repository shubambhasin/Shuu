import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { LOAD_PRODUCTS } from "../reducer/actions";
import Sidebar from "../Sidebar";
import ProductCard from "../ProductCard";

const NewArrivals = () => {
  const { state, dispatch, loader, setLoader } = useProducts();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { products },
        } = await axios.get("/api/products");

        dispatch({ type: LOAD_PRODUCTS, payload: products });
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="new-arrivals container">
      {loader ? (
        <p className="loader">Loading...</p>
      ) : (
        <div className="flex gap-4">
          <Sidebar />
          <div className="products-section flex gap-2 f-wrap">
            {state.products.map((data) => {
              return <ProductCard key={data.id} product={data} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
