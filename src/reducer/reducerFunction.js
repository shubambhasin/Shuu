import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  DECREASE_QTY,
  FAST_DELIVERY,
  FILL_CART,
  FILL_WISHLIST,
  HIGH_TO_LOW,
  INCREASE_QTY,
  INSTOCK_TOGGLE,
  LOAD_PRODUCTS,
  LOW_TO_HIGH,
  MOVE_TO_CART,
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
    case FILL_CART:
      return {
        ...state,
        cart: [...payload],
      };
    case FILL_WISHLIST:
      return {
        ...state,
        wishlist: [...payload],
      };

    case HIGH_TO_LOW:
      return {
        ...state,
        sortBy: HIGH_TO_LOW,
      };
    case LOW_TO_HIGH:
      return {
        ...state,
        sortBy: LOW_TO_HIGH,
      };

    case TOGGLE_TOAST:
      return {
        ...state,
        toast: { tState: true, bg: payload },
      };

    case INSTOCK_TOGGLE: 
    return {
      ...state, 
      inStock: !state.inStock
    }
    case FAST_DELIVERY: 
    return {
      ...state, 
      inStock: !state.fastDelivery
    }

    default:
      console.log("unknown event");
  }
};

export default reducerFunction;
