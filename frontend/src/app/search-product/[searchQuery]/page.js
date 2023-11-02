"use client";
import { useState, useEffect } from "react";
import styles from "../search-product.module.css";
import SearchedProductCard from "../../../Components/SearchedProductCard.js";
import SearchProductCardLoadingSkeleton from "../../../Components/SearchProductCardLoadingSkeleton.js";
import SnackbarToast from "../../../Components/Snackbar.js";

const SearchPage = ({ searchParams }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  const [products, setProducts] = useState([]);
  const searchQuery = searchParams.query;

  const searchProducts = async () => {
    setShowSkeleton(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchQuery}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowSkeleton(false);
    }
  };

  useEffect(() => {
    document.title = `${searchQuery}`;
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
    searchProducts();
  }, []);

  useEffect(() => {
    searchProducts();
  }, [searchQuery]);

  return (
    <>
      <div className={styles.query__searched__container}>
        <p>Did you mean “{searchQuery}” ?</p>
      </div>
      {!showSkeleton ? (
        <div className={styles.product__card__container}>
          <SnackbarToast />
          {products.length > 0
            ? products.map((card) => (
                <SearchedProductCard
                  id={card.id}
                  img_url={card.images[0]}
                  title={card.title}
                  rating={card.rating}
                  price={card.price}
                  key={card.id}
                />
              ))
            : "no data found"}
        </div>
      ) : (
        <SearchProductCardLoadingSkeleton />
      )}
    </>
  );
};

export default SearchPage;
