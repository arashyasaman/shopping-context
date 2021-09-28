export const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CHANGE_QTY: "CHANGE_QTY",
  SORT_BY_PRICE: "SORT_BY_PRICE",
  FILTER_BY_STOCK: "FILTER_BY_STOCK",
  FILTER_BY_DELIVERY: "FILTER_BY_DELIVERY",
  FILTER_BY_RATING: "FILTER_BY_RATING",
  FILTER_BY_SEARCH: "FILTER_BY_SEARCH",
  CLEAR_SEARCH: "CLEAR_SEARCH",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((d) => d.id !== action.payload.id),
      };
    case actionTypes.CHANGE_QTY:
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SORT_BY_PRICE:
      return {
        ...state,
        sort: action.payload,
      };
    case actionTypes.FILTER_BY_STOCK:
      return {
        ...state,
        byStock: !state.byStock,
      };
    case actionTypes.FILTER_BY_DELIVERY:
      return {
        ...state,
        byDelivery: !state.byDelivery,
      };
    case actionTypes.FILTER_BY_RATING:
      return {
        ...state,
        byRating: action.payload,
      };
    case actionTypes.FILTER_BY_SEARCH:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case actionTypes.CLEAR_SEARCH:
      return {
        byStock: false,
        byDelivery: false,
        byRating: 0,
        searchQuery: "",
      };
    default:
      return state;
  }
};
