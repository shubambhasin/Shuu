import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import CartCard from "./CartCard";
import emptyCart from "../assets/images/emptyCart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { CLEAR_CART, FILL_CART } from "../reducer/actions";
import { useAuth } from "../context/AuthContext";
import MyLoader from "./loader/MyLoader";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { state, dispatch } = useProducts();
  const { authToken, loader, setLoader } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          "https://databaseforecomm-1.shubambhasin.repl.co/cart",
          {
            headers: {
              authorization: authToken,
            },
          }
        );
        setLoader(false);
        console.log("Cart get request response: ", response);
        if (response.data.success) {
          if (response.data.result.length !== 0) {
            dispatch({
              type: FILL_CART,
              payload: response.data.result[0].cartItems,
            });
          }
        } else {
        }
      } catch (error) {
        console.error("Cart get request error:", error);
      }
    })();
  }, []);

  // const cartTotalPrice = state.cart.reduce((a,b) => a.price*a.quantity + b.price*b.quantity)

 const clearCart = async () => {
    try {
      const response = await axios.delete(
        "https://databaseForEcomm-1.shubambhasin.repl.co/cart",
        {
          headers: {
            authorization: authToken,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        dispatch({
          type: CLEAR_CART,
        });
      }
    } catch (error) {
      console.log("Error from clear wishlist", error);
    }
  };

  return (
    <div>
      {loader && <MyLoader text="Loading please wait" />}
      {!loader && (
        <div className="cart container">
          <div className="cart-container">
            {state.cart.length === 0 ? (
              <span className="center-banners flex-col f-grey">
                <img src={emptyCart} alt="empty-banner" className="banners" />
                <p>Looks like your cart is empty</p>
                <p className="mtb1-rem">Start looking here... 👇</p>

                <div className="flex gap-4 mt1-rem">
                  <Link
                    className="links outline-hover f-grey"
                    to="/new-arrivals"
                  >
                    New Arrivals
                  </Link>
                  <Link className="links outline-hover f-grey" to="/brands">
                    Brands
                  </Link>
                </div>
              </span>
            ) : (
              <>
                <span>
                  <h1 className="h3 t-center">Cart</h1>
                  <button onClick={() => clearCart()}> Clear Cart</button>
                </span>
                <div className="flex gap-4 ">
                  <div className="product-cart p1-rem">
                    {state.cart.map((data) => {
                      return <CartCard key={data._id} product={data} />;
                    })}
                  </div>
                  <div className="cart-total p1-rem">
                    {/* <h1>Total items:{ totalItems } </h1> */}
                    Total Amount: <p className="bold">TO be fixed soon</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
