"use client";
import styles from "./productInsights.module.css";
import ProductInsightsLoadingSkeleton from "./ProductInsightSkeleton.js";
import StarRating from "./StarRating.js";
const ProductInsights = ({ product }) => {
  return (
    <>
      {Object.keys(product).length !== 0 ? (
        <div className={styles.product__details__container}>
          <span className={styles.product__title}>
            <span className={styles.product__brand}>{product.brand}</span>
            {product.title}
          </span>
          <span className={styles.product__desc}>{product.description}</span>
          {product.rating && (
            <span className={styles.product__rating}>
              <StarRating ratings={product.rating} />
              <span className={styles.rating__count}>({product.rating})</span>
            </span>
          )}

          <div className={styles.product__price__container}>
            <span className={styles.product__price}>
               ₹{(product.price * 83).toLocaleString("en-IN")}
            </span>

            <span className={styles.percent__off}>
              {product.discountPercentage * 4}% off
            </span>
          </div>
        </div>
      ) : (
        <ProductInsightsLoadingSkeleton />
      )}
    </>
  );
};

export default ProductInsights;
