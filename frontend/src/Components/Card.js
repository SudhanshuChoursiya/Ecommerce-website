"use client";
import styles from "./Card.module.css";
import StarRating from "./StarRating.js";
import Link from "next/link";
const Card = ({ id, title, rating, img_url, price }) => {
  const maxLength = 20;
  const truncateTitle =
    title.length > maxLength ? title.substring(0, maxLength) + "..." : title;

  return (
    <Link href={`/product-details/${id}`} className={styles.card__wrapper}>
      <div className={styles.img__container}>
        <img src={img_url} alt="img" />
      </div>

      <h1>{truncateTitle}</h1>
      <span className={styles.rating__container}>
        <StarRating ratings={rating} />
      </span>
      <h2>price: ₹{(price*83).toLocaleString("en-IN")}</h2>
      <span className={styles.shiping__cost}>free delivery</span>
    </Link>
  );
};

export default Card;
