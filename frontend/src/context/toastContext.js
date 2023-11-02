"use client";
import { useState, createContext } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  
const [showAlert, setShowAlert] = useState({
    value: false,
    type: "",
    msg: "",
  });

  
  const [loggedinToast, setLoggedinToast] = useState({
    value: false,
    type: "",
    msg: "",
  });
  
  const [passResetSuccessToast, setPassResetSuccessToast] = useState({
    value: false,
    type: "",
    msg: "",
  });

  
  return (
    <ToastContext.Provider
      value={{
        showAlert,
        setShowAlert,
        loggedinToast,
        setLoggedinToast,
        passResetSuccessToast,
        setPassResetSuccessToast
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
