import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { HIGH_TO_LOW, LOAD_PRODUCTS, LOW_TO_HIGH } from "../../reducer/actions";
import Sidebar from "../Sidebar";
import ProductCard from "../ProductCard";
import Toast from "../Toast";
import { NavLink } from "react-router-dom";
import BottomNavbar from "../bottomNavbar/BottomNavbar";

const NewArrivals = () => {
  const { state, dispatch, loader, setLoader, showSidebar, setShowSidebar } = useProducts();

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

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    }
    handleResize()

    window.addEventListener("resize", handleResize);

    return () => {
      handleResize();
    };
  }, [window.innerWidth]);
  

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
          a.offer * a.price * 0.01 -
          (b.price - b.offer * b.price * 0.01)
      );
    } else {
      console.log("no sorting done");
      return productList;
    }
  };

  const sortedData = getSortedData(state.products, state.sortBy);
  const filteredData = getFilteredData(sortedData, {
    inStock, fastDelivery
  });
  
  return (
    <div className="new-arrivals container">
      <BottomNavbar/>
      {loader ? (
        <p className="loader">Loading...</p>
      ) : (
        <div className="product-container">
          <Sidebar  />
          <div>
            {/* <h1 className="h3 ml1-rem mb1-rem">New Arrivals</h1> */}
          <div className="products-section">
            
            {filteredData.map((data) => {
              return (
                <NavLink key={data._id} className="links" to={`/products/${data._id}`}>
                  <ProductCard product={data} />
                </NavLink>
              );
            })}
            {/* <Toast message="Item added to cart" /> */}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
