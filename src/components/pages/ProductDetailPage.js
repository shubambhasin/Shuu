import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProducts } from "../../context/ProductContext";
import { ADD_TO_WISHLIST, REMOVE_FROM_CART } from "../../reducer/actions";
import "./productDetail.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { instance } from "../../api/axiosapi";
import { notify } from "../../utils/notification";
import MoreProductCard, { finalPrice } from "../moreProduct/MoreProductCard";
import { ImBackward } from "react-icons/im";
import { FaRupeeSign } from "react-icons/fa";

const ProductDetailPage = () => {
  const { state, dispatch } = useProducts();
  const [loading, setLoading] = useState("false");

  const [particularProduct, setParticularProduct] = useState([]);
  const { authToken, login } = useAuth();
  const navigate = useNavigate();
  console.log(window.location.hash);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://databaseforecomm-1.shubambhasin.repl.co/products/${id}`
        );
        setLoading(false);
        console.log(res);
        setParticularProduct([...res.data]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [window.location.hash]);

  const isProductInCart = (product) => {
    const isInCart = state.cart.filter((data) => data._id === product._id);
    if (isInCart.length === 0) {
      return false;
    } else {
      return true;
    }
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

    (async () => {
      try {
        const res = await axios.post(
          "https://databaseforecomm-1.shubambhasin.repl.co/wishlist",
          { ...product, isInWishlist: true },
          {
            headers: {
              authorization: authToken,
            },
          }
        );
        console.log(res);
      } catch (error) {
        console.log({ error: error });
      }
    })();
  };

  const addToWishlist = async (product) => {
    if (login) {
      try {
        notify("Adding to wishlist ⏳");
        const response = await instance.post(`/wishlist`, {
          ...product,
        });
        console.log(response);
        if (response) {
          if (response.data.success) {
            notify("Added to wishlist successfully ✅");
          }
        } else {
          notify("Already in wishlist 😅");
        }
      } catch (error) {
        notify("Error ❌");
        console.error(error);
      }
    } else {
      notify("Login first 😅");
      navigate("/login");
    }
  };

  const addToCart = (product) => {
    if (login) {
      if (isProductInCart(product)) {
        notify("ALready in cart ❗");
      } else {
        (async () => {
          try {
            notify("Adding to cart ⏳");
            const response = await instance.post(`/cart`, {
              ...product,
              quantity: 1,
              inCart: true,
            });
            if (response) {
              console.log(response);
              if (response.data.success) {
                notify("Added to cart successfully✅");
              } else if (response.status === 400) {
                notify("Item already in cart");
              }
            }
          } catch (error) {
            console.error(error);
          }
        })();
      }
    } else {
      notify("Please login first 😅");
      navigate("/login");
    }
  };
  return (
    <div className="container">
      {loading && <h1 className="h2 t-center">Loading product details...</h1>}
      {!loading && (
        <>
          <div className="flex mb1-rem jcsb aic l-10">
            {" "}
            <NavLink to="/new-arrivals" className="btn ">
              <ImBackward size={28} />
            </NavLink>
          </div>
          {particularProduct.length !== 0 && (
            <>
              {particularProduct.map((product) => {
                return (
                  <div>
                    <div className="product-detail jcc gap-2">
                      <img
                        src={product.image}
                        alt="product-img"
                        className="responsive br10px"
                      />
                      <div className="product-detail-info">
                        <h1 className="product-name bold h2 larger">
                          {product.name}
                        </h1>
                        <span className="flex aic gap-1">
                          <span className="">
                          ₹
                            {Math.trunc(
                              Number(finalPrice(product.price, product.offer))
                            )}{" "}
                          </span>{" "}
                          <span className="strike f-grey">
                          ₹{Number(`${product.price}`)}{" "}
                          </span>
                          <span className="">
                            {" "}Save{" "}₹{" "}
                            {Number(`${product.price}`) -
                              Math.trunc(
                                Number(finalPrice(product.price, product.offer))
                              )}
                          </span>
                          <span className="f-red">{product.offer}% off</span>
                        </span>
                          <p className="f-green x-small bold">inclusive of all taxes</p>

                        <div className="product-description">
                          <h3 className="smaller">Product Description</h3>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ipsam culpa quas labore. Voluptas reprehenderit
                          sunt delectus aspernatur quas! Voluptas ab atque quod
                          quidem sit quo error deleniti tempora aperiam et.
                          Possimus eligendi cupiditate, qui ea temporibus sed
                          ratione praesentium est autem assumenda expedita iure
                          animi deserunt consequatur.
                        </div>

                        <span className="bottom-tab equal flex gap-2">
                          <button
                            className="btn btn-blue"
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                          >
                            {product.inStock ? (
                              <>
                                {" "}
                                {product.inCart
                                  ? "Already in Cart"
                                  : "Add to cart"}
                              </>
                            ) : (
                              <>OUT OF STOCK</>
                            )}
                          </button>
                          <button
                            className="btn btn-red"
                            onClick={() => addToWishlist(product)}
                          >
                            Wishlist{" "}
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <>
                <h2 className="h3 mt2-rem">More Products</h2>
                <div className="more-products-container flex gap-2">
                  {state.products.slice(1, 4).map((product) => {
                    return (
                      <NavLink
                        key={product._id}
                        className="links"
                        to={`/products/${product._id}`}
                      >
                        <MoreProductCard product={product} />
                      </NavLink>
                    );
                  })}
                </div>
              </>
            </>
          )}
          {particularProduct.length === 0 && <h1>NO product found</h1>}
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
