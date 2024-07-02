const initialCartState = {
  cartList: [],
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case "SET_CART_DATA": {
      return {
        ...state,
        cartList: action.payload,
      };
    }
    case "ADD_TO_CART": {

      const existingItemIndex = state.cartList.findIndex(item =>
        item.product._id === action.payload.product._id &&
        item.note === action.payload.note
      );
    
      if (existingItemIndex !== -1) {
        // Item exists with the same note, update quantity
        return {
          ...state,
          cartList: state.cartList.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };
    }
    case "REMOVE_CART": {
     const newCart = [...state.cartList].filter((_, indexFilter) => !(indexFilter === action.payload));
      return {
        ...state,
        cartList: newCart
      };
    }
    case "UPDATE_CART": {
      const newCart = state.cartList.filter((item) => item?.product.id !== action.payload?.id);
      return {
        ...state,
        cartList: newCart,
      };
    }
    case "INCREASE_QUANTITY": {
       const newCarts = state.cartList.map((cart, indexFilter) => {
        if (indexFilter === action.payload?.index) {
          cart.quantity = action.payload?.qty;
        }
        return cart;
       });
       return {
        ...state,
        cartList: newCarts,
      };
      // return {
      //   ...state,
      //   cartList: state.cartList.map((item) =>
      //     item?.product.id === action.payload?.product?.id
      //       ? {
      //           ...item,
      //           quantity: item.quantity + 1,
      //         }
      //       : item,
      //   ),
      // };
    }
    case "DECREASE_QUANTITY": {
      return {
        ...state,
        cartList: state.cartList.map((item) =>
          item.product?.id === action.payload?.product.id
            ? {
                ...item,
                units:
                  item.quantity > 1 ? item.quantity - 1 : item.quantity - 0,
              }
            : item,
        ),
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
