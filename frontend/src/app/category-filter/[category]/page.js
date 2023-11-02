"use client";
import styles from "../category-filter.module.css";
import { useState, useEffect } from "react";
import Card from "../../../Components/Card.js";
import CardLoadingSkeleton from "../../../Components/CardLoadingSkeleton.js";
const CategoryFilterPage = ({ params }) => {
  const filterCategory = params.category;
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const fetchProductList = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products?skip=0&limit=100`);

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

  useEffect(() => {
    const regex = RegExp(`.*${filterCategory}.*`,"i");
    const filterProduct = products?.filter((product) => {
      return regex.test(product.category);
    });
    setCategoryList(filterProduct);
  }, [products.length]);

  return (
    <>
      <div className={styles.filter__title}>
        <h1>Categorized by ‘ {filterCategory} ’</h1>
      </div>
      <div className={styles.product__card__container}>
        {!showSkeleton ? (
          categoryList?.map((card) => {
            return (
              <Card
                id={card.id}
                img_url={card.images[0]}
                title={card.title}
                rating={card.rating}
                price={card.price}
                key={card.id}
              />
            );
          })
        ) : (
          <CardLoadingSkeleton />
        )}
      </div>
    </>
  );
};

export default CategoryFilterPage;
