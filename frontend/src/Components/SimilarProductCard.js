"use client";
import styles from "./SimilarProductCard.module.css";
import StarRating from "./StarRating.js";
import Link from "next/link";
const SimilarProductCard = ({ id, title, rating, img_url, price }) => {
  const maxLength = 12;
  const truncateTitle =
    title.length > maxLength ? title.substring(0, maxLength) + "..." : title;

  return (
    <Link href={`/product-details/${id}`} className={styles.card__wrapper}>
      <div className={styles.img__container}>
        <img src={img_url} alt="img" />
      </div>

      <span className={styles.title}>{truncateTitle}</span>
      <span className={styles.rating__container}>
        <StarRating ratings={rating} />
      </span>
      <span className={styles.price}>price: ₹{(price*83).toLocaleString("en-IN")}</span>
      <span className={styles.shiping__cost}>free delivery</span>
    </Link>
  );
};

export default SimilarProductCard;
