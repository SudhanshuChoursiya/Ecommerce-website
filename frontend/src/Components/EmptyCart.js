import styles from "./EmptyCart.module.css";

const EmptyCart = () => {
  return (

    <div className={styles.emptyCard__wrapper}>
    <div className={styles.emptyCard__container}>
      <div className={styles.empty__cart__content}>
        <img src="/Empty-cart.svg" alt="cart_icon" />
        <h1>cart is empty !</h1>
      </div>
    </div>
    </div>
  );
};

export default EmptyCart;
