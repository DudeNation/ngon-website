export const setCartDataAction = (data) => ({
  type: "SET_CART_DATA",
  payload: data,
});

export const addToCartAction = (payload) => ({
  type: "ADD_TO_CART",
  payload: payload,
});

export const updateCartAction = (data) => ({
  type: "UPDATE_CART",
  payload: data,
});

export const removeCartDataAction = (data) => ({
  type: "REMOVE_CART",
  payload: data,
});

export const increaseQuantityAction = (data) => ({
  type: "INCREASE_QUANTITY",
  payload: data
});

export const decreaseQuantityAction = (payload) => ({
  type: "DECREASE_QUANTITY",
  payload,
});
