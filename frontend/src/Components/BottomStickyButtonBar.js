"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";
import SnackbarToast from "./Snackbar.js";
import styles from "./bottomStickyButtonBar.module.css";
const BottomStickyButtonBar = ({ product }) => {
  const dispatch = useDispatch();
  const addToCartProduct = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        img_url: product.thumbnail,
        rating: product.rating,
        price: product.price,
      })
    );
  };
  return (
    <>
      <div className={styles.button__bar__wrapper}>
        <div className={styles.button__bar}>
          <div className={styles.first__btn__container}>
            <button
              className={styles.add__to__cart__btn}
              onClick={addToCartProduct}
            >
              Add to cart
            </button>
          </div>

          <div className={styles.second__btn__container}>
            <button className={styles.buy__btn}>Buy now</button>
          </div>
        </div>
      </div>
      <SnackbarToast />
    </>
  );
};

export default BottomStickyButtonBar;
