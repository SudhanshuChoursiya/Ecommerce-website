"use client";
import { useState, useEffect } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import ProductLoadingSlider from "./productLoadingSlider.js";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./productSlider.css";

const ProductSlider = ({productId}) => {
  
  const [productImages, setProductImages] = useState([]);

  const [isSwiperReady, setIsSwiperReady] = useState(false);

const fetchProductImages = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      const data = await response.json();
      
      setProductImages(data.images);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSwiperReady(true);
    }
  };

  useEffect(() => {
    fetchProductImages();
  }, []);

  
  return (
    <>
      <div className="product__slider__main__container">
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
            productImages.map((img_url, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="product__slider">
                    <img src={img_url} alt="slide" />
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <ProductLoadingSlider />
          )}
        </Swiper>
      </div>
    </>
  );
};

export default ProductSlider;
