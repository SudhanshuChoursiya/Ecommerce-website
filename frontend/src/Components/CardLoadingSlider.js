import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./CardLoadingSlider.module.css";
const CardLoadingSlider = () => {
    return (
        <>
            <SkeletonTheme
                baseColor="#ebebeb"
                highlightColor="#dcdde1"
                duration="1"
            >
                <div className={styles.slider__card__skeleton__container}>
                    {Array.from({ length: 10 }).map((card, index) => {
                        return (
                            <div
                                className={styles.slider__card__Skeleton}
                                key={index}
                            >
                                <span>
                                    <Skeleton
                                        className={styles.img__skeleton}
                                    />
                                </span>

                                <h1>
                                    <Skeleton
                                        className={styles.title__skeleton}
                                    />
                                </h1>
                            </div>
                        );
                    })}
                </div>
            </SkeletonTheme>
        </>
    );
};

export default CardLoadingSlider;
