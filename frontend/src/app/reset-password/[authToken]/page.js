"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import styles from "../reset-password.module.css";
import Toast from "../../../Components/Toast.js";

import { ToastContext } from "../../../context/toastContext.js";

const ResetPasswordPage = ({ params }) => {
  const [input, setInput] = useState({
    password: "",
    cpassword: "",
  });
  const router = useRouter();
  const { setShowAlert, setPassResetSuccessToast } = useContext(ToastContext);
  const getValue = (e) => {
    const { name, value } = e.target;

    setInput((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = params.authToken;

    const { password, cpassword } = input;
    if (password && cpassword) {
      const res = await fetch(`${base_url}/forget-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password, cpassword }),
      });
      const data = await res.json();
      if (res.status !== 200 || !data) {
        setShowAlert({
          value: true,
          type: "error",
          msg: data.msg,
        });
      } else {
        setInput({
          password: "",
          cpassword: "",
        });
        router.push("/login", { scroll: false });
        setPassResetSuccessToast({
          value: true,
          type: "success",
          msg: data.msg,
        });
      }
    } else {
      setShowAlert({
        value: true,
        type: "error",
        msg: "Please fill all the fields !",
      });
    }
  };

    useEffect(() => {
      document.title = "Reset Password";
      window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
    }, []);

  return (
    <>
      <div className={styles.forget__password__container}>
        <div className={styles.modal__dialog}>
          <div className={styles.modal__content}>
            <div className={styles.modal__header}>
              <h1 className={styles.modal__title}>change your password</h1>
            </div>
            <div className={styles.modal__body}>
              <Toast />
              <div className={styles.forget__password__form}>
                <label htmlFor="password" className={styles.form__label}>
                  Password
                </label>
                <input
                  type="password"
                  className={styles.form__input}
                  name="password"
                  minLength="2"
                  maxLength="200"
                  required
                  value={input.password}
                  onChange={getValue}
                />
              </div>

              <div className={styles.forget__password__form}>
                <label htmlFor="cpassword" className={styles.form__label}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={styles.form__input}
                  name="cpassword"
                  minLength="2"
                  maxLength="200"
                  required
                  value={input.cpassword}
                  onChange={getValue}
                />
              </div>
            </div>
          </div>
          <div className={styles.modal__footer}>
            <button type="submit" className={styles.btn} onClick={handleSubmit}>
              submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
