"use client";
import { useState, useEffect } from "react";
import styles from "../product-details.module.css";
import ProductSlider from "../../../Components/ProductSlider.js";

import ProductInsights from "../../../Components/ProductInsights.js";

import DeliveryServices from "../../../Components/ProductDeliverySpecification.js";

import SimilerProductCardSlider from "../../../Components/SimilerProductSlider.js";

import ProductReviews from "../../../Components/ProductReviews.js";

import BottomStickyButtonBar from "../../../Components/BottomStickyButtonBar.js";

const ProductDetails = ({ params }) => {
  const productId = params.productId;
  const [product, setProduct] = useState({});

  const [isSwiperReady, setIsSwiperReady] = useState(false);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      const data = await response.json();

      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSwiperReady(true);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div className={styles.page__wrapper}>
      <ProductSlider productId={productId} />

      <ProductInsights product={product} />

      <DeliveryServices product={product} />

      <SimilerProductCardSlider product={product} />

      <ProductReviews product={product} productId={productId} />
      <BottomStickyButtonBar product={product} />
    </div>
  );
};

export default ProductDetails;
