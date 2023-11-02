"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/alertSlice.js";
import styles from "./productReview.module.css";
import StarRating from "./StarRating.js";

import PopupModal from "./PopupModal.js";

import AlertToast from "./AlertToast.js";

import ProductReviewsLoadingSkeleton from "./ProductReviewsLoadingSkeleton.js";

import Link from "next/link";
import { AuthContext } from "../context/authContext.js";

import {
  ThumbUpOffAltTwoTone,
  ThumbDownOffAltTwoTone,
  DeleteOutline,
  EditSharp,
} from "@mui/icons-material";
import moment from "moment";
const ProductReviews = ({ product, productId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [productReviews, setProductReviews] = useState([]);
  const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(true);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [liked, setLiked] = useState(false);

  const [disliked, setDisliked] = useState(false);

  const { isLoggedin, loginUserInfo } = useContext(AuthContext);
  const getProductReviews = async () => {
    try {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(
        `${base_url}/get-product-review/${productId}`
      );
      const data = await response.json();
      if (response.status === 200) {
        setProductReviews(data.productReviews);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoadingSkeleton(false);
    }
  };

  const handleLikeReview = async (id) => {
    if (!isLoggedin) {
      return setShowLoginModal(true);
    }
    try {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${base_url}/like-review/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loginUserInfo._id }),
      });

      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislikeReview = async (id) => {
    if (!isLoggedin) {
      return setShowLoginModal(true);
    }
    try {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${base_url}/dislike-review/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loginUserInfo._id }),
      });

      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL;
      setSpinner(true);
      const response = await fetch(`${base_url}/delete-product-review/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.status === 200) {
        dispatch(
          showAlert({
            value: true,
            type: "info",
            msg: "review deleted succesfully !",
          })
        );
      } else {
        dispatch(
          showAlert({
            value: true,
            type: "info",
            msg: "failed to delete!",
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
      setShowDeleteModal(false);
    }
  };

  const handleEditReview = (id) => {
    setSpinner(true);
    router.push(`/review-product/edit?review_id=${id}`);
    setSpinner(false);
  };

  useEffect(() => {
    getProductReviews();
  }, [product, productReviews]);

  return (
    <>
      {!showLoadingSkeleton ? (
        <div className={styles.product__review__container}>
          <div className={styles.container__heading}>
            <span className={styles.container__title}>product reviews</span>
            <span className={styles.btn__container}>
              {isLoggedin ? (
                <Link
                  href={`/review-product/${productId}`}
                  className={styles.rate__product__btn}
                >
                  rate product
                </Link>
              ) : (
                <span
                  className={styles.rate__product__btn}
                  onClick={() => setShowLoginModal(true)}
                >
                  rate product
                </span>
              )}
            </span>
          </div>

          {productReviews.length > 0 ? (
            productReviews.map((review) => (
              <div className={styles.product__review} key={review._id}>
                <div className={styles.user__wrapper}>
                  <div className={styles.user__container}>
                    <span className={styles.user__image}>
                      <img src={review.review_by.profile_img} alt="user" />
                    </span>

                    <span className={styles.user__name}>
                      {review.review_by.name}
                    </span>
                  </div>
                  {loginUserInfo?._id === review.review_by._id && (
                    <div className={styles.edit__delete__btn__container}>
                      <span
                        className={styles.edit__btn__container}
                        onClick={() => setShowEditModal(true)}
                      >
                        <EditSharp className={styles.edit__icon} />
                      </span>

                      <span
                        className={styles.delete__btn__container}
                        onClick={() => setShowDeleteModal(true)}
                      >
                        <DeleteOutline className={styles.delete__icon} />
                      </span>
                    </div>
                  )}
                </div>

                {review.review_rating && (
                  <div className={styles.review__rating}>
                    <StarRating ratings={review.review_rating} />
                  </div>
                )}

                {review.review_title && (
                  <div className={styles.review__title}>
                    {review.review_title}
                  </div>
                )}
                <div className={styles.review__desc}>{review.review_desc}</div>
                <div className={styles.other__details__container}>
                  <div className={styles.first__half}>
                    <div
                      className={styles.like__container}
                      onClick={() => {
                        handleLikeReview(review._id);
                      }}
                    >
                      <span className={styles.like__icon__container}>
                        <ThumbUpOffAltTwoTone
                          className={
                            review.likes.includes(loginUserInfo?._id)
                              ? `${styles.like__icon} ${styles.likes}`
                              : `${styles.like__icon}
                              `
                          }
                        />
                      </span>

                      {review.likes.length > 0 && (
                        <span className={styles.like__count}>
                          {review.likes.length}
                        </span>
                      )}
                    </div>

                    <div className={styles.dislike__container}>
                      <span
                        className={styles.dislike__icon__container}
                        onClick={() => {
                          handleDislikeReview(review._id);
                        }}
                      >
                        <ThumbDownOffAltTwoTone
                          className={
                            review.dislikes.includes(loginUserInfo?._id)
                              ? `${styles.dislike__icon} ${styles.dislikes}`
                              : `${styles.dislike__icon}
                              `
                          }
                        />
                      </span>
                      {review.dislikes.length > 0 && (
                        <span className={styles.dislike__count}>
                          {review.dislikes.length}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.second__half}>
                    <span className={styles.review__posted__date}>
                      {moment(review.posted_at).format("D MMMM YYYY , h:mm a")}
                    </span>
                  </div>
                </div>
                <PopupModal
                  showModal={showDeleteModal}
                  setShowModal={setShowDeleteModal}
                  spinner={spinner}
                  handleOperation={() => handleDeleteReview(review._id)}
                  modal_action_type="button"
                  modal_title="Confirm action !"
                  modal_desc="are you sure you want to delete."
                />

                <PopupModal
                  showModal={showEditModal}
                  setShowModal={setShowEditModal}
                  spinner={spinner}
                  handleOperation={() => handleEditReview(review._id)}
                  modal_action_type="button"
                  modal_title="Confirm action !"
                  modal_desc="are you sure you want to edit."
                />
              </div>
            ))
          ) : (
            <div className={styles.no__review__found}>
              no reviews,be the first one to review the product
            </div>
          )}
        </div>
      ) : (
        <ProductReviewsLoadingSkeleton />
      )}

      <PopupModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        linkFirstHref="/login"
        linkSecondHref="/signup"
        modal_action_type="link"
        modal_title="Login !"
        modal_desc="Please login to continue."
      />

      <AlertToast />
    </>
  );
};

export default ProductReviews;
