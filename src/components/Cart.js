import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import CartCard from "./CartCard";
import emptyCart from "../assets/images/emptyCart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { FILL_CART } from "../reducer/actions";

const Cart = () => {
  const { state, dispatch } = useProducts();
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://databaseforecomm-1.shubambhasin.repl.co/cart"
        );
        console.log(data);
        dispatch({ type: FILL_CART, payload: data });
        console.log(state);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // const cartTotalPrice = state.cart.reduce((a,b) => a.price*a.quantity + b.price*b.quantity)


  
  
  return (
    <div className="cart container">
      <div className="cart-container">
        {state.cart.length === 0 ? (
          <span className="center-banners flex-col f-grey">
            <img src={emptyCart} alt="empty-banner" className="banners" />
            <p>Looks like your cart is empty</p>

            <p className="mtb1-rem">Start looking here... 👇</p>

            <div className="flex gap-4 mt1-rem">
              <Link className="links outline-hover f-grey" to="/new-arrivals">
                New Arrivals
              </Link>
              <Link className="links outline-hover f-grey" to="/brands">
                Brands
              </Link>
            </div>
          </span>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Cart;
