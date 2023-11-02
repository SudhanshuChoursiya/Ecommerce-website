"use client";
import styles from "./productReviewsLoadingSkeleton.module.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductReviewsLoadingSkeleton = () => {
  return (
    <>
      <div className={styles.product__review__container}>
        <div className={styles.container__heading}>
          <span className={styles.container__title__wrapper}>
            <Skeleton className={styles.container__title} />
          </span>

          <span className={styles.rate__product__btn__wrapper}>
            <Skeleton className={styles.rate__product__btn} />
          </span>
        </div>

        {Array.from({ length: 5 }).map((review, index) => (
          <div className={styles.product__review} key={index}>
            <div className={styles.user__container}>
              <span>
                <Skeleton className={styles.user__image} />
              </span>

              <span className={styles.user__name__container}>
                <Skeleton className={styles.user__name} />
              </span>
            </div>

            <div>
              <Skeleton className={styles.review__rating} />
            </div>

            <div className={styles.review__title__container}>
              <Skeleton className={styles.review__title} />
            </div>

            <div className={styles.review__desc__container}>
              <Skeleton className={styles.review__desc} />
            </div>
            <div className={styles.other__details__container}>
              <div className={styles.first__half}>
                <Skeleton className={styles.like__container} />
              </div>

              <div className={styles.second__half}>
                <Skeleton className={styles.review__posted__date} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductReviewsLoadingSkeleton;
