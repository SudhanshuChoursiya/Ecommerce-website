"use client";
import { useState, useEffect, useContext } from "react";
import styles from "./forget-password.module.css";
import Toast from "../../Components/Toast.js";
import { ToastContext } from "../../context/toastContext.js";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");

  const { setShowAlert } = useContext(ToastContext);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      const res = await fetch(`${base_url}/send-reset-password-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.status === 500 || !data) {
        setShowAlert({
          value: true,
          type: "error",
          msg: data.msg,
        });
      } else {
        setEmail("");
        setShowAlert({
          value: true,
          type: "success",
          msg: data.msg,
        });
      }
    } else {
      setShowAlert({
        value: true,
        type: "error",
        msg: "Please enter your email !",
      });
    }
  };

  useEffect(() => {
    document.title = "Forget Password";
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, []);

  return (
    <>
      <div className={styles.forget__password__container}>
        <div className={styles.modal__dialog}>
          <Toast />
          <div className={styles.modal__content}>
            <div className={styles.modal__body}>
              <div className={styles.reset__link__form}>
                <label htmlFor="email" className={styles.form__label}>
                  enter your email
                </label>
                <input
                  type="text"
                  className={styles.form__input}
                  name="email"
                  minLength="2"
                  maxLength="200"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles.modal__footer}>
            <button type="submit" className={styles.btn} onClick={handleSubmit}>
              send reset link
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordPage;
