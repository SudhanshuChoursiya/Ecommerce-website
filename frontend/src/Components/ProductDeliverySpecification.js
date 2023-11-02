"use client";
import styles from "./productDeliverySpecification.module.css";
import DeliveryServiceLoadingSkeleton from "./ProductDeliveryLoadingSkeleton.js";
import { LocalShipping, Payment, Loop } from "@mui/icons-material";

const DeliveryServices = ({ product }) => {
  return (
    <>
      {Object.keys(product).length !== 0 ? (
        <div className={styles.delivery__services__container}>
          <div className={styles.service__container}>
            <span className={styles.service__icon__container}>
              <LocalShipping className={styles.service__icon} />
            </span>
            <span className={styles.service__title}>free delivery</span>
          </div>
          <div className={styles.service__container}>
            <span className={styles.service__icon__container}>
              <Loop className={styles.service__icon} />
            </span>
            <span className={styles.service__title}>non returnable</span>
          </div>

          <div className={styles.service__container}>
            <span className={styles.service__icon__container}>
              <Payment className={styles.service__icon} />
            </span>
            <span className={styles.service__title}>cash on delivery</span>
          </div>
        </div>
      ) : (
        <DeliveryServiceLoadingSkeleton />
      )}
    </>
  );
};

export default DeliveryServices;
