"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./Signup.module.css";
import Link from "next/link";
import { ToastContext } from "../../context/toastContext.js";
import Toast from "../../Components/Toast.js";

const Signuppage = () => {
  const [sigupData, setsignupData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { setShowAlert } = useContext(ToastContext);

  const getValue = (e) => {
    const { name, value } = e.target;
    setsignupData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = sigupData;
    if (!name || !email || !password || !cpassword) {
      setShowAlert({
        value: true,
        type: "error",
        msg: "All fields are required !",
      });
      return;
    }

    const response = await fetch(`${base_url}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, cpassword }),
    });
    const data = await response.json();
    if (response.status !== 200 || !data) {
      setShowAlert({
        value: true,
        type: "error",
        msg: data.msg,
      });
    } else {
      setShowAlert({
        value: true,
        type: "success",
        msg: data.msg,
      });
      setsignupData({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
    }
  };

  useEffect(() => {
    document.title = "Sign up";
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, []);

  return (
    <>
      <div className={styles.signup__container}>
        <div className={styles.modal__dialog}>
          <div className={styles.modal__content}>
            <div className={styles.modal__header}>
              <h1 className={styles.modal__title}>Signup To Continue</h1>
            </div>
            <div className={styles.modal__body}>
              <Toast />
              <div className={styles.signup__form}>
                <label htmlFor="name" className={styles.form__label}>
                  Name
                </label>
                <input
                  type="text"
                  className={styles.form__input}
                  name="name"
                  minLength="4"
                  maxLength="12"
                  required
                  value={sigupData.name}
                  onChange={getValue}
                />
              </div>

              <div className={styles.signup__form}>
                <label htmlFor="email" className={styles.form__label}>
                  Email
                </label>
                <input
                  type="email"
                  className={styles.form__input}
                  name="email"
                  required
                  value={sigupData.email}
                  onChange={getValue}
                />
              </div>

              <div className={styles.signup__form}>
                <label htmlFor="password" className={styles.form__label}>
                  Password
                </label>
                <input
                  type="password"
                  className={styles.form__input}
                  name="password"
                  minLength="7"
                  maxLength="15"
                  required
                  value={sigupData.password}
                  onChange={getValue}
                />
              </div>

              <div className={styles.signup__form}>
                <label htmlFor="cpassword" className={styles.form__label}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={styles.form__input}
                  name="cpassword"
                  minLength="7"
                  maxLength="15"
                  required
                  value={sigupData.cpassword}
                  onChange={getValue}
                />
              </div>
            </div>
            <div className={styles.modal__footer}>
              <button
                type="submit"
                className={styles.btn}
                onClick={handleSubmit}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signuppage;
