"use client";
import { useState, useEffect } from "react";
import Card from "./Card.js";
import styles from "./ProductCard.module.css";
import CardLoadingSkeleton from "./CardLoadingSkeleton.js";

const ProductCard = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProductList = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products?skip=0&limit=100"
      );
      const data = await response.json();

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setShowSkeleton(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className={styles.product__card__container}>
      {!showSkeleton ? (
        products.map((card) => {
          return (
            <Card
              id={card.id}
              img_url={card.thumbnail}
              title={card.title}
              price={card.price}
              rating={card.rating}
              key={card.id}
            />
          );
        })
      ) : (
        <CardLoadingSkeleton />
      )}
    </div>
  );
};

export default ProductCard;
