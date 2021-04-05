import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  DECREASE_QTY,
  INCREASE_QTY,
  LOAD_PRODUCTS,
  MOVE_TO_CART,
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
        ...state,
        cart: [...state.cart, { ...payload, quantity: 1 }],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((data) => data.id !== payload.id),
      };

    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, { ...payload, quantity: 0 }],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((data) => data.id !== payload.id),
      };
    case MOVE_TO_CART:
      return {
        ...state,
        products: [...state.products, { ...payload, quantity: 1 }],
      };
    case INCREASE_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREASE_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    default:
      console.log("unknown event");
  }
};

export default reducerFunction;
