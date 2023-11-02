"use client";
import { useState, useEffect, useContext } from "react";
import { ToastContext } from "../context/toastContext.js";
import Alert from "@mui/material/Alert";

const LoggedinToast = () => {
  const { loggedinToast, setLoggedinToast } =
    useContext(ToastContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
    const timeOut = setTimeout(() => {
      setLoggedinToast({
        value: false,
        type: "",
        msg: "",
      });
    }, 5000);
    return () => clearTimeout(timeOut);
  }, [loggedinToast.value]);

  return (
    <>
      {loggedinToast.value === true ? (
        <Alert
          severity={loggedinToast.type}
          sx={{ fontSize: "1.3rem", margin: "0.8rem" }}
        >
          {loggedinToast.msg}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default LoggedinToast;
