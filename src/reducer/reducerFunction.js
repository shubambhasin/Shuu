import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  DECREASE_QTY,
  INCREASE_QTY,
  LOAD_PRODUCTS,
  MOVE_TO_CART,
  MOVE_TO_WISHLIST,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
  TOGGLE_TOAST,
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
        cart: [...state.cart, { ...payload, quantity: 1, inCart: true }],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((data) => data._id !== payload._id),
      };

    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [
          ...state.wishlist,
          { ...payload, quantity: 0, inCart: false },
        ],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((data) => data._id !== payload._id),
      };
    case MOVE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...payload, quantity: 1, inCart: true }],
      };

    case INCREASE_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREASE_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === payload._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case TOGGLE_TOAST:
      return {
        ...state,
        toast: { tState: true, bg: payload },
      };

    default:
      console.log("unknown event");
  }
};

export default reducerFunction;
