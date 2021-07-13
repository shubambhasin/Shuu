import React, { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import hero from "../../../assets/hero.svg";
import "./home.css";
import { NavLink } from "react-router-dom";
import { useProducts } from "../../../context/ProductContext";
import { FILL_CART } from "../../../reducer/actions";
import axios from "axios";
const Home = () => {
  const { dispatch } = useProducts();
  const { authToken } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://databaseforecomm-1.shubambhasin.repl.co/cart",
          {
            headers: {
              authorization: authToken,
            },
          }
        );
        console.log(response);
        if (response.data.success) {
          if (response.data.result.length !== 0) {
            dispatch({ type: FILL_CART, payload: response.data.result });
          }
        }
      } catch (error) {
        console.error("error:", error);
      }
    })();
  }, []);

  return (
    <div className="home home-container">
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
