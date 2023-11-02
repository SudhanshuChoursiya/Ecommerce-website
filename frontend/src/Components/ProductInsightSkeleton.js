"use client";
import styles from "./productInsightSkeleton.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductInsightsLoadingSkeleton = () => {
  return (
    <>
      <div className={styles.product__details__container}>
        <span>
          <Skeleton className={styles.product__title} />
        </span>

        <span>
          <Skeleton className={styles.product__desc} />
        </span>

        <span>
          <Skeleton className={styles.product__rating} />
        </span>

        <span>
          <Skeleton className={styles.product__price} />
        </span>
      </div>
    </>
  );
};

export default ProductInsightsLoadingSkeleton;
