"use client";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import { SwipeableDrawer, useMediaQuery } from "@mui/material";
import {
  PersonOutline,
  Home,
  Info,
  ContactSupportSharp,
  ShoppingCartSharp,
  Inventory2Sharp,
  InventorySharp,
} from "@mui/icons-material";
const Sidebar = ({ showMenu, setShowMenu }) => {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const isDesktop = useMediaQuery("(min-width:768px)");
  return (
    <>
      {!isDesktop ? (
        <SwipeableDrawer
          anchor="left"
          open={showMenu}
          onClose={() => setShowMenu(false)}
          onOpen={() => setShowMenu(true)}
          elevation={24}
          disableDiscovery={iOS}
          PaperProps={{
            style: {
              width: "70%",
              boxShadow: "10px 0px 10px rgba(0,0,0,0.3)",
            },
          }}
        >
          <div className={styles.list__container}>
            <div className={styles.sidebar__header}>
              <div className={styles.first__half}>
                <PersonOutline className={styles.sidebar__header__icon} />

                <Link href="/login">login & signup</Link>
              </div>
              <div className={styles.second__half}>
                <Image
                  src="/Shoping-logo.svg"
                  alt="logo"
                  height={24}
                  width={24}
                />
              </div>
            </div>

            <Link href="/" className={styles.sidebar__list}>
              <div className={styles.list__wrapper}>
                <Home className={styles.sidebar__list__icon} />

                <li className={styles.sidebar__item}>home</li>
              </div>
            </Link>

            <Link href="/about" className={styles.sidebar__list}>
              <div className={styles.list__wrapper}>
                <Info className={styles.sidebar__list__icon} />

                <li className={styles.sidebar__item}>about</li>
              </div>
            </Link>

            <Link href="/contact" className={styles.sidebar__list}>
              <div className={styles.list__wrapper}>
                <ContactSupportSharp className={styles.sidebar__list__icon} />

                <li className={styles.sidebar__item}>contact us</li>
              </div>
            </Link>

            <Link href="/cart" className={styles.sidebar__list}>
              <div className={styles.list__wrapper}>
                <ShoppingCartSharp className={styles.sidebar__list__icon} />

                <li className={styles.sidebar__item}>cart</li>
              </div>
            </Link>

            <Link href="/" className={styles.sidebar__list}>
              <div className={styles.list__wrapper}>
                <InventorySharp className={styles.sidebar__list__icon} />

                <li className={styles.sidebar__item}>order deliverd</li>
              </div>
            </Link>

            <Link href="/" className={styles.sidebar__list}>
              <div className={styles.list__wrapper}>
                <Inventory2Sharp className={styles.sidebar__list__icon} />

                <li className={styles.sidebar__item}>your orders</li>
              </div>
            </Link>
          </div>
        </SwipeableDrawer>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
