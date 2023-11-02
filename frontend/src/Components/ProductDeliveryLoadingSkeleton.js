"use client";
import styles from "./productDeliveryLoadingSkeleton.module.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DeliveryServiceLoadingSkeleton = () => {
  return (
    <>
      <div className={styles.delivery__services__container}>
        <div className={styles.service__container}>
          <span className={styles.service__icon__container}>
            <span>
              <Skeleton className={styles.service__icon} />
            </span>
          </span>
          <span>
            <Skeleton className={styles.service__title} />
          </span>
        </div>
        <div className={styles.service__container}>
          <span className={styles.service__icon__container}>
            <span>
              <Skeleton className={styles.service__icon} />
            </span>
          </span>
          <span>
            <Skeleton className={styles.service__title} />
          </span>
        </div>
        <div className={styles.service__container}>
          <span className={styles.service__icon__container}>
            <span>
              <Skeleton className={styles.service__icon} />
            </span>
          </span>
          <span>
            <Skeleton className={styles.service__title} />
          </span>
        </div>
      </div>
    </>
  );
};

export default DeliveryServiceLoadingSkeleton;
