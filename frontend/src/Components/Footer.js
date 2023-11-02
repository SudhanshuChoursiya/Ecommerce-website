"use client";
import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { AuthContext } from "../context/authContext.js";
import styles from "./Footer.module.css";
import Link from "next/link";
const Footer = () => {
  const [show, setShow] = useState(true);
  const pathname = usePathname();
  const { isLoggedin } = useContext(AuthContext);
  const hideFooter = pathname.startsWith("/product-details");
  useEffect(() => {
    if (hideFooter) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname]);

  return (
    <>
      {show && (
        <footer className={styles.footer}>
          <div className={styles.main__navigation__container}>
            <div className={styles.navigation__container}>
              <Link href="/">
                <li>Home</li>
              </Link>
              <Link href="/about">
                <li>About</li>
              </Link>
              <Link href="/contact">
                <li>Contact us</li>
              </Link>
            </div>
            <div className={styles.signupAndLogin__navigation__container}>
              {!isLoggedin ? (
                <>
                  <Link href="/login">
                    <li>login</li>
                  </Link>
                  <Link href="/signup">
                    <li>sign up</li>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profile">
                    <li>your profile</li>
                  </Link>
                </>
              )}
              <Link href="/cart">
                <li>cart</li>
              </Link>
            </div>

            <div className={styles.products__navigation__container}>
              <Link href="/">
                <li>top product</li>
              </Link>
              <Link href="/">
                <li>order deliverd</li>
              </Link>
              <Link href="/">
                <li>your orders</li>
              </Link>
            </div>
          </div>

          <div className={styles.copyright__container}>
            <hr className={styles.underline} />
            <p> Copyright &copy; 2023 || All rights reserved.</p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
