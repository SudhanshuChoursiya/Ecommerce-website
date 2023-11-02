import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  showAlert: {
    value: false,
    type: "",
    msg: "",
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemAlreadyExist = state.cartItem.some((item) => {
        return item.id === action.payload.id;
      });
      if (itemAlreadyExist) {
        state.showAlert = {
          value: true,
          type: "info",
          msg: "Item already exists",
        };
      } else {
        const price = parseFloat(action.payload.price.toFixed(2));
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: price },
        ];
        state.showAlert = { value: true, type: "success", msg: "Item added" };
      }
    },

    deleteItem: (state, action) => {
      const index = state.cartItem.findIndex((item) => {
        return item.id === action.payload;
      });

      state.cartItem.splice(index, 1);
      state.showAlert = { value: true, type: "success", msg: "Item deleted" };
    },

    increseQty: (state, action) => {
      const index = state.cartItem.findIndex((item) => {
        return item.id === action.payload;
      });

      let qty = state.cartItem[index].qty;

      let qtyInc = ++qty;
      const price = state.cartItem[index].price;
      state.cartItem[index].qty = qtyInc;
      let total = price * qtyInc;
      state.cartItem[index].total = parseFloat(total.toFixed(2));
    },

    decreseQty: (state, action) => {
      const index = state.cartItem.findIndex((item) => {
        return item.id === action.payload;
      });

      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        let qtyDec = --qty;
        const price = state.cartItem[index].price;

        state.cartItem[index].qty = qtyDec;
        let total = price * qtyDec;
        state.cartItem[index].total = parseFloat(total.toFixed(2));
      }
    },
    clearAlert: (state, action) => {
      state.showAlert = { value: false, type: "", msg: "" };
    },
  },
});

export const { addToCart, deleteItem, increseQty, decreseQty, clearAlert } =
  cartSlice.actions;

export default cartSlice.reducer;
