const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const updatedCart = [...state.cart];
      const index = updatedCart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < 0) {
        updatedCart.push({ ...action.payload, quantity: 1 });
      } else {
        const updatedItem = { ...updatedCart[index] };
        updatedItem.quantity++;
        updatedCart[index] = updatedItem;
      }
      return { ...state, cart: updatedCart , total:state.total+action.payload.offPrice };
    }
    case "REMOVE_PRODUCT": {
      const updatedCart = [...state.cart];
      const index = updatedCart.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedItem = { ...updatedCart[index] };
      if (updatedItem.quantity === 1) {
      const filteredItem =  updatedCart.filter((item) => item.id !== action.payload.id);
      return {...state , cart :filteredItem, total : state.total - action.payload.offPrice}
      } else {
        updatedItem.quantity--;
        updatedCart[index] = updatedItem;
        return { ...state, cart: updatedCart  , total : state.total - action.payload.offPrice};
      }
    }
    default:
      return state;
  }
};

export default cartReducer;
