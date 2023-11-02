"use client";
import { useState, useEffect, useContext } from "react";
import { Rating } from "@mui/material";
import styles from "../review-product.module.css";
import { ToastContext } from "../../../context/toastContext.js";
import Toast from "../../../Components/Toast.js";

const ReviewProduct = ({ params, searchParams }) => {
  const productId = params.productId;
  const reviewId = searchParams.review_id;
  const { setShowAlert, setLoggedinToast } = useContext(ToastContext);
  const [reviewRating, setReviewRating] = useState(1);
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reviewRating && reviewDesc) {
      const response = await fetch(
        `${base_url}/post-product-review/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ reviewRating, reviewDesc, reviewTitle }),
        }
      );

      const data = await response.json();

      if (response.status !== 201 || !data) {
        setShowAlert({
          value: true,
          type: "error",
          msg: data.msg,
        });
      } else {
        setShowAlert({
          value: true,
          type: "success",
          msg: data.msg,
        });
        setReviewRating(1);
        setReviewDesc("");
        setReviewTitle("");
      }
    } else {
      setShowAlert({
        value: true,
        type: "error",
        msg: "product rating and description are required.",
      });
    }
  };

  const getEditReviewDetails = async () => {
    const response = await fetch(
      `${base_url}/single-product-review-details/${reviewId}`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (response.status !== 200) {
      setShowAlert({
        value: true,
        type: "error",
        msg: data.msg,
      });
      setReviewRating(1);
      setReviewDesc("");
      setReviewTitle("");
    } else {
      setReviewRating(data.reviewDetails.review_rating);
      setReviewDesc(data.reviewDetails.review_desc);
      setReviewTitle(data.reviewDetails.review_title);
    }
  };

  const editProductReview = async (e) => {
    e.preventDefault();
    try {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL;
      if (reviewRating && reviewDesc) {
        const response = await fetch(
          `${base_url}/edit-product-review/${reviewId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ reviewRating, reviewDesc, reviewTitle }),
          }
        );

        const data = await response.json();

        if (response.status !== 200 || !data) {
          setShowAlert({
            value: true,
            type: "error",
            msg: data.msg,
          });
        } else {
          setShowAlert({
            value: true,
            type: "success",
            msg: data.msg,
          });
        }
      } else {
        setShowAlert({
          value: true,
          type: "error",
          msg: "product rating and description are required.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Rate the product";
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, []);

  useEffect(() => {
    if (reviewId) {
      getEditReviewDetails();
    }
  }, [reviewId]);

  return (
    <div className={styles.page__wrapper}>
      <div className={styles.review__product__wrapper}>
        <Toast margin="1rem" />
        <div className={styles.star__rating__contaier}>
          <h2 className={styles.rating__container__heading}>
            rate this product
          </h2>
          <span className={styles.star__rating}>
            <Rating
              name="reviewRating"
              defaultValue={1}
              value={reviewRating}
              onChange={(e, newValue) => setReviewRating(newValue)}
              precision={0.5}
              size="large"
              className={styles.rating}
            />
          </span>
        </div>

        <h2 className={styles.review__container__heading}>
          review this product
        </h2>

        <div className={styles.review__container__wrapper}>
          <div className={styles.review__product__container}>
            <h3 className={styles.textarea__heading}>description</h3>

            <span className={styles.review__desc__container}>
              <textarea
                name="reviewDesc"
                rows="8"
                value={reviewDesc}
                onChange={(e) => setReviewDesc(e.target.value)}
                required
              ></textarea>
            </span>

            <span className={styles.review__title__container}>
              <h3 className={styles.input__heading}>title (optional)</h3>

              <input
                type="text"
                name="reviewTitle"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
              />
            </span>
          </div>

          <div className={styles.btn__container}>
            <button
              type="submit"
              className={styles.btn}
              onClick={reviewId ? editProductReview : handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewProduct;
