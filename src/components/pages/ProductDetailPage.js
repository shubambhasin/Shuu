import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProducts } from "../../context/ProductContext";
import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_CART,
  TOGGLE_TOAST,
} from "../../reducer/actions";
import "./productDetail.css";
import finalPrice from "../ProductCard";
import { NavLink } from "react-router-dom";

const ProductDetailPage = () => {
  const { state, dispatch } = useProducts();

  const [particularProduct, setParticularProduct] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://databaseforecomm-1.shubambhasin.repl.co/products/${id}`
        );
        setParticularProduct([...res.data]);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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

    (async() => {
        try{
          
      const res = await axios.post("https://databaseforecomm-1.shubambhasin.repl.co/wishlist", product)
      console.log(res)
        }
        catch(error)
        {
          console.log({error: error})
        }
    })()
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

    (async () => {
      try {
        const res = await axios.post(
          "https://databaseforecomm-1.shubambhasin.repl.co/cart",
          {...product, quantity: 1, isInCart: true}
        );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <div className="container">
      <div className="flex jcsb aic">
        {" "}
        <h1 className="h1 mtb1-rem">Details</h1>
        <NavLink to="/new-arrivals" className="btn btn-green">
          Go back{" "}
        </NavLink>
      </div>
      {particularProduct.length !== 0 && (
        <>
          {particularProduct.map((product) => {
            return (
              <div>
                <div className="product-detail flex jcc gap-2">
                  <img
                    src={product.image}
                    alt="product-img"
                    className="responsive br10px"
                  />
                  <div className="product-detail-info">
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
                          <>
                            {" "}
                            {product.inCart ? "Already in Cart" : "Add to cart"}
                          </>
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
              </div>
            );
          })}
        </>
      )}
      {particularProduct.length === 0 && <h1>NO product found</h1>}
    </div>
  );
};

export default ProductDetailPage;
