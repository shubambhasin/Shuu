import axios from "axios";
import React from "react";
import { useProducts } from "../context/ProductContext";
import { MOVE_TO_CART, REMOVE_FROM_WISHLIST } from "../reducer/actions";

const WishlistCard = ({ product }) => {
  const { name, price, image } = product;
  const { state, dispatch } = useProducts();

  // to check if product is already in cart ?
  const isInCart = (product) => {
    if (state.cart.filter((data) => data._id === product._id).length !== 0)
      return true;
  };

  //   for moving product to cart

  const moveToCart = (product) => {
    if (!isInCart(product)) {
      dispatch({ type: MOVE_TO_CART, payload: product });

      (async () => {
        try {
          const res = await axios.post(
            "https://databaseforecomm-1.shubambhasin.repl.co/cart",
            { ...product, quantity: 1, isInCart: true }
          );
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      })();
      dispatch({ type: REMOVE_FROM_WISHLIST, payload: product });
    } else {
      dispatch({ type: REMOVE_FROM_WISHLIST, payload: product });
      // TODO: alert("already in cart");
    }

    removeFromWishlist(product);
  };

  const removeFromWishlist = (product) => {
    (async () => {
      const wishlistProductId = product._id;

      console.log(wishlistProductId);

      await axios.delete(
        `https://databaseforecomm-1.shubambhasin.repl.co/wishlist/${wishlistProductId}`
      );
    })();
    dispatch({ type: REMOVE_FROM_WISHLIST, payload: product });
  };

  return (
    <div className="wishlist-card pop-out p1-rem">
      <img src={image} alt="wishlist-card" className="responsive" />
      <p>{name}</p>
      <p>Price: Rs.{price}</p>
      <div className="flex j-space-between">
        <span>
          <button className="btn btn-red" onClick={() => moveToCart(product)}>
            Move to cart
          </button>
          <button
            className="btn btn-blue"
            onClick={() => removeFromWishlist(product)}
          >
            Remove
          </button>
        </span>
      </div>
    </div>
  );
};

export default WishlistCard;
