import React from "react";
import { useParams } from "react-router";
import { useProducts } from "../../context/ProductContext";
import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_CART, TOGGLE_TOAST } from "../../reducer/actions";
import finalPrice from "../ProductCard";

const ProductDetailPage = () => {
  const { state, dispatch } = useProducts();

  const { id } = useParams();

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

  const moveToWishlist = (product) => {
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
  const addToCart = (product) => {
    if (isProductInCart(product).length === 0) {
      console.log("Added in cart", product);
      dispatch({ type: ADD_TO_CART, payload: product });
      console.log("Added to cart dispatch done ");
      dispatch({ type: TOGGLE_TOAST, payload: "green" });
      console.log("toggle toast", state.toast);
      // TODO: hideToast();
      console.log("toast hidden", state.toast);
    } else {
      //   dispatch({ type: INCREASE_QTY, payload: product });
      alert("Item added in cart already");
    }
  };

  return (
    <div>
      <h1 className="">Details</h1>
      {state.products
        .filter((data) => data._id === id)
        .map((product) => {
          return (
            <div>
              <div className="product-detail container flex gap-2">
                <img
                  src={product.image}
                  alt="product-img"
                  className="responsive"
                />
                <h1 className="bold h2 larger">{product.name}</h1>

                <p className="h3">Rs {product.price}</p>
                {/* <p>{finalPrice(`${product.price}`, `${product.offer}`)}</p> */}

                <span className="equal flex gap-2">
                  <button
                    className="btn btn-blue"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? (
                      <> {product.inCart ? "Already in Cart" : "Add to cart"}</>
                    ) : (
                      <>OUT OF STOCK</>
                    )}
                  </button>
                  <button
                    className="btn btn-red"
                    onClick={() => moveToWishlist(product)}
                  >
                    Wishlist{" "}
                  </button>
                </span>
              </div>
            </div>
          );
        })}
      <button onClick={() => console.log(state.products)}></button>
    </div>
  );
};

export default ProductDetailPage;
