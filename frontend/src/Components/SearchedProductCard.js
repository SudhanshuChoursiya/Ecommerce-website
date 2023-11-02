"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";
import styles from "./SearchedProductCard.module.css";
import StarRating from "./StarRating.js";

const SearchedProductCard = ({ id, title, rating, img_url, price }) => {
  const dispatch = useDispatch();
  const maxLength = 40;
  const truncateTitle =
    title.length > maxLength ? title.substring(0, maxLength) + "..." : title;

  const addItemToCart = () => {
    dispatch(
      addToCart({
        id: id,
        title: title,
        rating: rating,
        img_url: img_url,
        price: price,
      })
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.first__half}>
        <img src={img_url} alt="img" />
      </div>

      <div className={styles.second__half}>
        <div className={styles.text__content}>
          <span className={styles.title}>{truncateTitle}</span>
          <span className={styles.rating__container}>
            <StarRating ratings={rating} />
            <span className={styles.rating}>({rating})</span>
          </span>
          <span className={styles.price}>price: ₹{(price*83).toLocaleString("en-IN")}</span>
        </div>
        <button className={styles.btn} onClick={addItemToCart}>
          add to cart
        </button>
      </div>
    </div>
  );
};

export default SearchedProductCard;
