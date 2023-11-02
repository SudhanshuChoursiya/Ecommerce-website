"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../redux/alertSlice.js";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertToast = () => {
  const dispatch = useDispatch();
  const showAlert = useSelector((state) => state.alert.alertToast);

  const handleClose = () => {
    dispatch(clearAlert());
  };

  useEffect(() => {
    const timeOut = setTimeout(handleClose, 2000);
    return () => clearTimeout(timeOut);
  }, [showAlert.value]);

  return (
    <>
      <Snackbar
        open={showAlert.value}
        onClose={handleClose}
        message={showAlert.msg}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        style={{ bottom: "60px" }}
        ContentProps={{
          style: {
            fontSize: "1.3rem",
            fontWeight: "bold",
            backgroundColor: "#2e71a9",
          },
        }}
      />
    </>
  );
};

export default AlertToast;
