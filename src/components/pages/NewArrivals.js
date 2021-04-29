import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { LOAD_PRODUCTS } from "../../reducer/actions";
import Sidebar from "../Sidebar";
import ProductCard from "../ProductCard";
import Toast from "../Toast";
import { NavLink } from "react-router-dom";

const NewArrivals = () => {
  const { state, dispatch, loader, setLoader } = useProducts();

  useEffect(() => {
    (async () => {
      try {
       const products = await axios.get("https://databaseforecomm.shubambhasin.repl.co/products");

        console.log(products)

        dispatch({ type: LOAD_PRODUCTS, payload: products.data });
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const filteredProducts = (product) => {
    const filtered_products = product;

    return filtered_products;
  };

  return (
    <div className="new-arrivals container">
      {loader ? (
        <p className="loader">Loading...</p>
      ) : (
        <div className="flex gap-4">
          <Sidebar />
          <div className="products-section flex gap-2 f-wrap">
            {filteredProducts(state.products).map((data) => {
              return <NavLink to={`/products/${data._id}`}><ProductCard key={data._id} product={data} /></NavLink>;
            })}

            <Toast message="Item added to cart" />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
