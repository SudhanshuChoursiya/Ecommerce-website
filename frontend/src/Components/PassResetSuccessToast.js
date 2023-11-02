"use client";
import { useState, useEffect, useContext } from "react";
import { ToastContext } from "../context/toastContext.js";
import Alert from "@mui/material/Alert";

const PassResetSuccessToast = () => {
  const { passResetSuccessToast, setPassResetSuccessToast } =
    useContext(ToastContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
    const timeOut = setTimeout(() => {
      setPassResetSuccessToast({
        value: false,
        type: "",
        msg: "",
      });
    }, 5000);
    return () => clearTimeout(timeOut);
  }, [passResetSuccessToast.value]);

  return (
    <>
      {passResetSuccessToast.value === true ? (
        <Alert
          severity={passResetSuccessToast.type}
          sx={{ fontSize: "1.3rem", margin: "0.8rem" }}
        >
          {passResetSuccessToast.msg}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default PassResetSuccessToast;
