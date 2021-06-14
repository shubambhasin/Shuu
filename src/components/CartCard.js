import axios from "axios";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import {
  ADD_TO_WISHLIST,
  DECREASE_QTY,
  INCREASE_QTY,
  MOVE_TO_WISHLIST,
  REMOVE_FROM_CART,
} from "../reducer/actions";

const CartCard = ({ product }) => {
 
  const { state, dispatch } = useProducts();
  const { authToken } = useAuth()

  const isInWishlist = (product) => {
    if (
      state.wishlist.filter((data) => data._id === product._id).length === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const MOVE_TO_WISHLIST = (product) => {
    // if (!isInWishlist(product)) {
    //   dispatch({ type: ADD_TO_WISHLIST, payload: product });
    //   (async() => {
    //       try{
            
    //     const res = await axios.post("https://databaseforecomm-1.shubambhasin.repl.co/wishlist", product)
    //     console.log(res)
    //       }
    //       catch(error)
    //       {
    //         console.log({error: error})
    //       }
    //   })()
    //   dispatch({ type: REMOVE_FROM_CART, payload: product });
    //   removeFromCart(product)
    // } else {
    //   dispatch({ type: REMOVE_FROM_CART, payload: product });
    //   // TODO: add toast here
    // }





  };

  const removeFromCart = (product) => {
    (async () => {
      try {
        const cartProductId = product._id;

        console.log(cartProductId);

       const res = await axios.delete(
          `https://databaseforecomm-1.shubambhasin.repl.co/cart/${cartProductId}`, {
            headers: {
              authorization: authToken
            }
          }
        );

        console.log(res)
        dispatch({ type: REMOVE_FROM_CART, payload: product });
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <div className="cart-card pop-out">
      <img src={product.image} alt="cart-card" className="responsive" />
      <p>{product.name}</p>
      <p>Price: Rs. {product.price}</p>

      <span className="flex j-centre">
        <button
          className="btn btn-sm btn-blue"
          onClick={() => dispatch({ type: DECREASE_QTY, payload: product })}
        >
          {" "}
          -{" "}
        </button>
        <span className="b1px"> {product.availableQty}</span>
        <button
          className="btn btn-sm btn-blue"
          onClick={() => dispatch({ type: INCREASE_QTY, payload: product })}
        >
          {" "}
          +{" "}
        </button>
      </span>
      <span className="flex j-centre gap-2 mtb1-rem">
        {" "}
        <button
          className="btn btn-sm btn-red"
          onClick={() => removeFromCart(product)}
        >
          Remove
        </button>
        <button
          onClick={() => MOVE_TO_WISHLIST(product)}
          className="btn btn-sm btn-red"
        >
          Move to Wishlist
        </button>
      </span>
    </div>
  );
};

export default CartCard;
