import React from "react";
import { useProducts } from "../context/ProductContext";
import { ADD_TO_CART, ADD_TO_WISHLIST, INCREASE_QTY, REMOVE_FROM_CART } from "../reducer/actions";

const ProductCard = ({ product }) => {
  const { state, dispatch } = useProducts();
  const {
    id,
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

  const finalPrice = (price, offer) => {
    return price - offer * price * 0.01;
  };

  const isProductInCart = (product) => {
    return state.cart.filter((data) => data.id === product.id);
  };

  const addToCart = (product) => {
    if (isProductInCart(product).length === 0) {
      console.log(product);
      dispatch({ type: ADD_TO_CART, payload: product });
    } else {
      dispatch({ type: INCREASE_QTY, payload: product });
    }
  };
  return (
    <div className="product-card">
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
        {inStock ? <p> InStock</p> : <p>OUT OF STOCK</p>} {" "}
        {fastDelivery && <p>ExpressDelivery</p>}
      </span>

      <span className="equal flex gap-2">
        <button className="btn btn-blue" onClick={() => addToCart(product)} disabled={!inStock}>
         {inStock ?  <>Add to Cart</>: <>OUT OF STOCK</>}
        </button>
        <button
          className="btn btn-red"
          onClick={() => dispatch({ type: ADD_TO_WISHLIST, payload: product })}
        >
          Wishlist{" "}
        </button>
      </span>
    </div>
  );
};

export default ProductCard;
