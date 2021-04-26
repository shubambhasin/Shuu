import React from "react";
import { useProducts } from "../context/ProductContext";
import CartCard from "./CartCard";
import emptyCart from "../assets/images/emptyCart.svg";
import { Link } from "react-router-dom";

const Cart = () => {
  const { state } = useProducts();

  const totalCartPrice = () => {
    return (state.cart.reduce((a, b) => a.price + b.price))
  };
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
                return <CartCard key={data.id} product={data} />;
              })}
            </div>
            <div className="cart-total p1-rem">
                <button onClick={() => state.cart.reduce((a,b) => a.quantity + b.quanriry )}>Total</button>
              <h1>Total items: </h1>
              Total Amount {() => totalCartPrice()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
