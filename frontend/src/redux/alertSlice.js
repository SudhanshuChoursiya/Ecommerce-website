import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertToast: {
    value: false,
    type: "",
    msg: "",
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.alertToast.value = action.payload.value;
      state.alertToast.type = action.payload.type;
      state.alertToast.msg = action.payload.msg;
    },
    clearAlert: (state, action) => {
      state.alertToast.value = false;
      state.alertToast.type = "";
      state.alertToast.msg = "";
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
