"use client";
import { useState, useEffect, useContext } from "react";
import styles from "./contact.module.css";
import Toast from "../../Components/Toast.js";
import { ToastContext } from "../../context/toastContext.js";

const ContactPage = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    mobileno: "",
    subject: "",
    message: "",
  });

  const { setShowAlertOnRedirectedPage, setShowAlert } =
    useContext(ToastContext);

  const getValue = (e) => {
    const { name, value } = e.target;
    setValue((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const { name, email, mobileno, subject, message } = value;

    if (!name || !email || !mobileno || !subject || !message) {
      setShowAlert({
        value: true,
        type: "error",
        msg: "All the fields are required",
      });
      return;
    }

    const response = await fetch(`${base_url}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, mobileno, subject, message }),
    });
    const data = await response.json();

    if (response.status !== 500) {
      setShowAlert({ value: true, type: "success", msg: data.msg });

      setValue({
        name: "",
        email: "",
        mobileno: "",
        subject: "",
        message: "",
      });
    } else {
      setShowAlert({ value: true, type: "error", msg: data.msg });
    }
  };

  useEffect(() => {
    document.title = "Contact us";
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, []);

  return (
    <div className={styles.form__wrapper}>
      <h6>contact us</h6>
      <div className={styles.form__container}>
        <div className={styles.toast__container}>
          <Toast />
        </div>
        <div className={styles.form__field__container}>
          <input
            type="text"
            name="name"
            value={value.name}
            placeholder="Name"
            onChange={getValue}
            minLength="1"
            maxLength="30"
            required
          />
          <input
            type="email"
            name="email"
            value={value.email}
            placeholder="Email"
            onChange={getValue}
            minLength="1"
            maxLength="30"
            required
          />
        </div>

        <div className={styles.form__field__container}>
          <input
            type="tel"
            name="mobileno"
            value={value.mobileno}
            placeholder="Number"
            onChange={getValue}
            minLength="10"
            maxLength="10"
            required
          />
          <input
            type="text"
            name="subject"
            value={value.subject}
            placeholder="Subject"
            onChange={getValue}
            minLength="5"
            maxLength="35"
            required
          />
        </div>

        <div className={styles.textArea__container}>
          <textarea
            name="message"
            rows="7"
            cols="40"
            placeholder="Message"
            value={value.message}
            onChange={getValue}
            minLength="5"
            maxLength="250"
            required
          ></textarea>
        </div>
        <button className={styles.btn} type="submit" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
