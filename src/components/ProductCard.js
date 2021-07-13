import axios from "axios";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  TOGGLE_TOAST,
  REMOVE_FROM_CART,
} from "../reducer/actions";

// calculate card final price
export const finalPrice = (price, offer) => {
  return price - offer * price * 0.01;
};

const ProductCard = ({ product }) => {
  const { state, dispatch } = useProducts();
  const {
    name,
    ratings,
    image,
    price,
    brand,
    inStock,
    fastDelivery,
    category,
    offer,
  } = product;
  const { authToken } = useAuth();

  // checking i product is in car t or not

  const isProductInCart = (product) => {
    return state.cart.filter((data) => data._id === product._id);
  };

  const isInWishlist = (product) => {
    if (
      state.wishlist.filter((data) => data._id === product._id).length === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const moveToWishlist = () => {
    if (!isInWishlist(product)) {
      dispatch({ type: ADD_TO_WISHLIST, payload: product });
      dispatch({ type: REMOVE_FROM_CART, payload: product });
      // TODO: removes the item from the cart from the home page it self
    } else {
      dispatch({ type: REMOVE_FROM_CART, payload: product });
      // TODO: add toast here.
    }
  };

  // adding product to cart
  const addToCart = async (product) => {
    const response = await axios.post(
      "https://databaseforecomm-1.shubambhasin.repl.co/cart",
      { ...product, quantity: 1, inCart: true },
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    console.log(response);
  };
  return (
    <div className="product-card">
      <img src={image} alt="product-card" className="card-img responsive" />
      <div className="p03rem">
        <span className="flex flex-col">
          <span className="flex gap-2">
            <p className="card-brand bold">{brand}</p>
            <p className="card-name">{name}</p>
          </span>
          <span>
            Rs. <span className="strike bold">{Number(`${price}`)} </span>{" "}
            {Number(finalPrice(price, offer))}{" "}
            <span className="f-red"> ({offer}% off)</span>
          </span>

          <p className={`star-${Math.floor(`${ratings}`)}`}></p>
        </span>
        <p className="card-category flag-left">{category} </p>
        <small className="flex gap-2 smaller">
          {inStock ? <p> InStock</p> : <p>OUT OF STOCK</p>}{" "}
          {fastDelivery && <p>ExpressDelivery</p>}
        </small>
      </div>

      {/* <span className="equal flex gap-2">
        <button
          className="btn btn-blue"
          onClick={() => addToCart(product)}
          disabled={!inStock}
        >
          {inStock ? (
            <> {product.inCart ? "Already in Cart" : "Add to cart"}</>
          ) : (
            <>OUT OF STOCK</>
          )}
        </button>
        <button className="btn btn-red" onClick={() => moveToWishlist(product)}>
          Wishlist{" "}
        </button>
      </span> */}
    </div>
  );
};

export default ProductCard;
