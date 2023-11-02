"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, decreseQty, increseQty } from "../../redux/cartSlice.js";
import styles from "./cart.module.css";
import StarRating from "../../Components/StarRating.js";
import SnackbarToast from "../../Components/Snackbar.js";
import EmptyCart from "../../Components/EmptyCart.js";
import { Add, Remove, RemoveCircle } from "@mui/icons-material";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItem);

  const totalQty = cartItem.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);

  const netAmount = cartItem
    .reduce((acc, item) => {
      return acc + item.total;
    }, 0)
    .toFixed(2);

  useEffect(() => {
    document.title = "Cart";
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, []);

  return (
    <>
      {cartItem.length > 0 ? (
        <div className={styles.cart__container}>
          <div className={styles.cart__item__container}>
            {cartItem.map((cart) => {
              return (
                <div className={styles.cart__item} key={cart.id}>
                  <div className={styles.cart__img__container}>
                    <img src={cart.img_url} alt="img" />
                  </div>
                  <div className={styles.other__container}>
                    <div>
                      <div className={styles.titleAndDeleteBtn__container}>
                        <h1 className={styles.product__title}>{cart.title}</h1>

                        <RemoveCircle
                          className={styles.delete__btn}
                          onClick={() => dispatch(deleteItem(cart.id))}
                        />
                      </div>

                      <div className={styles.rating__container}>
                        <StarRating ratings={cart.rating} />
                      </div>
                      <h3 className={styles.product__price}>
                        Price: ₹{(cart.price*83).toLocaleString("en-IN")}
                      </h3>
                    </div>
                    <div className={styles.quantityAndTotal__container}>
                      <div className={styles.quantity__container}>
                        <span
                          className={styles.btn}
                          onClick={() => dispatch(decreseQty(cart.id))}
                        >
                          <Remove />
                        </span>

                        <span className={styles.quantity}>{cart.qty}</span>
                        <span
                          className={styles.btn}
                          onClick={() => dispatch(increseQty(cart.id))}
                        >
                          <Add />
                        </span>
                      </div>
                      <span className={styles.total__price}>
                        Total: ₹{(cart.total*83).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.total__wrapper}>
            <h5 className={styles.total__wrapper__title}>price details</h5>
            <div className={styles.total}>
              <div className={styles.price__container}>
                <span className={styles.price__heading}>
                  price ({totalQty} item)
                </span>
                <span className={styles.price__amount}>₹{(netAmount*83).toLocaleString("en-IN")}</span>
              </div>

              <div className={styles.discount__container}>
                <span className={styles.discount__heading}>discount</span>
                <span className={styles.discount__amount}>-$0</span>
              </div>

              <div className={styles.delevery__price__container}>
                <span className={styles.delevery__heading}>
                  delevery charges
                </span>
                <span className={styles.delevery__amount}>free delevery</span>
              </div>

              <div className={styles.total__price__container}>
                <span className={styles.total__price__heading}>total</span>
                <span className={styles.total__price__amount}>
                  ₹{(netAmount*83).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <button className={styles.payment__btn}>place order</button>
          </div>
        </div>
      ) : (
        <div className={styles.empty__card__container}>
          <EmptyCart />
        </div>
      )}
      <SnackbarToast/>
    </>
  );
};

export default CartPage;
