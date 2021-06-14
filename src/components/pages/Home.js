import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import headerImage from "../../assets/headerImage.jpg";
// import hero from "../../assets/hero.jpg";
import hero from "../../assets/hero.svg";
import "./home.css";
import { NavLink } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { FILL_CART } from "../../reducer/actions";
import axios from "axios";
const Home = () => {
  const { login, setLogin } = useAuth();
  const { state, dispatch } = useProducts();
  const { authToken } = useAuth();
  console.log(authToken);
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

      <div className="tiles-3 container">
        <h1 className="h3 mtb1-rem">Mothers care</h1>

        <div className=" flex gap-2  ">
          <div className="tile pop">
            <NavLink to="/new-arrivals">
              <img
                src="https://beautyhealthtips.in/wp-content/uploads/2014/05/Health-care-tips-for-babies-during-this-summer.jpg"
                className="responsive"
                alt="baby tile"
              />
            </NavLink>
          </div>
          <div className="tile responsive pop" alt="baby tile">
            <NavLink to="/new-arrivals">
              <img
                src="https://beautyhealthtips.in/wp-content/uploads/2014/05/Health-care-tips-for-babies-during-this-summer.jpg"
                className="responsive"
                alt="baby tile"
              />
            </NavLink>
          </div>
          <div className="tile responsive pop" alt="baby tile">
            <NavLink to="/">
              <img
                src="https://beautyhealthtips.in/wp-content/uploads/2014/05/Health-care-tips-for-babies-during-this-summer.jpg"
                className="responsive"
                alt="baby tile"
              />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="tiles-3 container">
        <h1 className="h3 mtb1-rem">Mothers care</h1>
        <NavLink to="/">HEllo</NavLink>
        <div className=" flex gap-2  ">
          <div className="tile pop">
            <NavLink to="/new-arrivals">
              <img
                src="https://beautyhealthtips.in/wp-content/uploads/2014/05/Health-care-tips-for-babies-during-this-summer.jpg"
                className="responsive"
                alt="baby tile"
              />
            </NavLink>
          </div>
          <div className="tile responsive pop" alt="baby tile">
            <img
              src="https://beautyhealthtips.in/wp-content/uploads/2014/05/Health-care-tips-for-babies-during-this-summer.jpg"
              className="responsive"
              alt="baby tile"
            />
          </div>
          <div className="tile responsive pop" alt="baby tile">
            <NavLink to="/">
              <img
                src="https://beautyhealthtips.in/wp-content/uploads/2014/05/Health-care-tips-for-babies-during-this-summer.jpg"
                className="responsive"
                alt="baby tile"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
