
import React from "react";
// calculate card final price
export const finalPrice = (price, offer) => {
  return price - offer * price * 0.01;
};

const MoreProductCard = ({ product }) => {

  const {
    name,
    image,
    price,
    inStock,
    fastDelivery,
    offer,
  } = product;

  // checking i product is in car t or not

//   const isProductInCart = (product) => {
//     return state.cart.filter((data) => data._id === product._id);
//   };

//   const isInWishlist = (product) => {
//     if (
//       state.wishlist.filter((data) => data._id === product._id).length === 0
//     ) {
//       return false;
//     } else {
//       return true;
//     }
//   };

//   const moveToWishlist = () => {
//     if (!isInWishlist(product)) {
//       dispatch({ type: ADD_TO_WISHLIST, payload: product });
//       dispatch({ type: REMOVE_FROM_CART, payload: product });
//       // TODO: removes the item from the cart from the home page it self
//     } else {
//       dispatch({ type: REMOVE_FROM_CART, payload: product });
//       // TODO: add toast here.
//     }
//   };

//   // adding product to cart
//   const addToCart = async (product) => {
//     const response = await axios.post(
//       "https://databaseforecomm-1.shubambhasin.repl.co/cart",
//       { ...product, quantity: 1, inCart: true },
//       {
//         headers: {
//           authorization: authToken,
//         },
//       }
//     );
//     console.log(response);
//   };
  return (
    <div className="product-card">
      <img src={image} alt="product-card" className="card-img responsive" />
      <div className="p03rem">
        <span className="flex flex-col">
          <span className="flex gap-2">
            <p className="card-name">{name}</p>
          </span>
          <span>
            Rs. <span className="strike bold">{Number(`${price}`)} </span>{" "}
            {Number(finalPrice(price, offer))}{" "}
            <span className="f-red"> ({offer}% off)</span>
          </span>
        </span>
{/* 
        <small className="flex gap-2 smaller">
          {inStock ? <p> InStock</p> : <p>OUT OF STOCK</p>}{" "}
          {fastDelivery && <p>ExpressDelivery</p>}
        </small> */}
      </div>
    </div>
  );
};

export default MoreProductCard;
