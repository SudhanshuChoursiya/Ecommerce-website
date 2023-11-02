"use client";
import React, { useEffect, useState } from "react";
import SimilarProductCard from "./SimilarProductCard.js";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import styles from "./similerProductSlider.module.css";
import Link from "next/link";

import SimilarProductCardLoadingSkeleton from "./SimilarProductCardSliderLoadingSkeleton.js";

const SimilerProductCardSlider = ({ product }) => {
  const [isSwiperReady, setIsSwiperReady] = useState(false);
  const [similerProduct, setSimilerProduct] = useState([]);

  const getSimilerProduct = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${product.category}`
      );

      const data = await response.json();
      if (response.status === 200) {
        setSimilerProduct(data.products);
      } else {
        console.log("error in fetching similar product");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSwiperReady(true);
    }
  };

  useEffect(() => {
    getSimilerProduct();
  }, [product]);

  return (
    <>
      {isSwiperReady ? (
        <div className={styles.similer__product__container}>
          <div className={styles.container__heading}>You might also like</div>
          <div className={styles.swiper__container}>
            <Swiper
              spaceBetween={0}
              slidesPerView={5}
              breakpoints={{
                // When screen width is less than 768px (mobile)
                300: {
                  slidesPerView: 2.5,
                },
                500: {
                  slidesPerView: 2.5,
                },
                760: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              {similerProduct.map((item, index) => {
                return (
                  <SwiperSlide key={index} className={styles.swiper__slide}>
                    <div className={styles.card}>
                      <SimilarProductCard
                        id={item.id}
                        title={item.title}
                        rating={item.rating}
                        img_url={item.thumbnail}
                        price={item.price}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      ) : (
        <SimilarProductCardLoadingSkeleton />
      )}
    </>
  );
};

export default SimilerProductCardSlider;
