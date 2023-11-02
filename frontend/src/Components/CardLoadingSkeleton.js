import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./CardLoadingSkeleton.module.css";

const CardLoadingSkeleton = () => {
  return (
    <>
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#dcdde1" duration="1">
        <div className={styles.skeleton__card__container}>
          {Array.from({ length: 20 }).map((elem, index) => {
            return (
              <div className={styles.skeleton__card} key={index}>
                <span>
                  <Skeleton className={styles.image__skeleton} />
                </span>

                <h1>
                  <Skeleton className={styles.heading__skeleton} />
                </h1>
                
                <h1>
                  <Skeleton className={styles.rating__skeleton} />
                </h1>

                <h2>
                  <Skeleton className={styles.price__skeleton} />
                </h2>

                <span>
                  <Skeleton className={styles.shiping__cost} />
                </span>
              </div>
            );
          })}
        </div>
      </SkeletonTheme>
    </>
  );
};

export default CardLoadingSkeleton;
