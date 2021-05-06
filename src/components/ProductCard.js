import React from "react";
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


  // checking i product is in car t or not

  const isProductInCart = (product) => {
    return state.cart.filter((data) => data._id === product._id);
  };

  const isInWishlist = (product) => {
    if (state.wishlist.filter((data) => data._id === product._id).length === 0) {
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

  // hiding toast

  const hideToast = (product) => {
    setTimeout(() => {
      dispatch({ type: TOGGLE_TOAST, payload: "green" });
    }, 1200);
  };

  // adding product to cart
  const addToCart = (product) => {
    if (isProductInCart(product).length === 0) {
      console.log("Added in cart", product);
      dispatch({ type: ADD_TO_CART, payload: product });
      console.log("Added to cart dispatch done ");
      dispatch({ type: TOGGLE_TOAST, payload: "green" });
      console.log("toggle toast", state.toast);
      hideToast();
      console.log("toast hidden", state.toast);
    } else {
      //   dispatch({ type: INCREASE_QTY, payload: product });
      alert("Item added in cart already");
    }
  };
  return (
    <div className="product-card br10px">
      <img src={image} alt="product-card" className="card-img responsive" />
      <span className="flex gap-2">
        <p className="card-brand bold">{brand}</p>
        <p className="card-name">{name}</p>
      </span>
      <span className="flex gap-2">
        <p>
          <span>
            Rs. <span className="strike bold">{Number(`${price}`)} </span>{" "}
            {Number(finalPrice(price, offer))}{" "}
            <span className="f-red"> ({offer}% off)</span>
          </span>
        </p>{" "}
        <p className={`star-${Math.floor(`${ratings}`)}`}></p>
      </span>
      <p className="card-category flag-left">{category} </p>
      <span className="flex gap-2">
        {inStock ? <p> InStock</p> : <p>OUT OF STOCK</p>}{" "}
        {fastDelivery && <p>ExpressDelivery</p>}
      </span>

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
