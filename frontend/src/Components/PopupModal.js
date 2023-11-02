"use client";
import styles from "./popupModal.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

const PopupModal = ({
  showModal,
  setShowModal,
  linkFirstHref,
  linkSecondHref,
  modal_title,
  modal_desc,
  modal_action_type,
  handleOperation,
  spinner,
}) => {
  return (
    <div className={styles.modal__container}>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={styles.dialog__title}>
          {modal_title}
          {spinner && (
            <CircularProgress
              size={22}
              thickness={5.5}
              className={styles.modal__spinner}
            />
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={styles.modal__content__text}
          >
            {modal_desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.modal__actions}>
          {modal_action_type === "link" && (
            <>
              <Link href={linkFirstHref} className={styles.modal__btn}>
                login
              </Link>

              <Link href={linkSecondHref} className={styles.modal__btn}>
                signup
              </Link>
            </>
          )}

          {modal_action_type === "button" && (
            <>
              <button
                className={styles.modal__btn}
                onClick={() => setShowModal(false)}
              >
                cancel
              </button>

              <button className={styles.modal__btn} onClick={handleOperation}>
                confirm
              </button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopupModal;
