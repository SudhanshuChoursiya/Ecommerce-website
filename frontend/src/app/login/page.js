"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { ToastContext } from "../../context/toastContext.js";

import Link from "next/link";
import styles from "./login.module.css";
import Toast from "../../Components/Toast.js";
import PassResetSuccessToast from "../../Components/PassResetSuccessToast.js";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

const Loginpage = () => {
  const router = useRouter();
  const passwordField = useRef();
  const { setShowAlert, setLoggedinToast } = useContext(ToastContext);
  const [show, setShow] = useState(false);

  const [loginValue, setloginValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Login";
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, []);

  const getValue = (e) => {
    const { name, value } = e.target;
    setloginValue((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginValue;
    if (email && password) {
      const response = await fetch(`${base_url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status !== 200 || !data) {
        setShowAlert({
          value: true,
          type: "error",
          msg: data.msg,
        });
      } else if (data.user.is_admin === 1) {
        router.push("/dashboard", { scroll: false });
        setLoggedinToast({
          value: true,
          type: "success",
          msg: data.msg,
        });
        setloginValue({
          email: "",
          password: "",
        });
      } else {
        router.push("/", { scroll: false });
        setLoggedinToast({
          value: true,
          type: "success",
          msg: data.msg,
        });
        setloginValue({
          email: "",
          password: "",
        });
      }
    } else {
      setShowAlert({
        value: true,
        type: "error",
        msg: "All the fields are required",
      });
    }
  };

  const visibleFieldvalue = () => {
    setShow(!show);
    passwordField.current.focus();
  };

  return (
    <>
      <div className={styles.login__container}>
        <div className={styles.modal__dialog}>
          <div className={styles.modal__content}>
            <div className={styles.modal__header}>
              <h1 className={styles.modal__title}>Login To Continue</h1>
            </div>
            <div className={styles.modal__body}>
              <Toast />
              <PassResetSuccessToast />
              <div className={styles.login__form}>
                <label htmlFor="email" className={styles.form__label}>
                  Email
                </label>
                <input
                  type="email"
                  className={styles.form__input}
                  name="email"
                  minLength="2"
                  maxLength="200"
                  required
                  value={loginValue.email}
                  onChange={getValue}
                />
              </div>

              <div className={styles.login__form}>
                <label htmlFor="password" className={styles.form__label}>
                  Password
                </label>
                <div className={styles.input__password__container}>
                  <input
                    type={show ? "text" : "password"}
                    className={styles.form__input}
                    name="password"
                    minLength="7"
                    maxLength="200"
                    id="password_input"
                    required
                    value={loginValue.password}
                    onChange={getValue}
                    ref={passwordField}
                  />
                  <span
                    className={styles.icon__container}
                    onClick={visibleFieldvalue}
                    onMouseUp={(e) => e.preventDefault()}
                  >
                    <span>
                      {show ? (
                        <VisibilityOutlined className={styles.icon} />
                      ) : (
                        <VisibilityOffOutlined className={styles.icon} />
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className={`${styles.modal__footer} ${styles.login__form}`}>
              <button
                type="submit"
                className={styles.btn}
                onClick={handleSubmit}
              >
                Login
              </button>

              <div className={styles.forget__password__link__container}>
                <Link href="/forget-password">forget password?</Link>
              </div>
              <div className={styles.goto__signup__link__container}>
                <Link href="/signup">Don’t have account?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
