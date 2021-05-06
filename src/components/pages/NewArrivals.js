import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { HIGH_TO_LOW, LOAD_PRODUCTS, LOW_TO_HIGH } from "../../reducer/actions";
import Sidebar from "../Sidebar";
import ProductCard from "../ProductCard";
import Toast from "../Toast";
import { NavLink } from "react-router-dom";

const NewArrivals = () => {
  const { state, dispatch, loader, setLoader } = useProducts();

  const { inStock, fastDelivery } = state

  useEffect(() => {
    (async () => {
      try {
        const products = await axios.get(
          "https://databaseforecomm.shubambhasin.repl.co/products"
        );

        console.log(products);

        dispatch({ type: LOAD_PRODUCTS, payload: products.data });
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function getFilteredData(productList, filterType) {
    return productList.filter(({ inStock, fastDelivery }) =>
      filterType.inStock  ? true : inStock
    );
  }

  const getSortedData = (productList, sortBy) => {
    if (sortBy === HIGH_TO_LOW) {
      console.log("high to low");
      return productList.sort(
        (a, b) =>
          b.price -
          b.offer * b.price * 0.01 -
          (a.price - a.offer * a.price * 0.01)
      );
    }
    if (sortBy === LOW_TO_HIGH) {
      console.log("low to high");
      return productList.sort(
        (a, b) =>
          a.price -
          a.offer * a .price * 0.01 -
          (b.price - b.offer * b.price * 0.01)
      );
    } else {
      console.log("no sorting done");
      return productList;
    }
  };

  const sortedData = getSortedData(state.products, state.sortBy);
  // const filteredData = getFilteredData(sortedData, state.sortBy)
  const filteredData = getFilteredData(sortedData, {
    inStock, fastDelivery
  });

  return (
    <div className="new-arrivals container">
      {loader ? (
        <p className="loader">Loading...</p>
      ) : (
        <div className="flex gap-4">
          <Sidebar />
          <div className="products-section flex gap-2 f-wrap">
            {filteredData.map((data) => {
              return (
                <NavLink className="links" to={`/products/${data._id}`}>
                  <ProductCard key={data._id} product={data} />
                </NavLink>
              );
            })}

            <Toast message="Item added to cart" />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
