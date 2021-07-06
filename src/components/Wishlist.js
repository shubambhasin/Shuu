import React, { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import WishlistCard from "./WishlistCard";
import emptyCart from "../assets/images/emptyCart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { FILL_WISHLIST } from "../reducer/actions";
import { useAuth } from "../context/AuthContext";
import MyLoader from "./loader/MyLoader";
import {instance} from '../api/axiosapi'

const Wishlist = () => {
  const { state, dispatch } = useProducts();
  const { authToken, loader, setLoader } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const response = await instance.get('/wishlist')
        
        setLoader(false);
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

  const clearWishlist = () => {
    try {
      const response = instance.delete("/wishlist")

      console.log(response);
    } catch (error) {
      console.log("Error from clear wishlist", error);
    }
  };
  return (
    <div>
      {loader && <MyLoader text="Loading please wait..." />}

      {!loader && (
        <div className="wishlist container">
          {/* -------------Checking if wishlist is empty or not hanece showing the banner------------- */}
          {state.wishlist.length === 0 ? (
            <span className="center-banners flex-col">
              <img src={emptyCart} alt="empty-card" className="banners" />
              <p className="h3 f-grey">Oooops ! Wishlist is empty</p>

              <p className="f-grey h4 mtb1-rem">Shop here 👇</p>
              <span className="flex gap-4 mt1-rem">
                {/* -------Buy links------ */}
                <Link className="links f-grey" to="/new-arrivals">
                  New Arrivals
                </Link>
                <Link className="links f-grey" to="/brands">
                  Brands
                </Link>
              </span>
            </span>
          ) : (
            //   ----------Wishlist display-------------
            <>
              <span>
                <h1 className="h3 t-center">Wishlist</h1>
                <button onClick={() => clearWishlist()}> Clear Wishlist</button>
              </span>
              <div className="flex f-wrap gap-2 wishlist-flex ">
                {state.wishlist.map((data) => {
                  return <WishlistCard product={data} />;
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
