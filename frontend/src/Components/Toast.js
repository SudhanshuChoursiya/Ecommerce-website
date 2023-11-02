"use client";
import { useState, useEffect, useContext } from "react";
import { ToastContext } from "../context/toastContext.js";
import Alert from "@mui/material/Alert";

const Toast = ({margin,width}) => {
  const { showAlert, setShowAlert } = useContext(ToastContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
    const timeOut = setTimeout(() => {
      setShowAlert({
        value: false,
        type: "",
        msg: "",
      });
    }, 5000);
    return () => clearTimeout(timeOut);
  }, [showAlert.value]);

  return (
    <>
      {showAlert.value === true ? (
        <Alert
          severity={showAlert.type}
          sx={{
            display:"flex",
            alignItems:"center",
            fontSize: "1.3rem",
            zIndex: "500",
            margin:margin,
            textTransform: "capitalize",
            width:width
          }}
          
        >
          {showAlert.msg}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default Toast;
