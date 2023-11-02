"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import { ToastContext } from "../../context/toastContext.js";
import styles from "./profile.module.css";
import Toast from "../../Components/Toast.js";
import PopupModal from "../../Components/PopupModal.js";

import Image from "next/image";

import { DeleteOutline, CameraAlt, EditSharp } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
const Profilepage = () => {
  const {
    checkAuthStatus,
    loginUserInfo,
    previousProfileInfo,
    setLoginUserInfo,
  } = useContext(AuthContext);

  const { setShowAlert } = useContext(ToastContext);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const [showButtons, setShowButtons] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const getValue = (e) => {
    const { name, value } = e.target;
    setLoginUserInfo((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleFileChange = (e) => {
    const profile_img = e.target.files[0];
    setLoginUserInfo((preVal) => {
      return {
        ...preVal,
        profile_img: profile_img,
      };
    });
    const imageUrl = URL.createObjectURL(profile_img);
    setSelectedImage(imageUrl);
  };

  const handleEdit = () => {
    setShowButtons(true);
    setIsReadOnly(false);
  };

  const handleCancel = () => {
    setShowButtons(false);
    setIsReadOnly(true);
    setLoginUserInfo(previousProfileInfo);
    setSelectedImage("");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;

    const formData = new FormData();
    if (
      loginUserInfo.profile_img &&
      previousProfileInfo.profile_img !== loginUserInfo.profile_img
    ) {
      formData.append("profile_img", loginUserInfo.profile_img);
    }
    if (loginUserInfo.name && previousProfileInfo.name !== loginUserInfo.name) {
      formData.append("name", loginUserInfo.name);
    }

    if (formData.has("profile_img") || formData.has("name")) {
      setSpinner(true);
      try {
        const response = await fetch(`${base_url}/edit-profile`, {
          method: "PUT",
          credentials: "include",
          body: formData,
        });

        const data = await response.json();

        if (response.status === 200) {
          setIsReadOnly(true);
          setShowButtons(false);
          setShowAlert({
            value: true,
            type: "success",
            msg: data.msg,
          });
        } else {
          setShowAlert({
            value: true,
            type: "error",
            msg: data.msg,
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        checkAuthStatus();
        setSpinner(false);
      }
    } else {
      setShowAlert({
        value: true,
        type: "info",
        msg: "no changes were made !",
      });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;

    setSpinner(true);
    try {
      const response = await fetch(
        `${base_url}/remove-profile-image/${loginUserInfo.cloudinary_public_id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setSelectedImage("");
        setShowAlert({
          value: true,
          type: "success",
          msg: data.msg,
        });
      } else {
        setShowAlert({
          value: true,
          type: "error",
          msg: data.msg,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      checkAuthStatus();
      setSpinner(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <>
      {loginUserInfo ? (
        <div className={styles.profile__wrapper}>
          <div className={styles.profile__container}>
            <Toast width="100%" />
            <div className={styles.profile__img__container}>
              <Image
                src={selectedImage ? selectedImage : loginUserInfo.profile_img}
                alt="profile_pic"
                height={130}
                width={130}
              />
              {!showButtons &&
              loginUserInfo.profile_img !== "/default-user.svg" ? (
                <span
                  className={styles.image__delete__container}
                  onClick={() => setShowModal(true)}
                >
                  <DeleteOutline className={styles.image__delete__icon} />
                </span>
              ) : (
                ""
              )}

              {showButtons ? (
                <>
                  <label
                    htmlFor="profileImg"
                    className={styles.image__edit__container}
                  >
                    <CameraAlt className={styles.image__edit__icon} />
                  </label>
                  <input
                    type="file"
                    name="profile_img"
                    id="profileImg"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <div className={styles.profile__info__wrapper}>
              <div className={styles.profile__info__container}>
                <label htmlFor="name">Name :</label>
                <input
                  name="name"
                  value={loginUserInfo.name}
                  onChange={getValue}
                  readOnly={isReadOnly}
                />
              </div>

              <div className={styles.profile__info__container}>
                <label htmlFor="email">Email :</label>
                <input name="email" value={loginUserInfo.email} readOnly />
              </div>
              {showButtons ? (
                <div className={styles.edit__btn__container}>
                  <button
                    className={styles.edit__btn}
                    onClick={handleProfileUpdate}
                  >
                    {spinner && (
                      <CircularProgress
                        size={20}
                        thickness={4.5}
                        className={styles.spinner}
                      />
                    )}
                    save
                  </button>

                  <button className={styles.edit__btn} onClick={handleCancel}>
                    cancel
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            {!showButtons ? (
              <span
                className={styles.edit__proile__icon__container}
                onClick={handleEdit}
              >
                <EditSharp className={styles.edit__icon} />
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <PopupModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleOperation={handleDelete}
        spinner={spinner}
        modal_action_type="button"
        modal_title="Confirm action !"
        modal_desc="are you sure you want to remove."
      />
    </>
  );
};

export default Profilepage;
