"use client";
import styles from "./similarProductCardLoadingSkeleton.module.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SimilarProductCardLoadingSkeleton = () => {
  return (
    <div className={styles.page__wrapper}>
      <span >
        <Skeleton className={styles.container__heading}/>
      </span>
      <div className={styles.card__loading__slider__container}>
        {Array.from({ length: 5 }).map((slide, index) => (
          <div className={styles.card__wrapper} key={index}>
            <div>
              <Skeleton className={styles.img__container} />
            </div>

            <span>
              <Skeleton className={styles.title} />
            </span>
            <span>
              <Skeleton className={styles.rating__container} />
            </span>
            <span>
              <Skeleton className={styles.price} />
            </span>
            <span>
              <Skeleton className={styles.shiping__cost} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProductCardLoadingSkeleton;
