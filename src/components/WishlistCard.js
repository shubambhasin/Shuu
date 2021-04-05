import React from "react";
import { useProducts } from "../context/ProductContext";
import { MOVE_TO_CART, REMOVE_FROM_WISHLIST } from "../reducer/actions";

const WishlistCard = ({ product }) => {
  const { name, id, price, quantity, image } = product;
  const { dispatch } = useProducts();
  
  return (
    <div className="wishlist-card pop-out p1-rem">
      <img src={image} alt="wishlist-card" className="responsive" />
      <p>{name}</p>
      <p>Price: Rs.{price}</p>
      <div className="flex j-space-between">
        <span>
          <button
            className="btn btn-blue"
            onClick={() => dispatch({ type: MOVE_TO_CART, payload: product })}
          >
            Move to Cart
          </button>
          <button
            className="btn btn-red"
            onClick={() =>
              dispatch({ type: REMOVE_FROM_WISHLIST, payload: product })
            }
          >
            Remove
          </button>
        </span>

      </div>
    </div>
  );
};

export default WishlistCard;
