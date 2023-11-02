"use client";
import { useEffect, useState } from "react";
import styles from "./verification-success.module.css";
import { useRouter } from "next/navigation";

const VerificationSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    document.title = "Email verified";
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, []);

  return (
    <>
      <div className={styles.verification__success__container}>
        <img src="/thumbsup.svg" alt="img" />

        <h1>Success</h1>
        <h2>Your Email is Verified</h2>

        <span>
          <button
            className={styles.goto__login__button}
            onClick={() => router.push("/login", { scroll: false })}
          >
            go to login
          </button>
        </span>
      </div>
    </>
  );
};

export default VerificationSuccessPage;
