import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  DECREASE_QTY,
  INCREASE_QTY,
  LOAD_PRODUCTS,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
} from "./actions";

const reducerFunction = (state, { type, payload }) => {
  switch (type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        products: [...payload],
      };
    case ADD_TO_CART:
      return {
          ...state, cart: [...state.products, payload]
      };
    case REMOVE_FROM_CART:
      return {};

    case ADD_TO_WISHLIST:
      return {};
    case REMOVE_FROM_WISHLIST:
      return {};
    case INCREASE_QTY:
      return {
          ...state, cart: state.cart.map((data) => {
              data.id === payload.id ? 
          })
      };
    case DECREASE_QTY:
      return {};

    default:
      console.log("unknown event");
  }
};

export default reducerFunction;
