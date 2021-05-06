import React, { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import WishlistCard from "./WishlistCard";
import emptyCart from "../assets/images/emptyCart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { FILL_WISHLIST } from "../reducer/actions";
const Wishlist = () => {
  const { state, dispatch } = useProducts();

  useEffect(() => {

    (async() => {

      try{

        const { data } = await axios.get("https://databaseforecomm-1.shubambhasin.repl.co/wishlist")

        console.log(data)

        dispatch({ type: FILL_WISHLIST, payload: data})

      }catch(error)
      {
        console.error(error)
      }

    })()

  }, [])
  return (
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
          <div className="flex f-wrap gap-2 wishlist-flex ">
            {state.wishlist.map((data) => {
              return <WishlistCard product={data} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
