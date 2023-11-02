"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Link from "next/link";
import styles from "./CardSlider.module.css";
import CardLoadingSlider from "./CardLoadingSlider.js";

const CardSlider = () => {
  const [isSwiperReady, setIsSwiperReady] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${base_url}/product-categories`);

      const data = await response.json();
      if (response.status === 200) {
        setCategories(data.categoriesDetails);
      } else {
        console.log("error in fetching categories");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSwiperReady(true);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.card__slider__main__container}>
      <Swiper
        spaceBetween={0}
        slidesPerView={5.5}
        breakpoints={{
          // When screen width is less than 768px (mobile)
          300: {
            slidesPerView: 5.5,
          },
          500: {
            slidesPerView: 5.5,
          },
          760: {
            slidesPerView: 10,
          },
          1024: {
            slidesPerView: 10,
          },
        }}
      >
        {isSwiperReady ? (
          categories.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link
                  href={`/category-filter/${item.category}`}
                  className={styles.link}
                >
                  <div className={styles.card__slider__container}>
                    <img src={item.img_url} />
                    <h1>{item.name}</h1>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })
        ) : (
          <CardLoadingSlider />
        )}
      </Swiper>
    </div>
  );
};

export default CardSlider;
