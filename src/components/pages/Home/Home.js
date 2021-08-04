import React, { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import hero from "../../../assets/hero.svg";
import "./home.css";
import { NavLink } from "react-router-dom";
import { useProducts } from "../../../context/ProductContext";
import { FILL_CART, FILL_WISHLIST } from "../../../reducer/actions";
import axios from "axios";
import { instance } from "../../../api/axiosapi";
import BottomNavbar from "../../bottomNavbar/BottomNavbar";
const Home = () => {
  const { dispatch } = useProducts();

  useEffect(() => {
    (async () => {
      try {
        const response = await instance.get(
          "/cart");
        console.log(response);
        if (response.data.success) {
          if (response.data.result.length !== 0) {
            dispatch({
              type: FILL_CART,
              payload: response.data.result[0].cartItems,
            });
          }
        }
      } catch (error) {
        console.error("error:", error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        // setLoader(true);
        const response = await instance.get('/wishlist')
        
        // setLoader(false);
        console.log(response)
        if (response.data.success) {
          if (response.data.wishlistData.length !== 0) {
            console.log(response.data.wishlistData);
            dispatch({
              type: FILL_WISHLIST,
              payload: response.data.wishlistData[0].wishlistItems,
            });
          } else {
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="home home-container">
      <BottomNavbar/>
      <div className="hero">
        <div className="flex flex-col jcc aic w-50">
          <div className="">
            <header>
              <h1 className="h1 f-xx-lg mtb1-rem">
                {" "}
                Mother and baby care range starts ar just 499/-
              </h1>
            </header>
            <NavLink
              to="/new-arrivals"
              className="btn btn-lg btn-green mt3-rem"
            >
              Shop now
            </NavLink>
          </div>
        </div>
        <img src={hero} alt="hero" className="responsive" />
      </div>
    </div>
  );
};

export default Home;
