"use client";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import ImageLoadingSlider from "./ImageLoadingSlider.js";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./ImageSlider.css";

const ImageSlider = () => {
  const [images, setImages] = useState([]);

  const [isSwiperReady, setIsSwiperReady] = useState(false);

  const fetchSliderImages = async () => {
    try {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${base_url}/slider-images`);
      const data = await response.json();
      setImages(data.slider_images);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSwiperReady(true);
    }
  };

  useEffect(() => {
    fetchSliderImages();
  }, []);

  return (
    <div className="Image__slider__main__container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={isSwiperReady ? true : false}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
      >
        {isSwiperReady ? (
          images.map((slide) => {
            return (
              <SwiperSlide key={slide._id}>
                <div className="image__slider">
                  <picture className="picture">
                    <source
                      media="(min-width:760px)"
                      srcSet={slide.desktop_img_url}
                    />
                    <source srcSet={slide.mobile_img_url} />
                    <img src={slide.mobile_img_url} alt="slide" />
                  </picture>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <ImageLoadingSlider />
        )}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
