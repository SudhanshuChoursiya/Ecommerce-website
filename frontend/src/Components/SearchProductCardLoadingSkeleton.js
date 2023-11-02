import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./SearchProductCardLoadingSkeleton.module.css";

const CardLoadingSkeleton = () => {
  return (
    <>
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#dcdde1" duration="1">
        <div className={styles.skeleton__card__container}>
          {Array.from({ length: 10 }).map((elem, index) => {
            return (
              <div className={styles.skeleton__card} key={index}>
                    <div className={styles.first__half}>
                  <Skeleton className={styles.image__skeleton} />
                </div>
                
    <div className={styles.second__half}>
                
    <div className={styles.text__content}>
    
                <span>
                  <Skeleton className={styles.heading__skeleton} />
                </span>

                <span>
                  <Skeleton className={styles.rating__skeleton} />
                </span>
                
                <span>
                  <Skeleton className={styles.price__skeleton} />
                </span>
                </div>
                
                <span>
                  <Skeleton className={styles.btn__skeleton} />
                </span>
               </div>
              </div>
            );
          })}
        </div>
      </SkeletonTheme>
    </>
  );
};

export default CardLoadingSkeleton;
