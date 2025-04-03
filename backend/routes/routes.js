const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const upload = require("../middleware/multer.js");
const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../middleware/cloudinary.js");
const contactDetails = require("../models/contactform.js"); 

const sliderImages = require("../models/slider_images.js");

const signup = require("../models/register.js");
const categories = require("../models/categories.js");
const reviewModel = require("../models/review.js");

const verifyToken = require("../middleware/auth.js");

const verifyEmail = require("../services/nodemailer/verifyEmail.js");

const forgetPasswordEmail = require("../services/nodemailer/forget-password-mail.js");

router.get("/product-categories", async (req, res) => {
  try {
    const categoriesDetails = await categories.find();

    if (!categoriesDetails) {
      res.status(404).json({ msg: "no category found" });
    }

    res.status(200).json({ msg: "categories fetched", categoriesDetails });
  } catch (error) {
    console.log(error);
  }
});

router.get("/slider-images", async (req, res) => {
  try {
    const slider_images = await sliderImages.find();

    if (!slider_images) {
      res.status(404).json({ msg: "no images found" });
    }

    res.status(200).json({ msg: "images fetched", slider_images });
  } catch (error) {
    console.log(error);
  }
});

router.post("/contact", async (req, res) => {
  const { name, email, mobileno, subject, message } = req.body;

  let contactData = new contactDetails({
    name: name,
    email: email,
    mobileNo: mobileno,
    subject: subject,
    message: message,
  });
  contactData
    .save()
    .then(() => {
      res.status(200).json({ msg: "Response recorded" });
    })
    .catch((err) => {
      res.status(500).json("some error occured");
    });
});

router.post("/register", async (req, res) => {
  const uniqeEmail = await signup.find({ email: req.body.email });

  if (uniqeEmail.length != 0) {
    return res.status(400).json({ msg: "email already exists." });
  } else if (req.body.password === req.body.cpassword) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const { name, email } = req.body;

    const signupData = new signup({
      name: name,
      email: email,
      password: hashPassword,
    });
    signupData
      .save()
      .then((response) => {
        verifyEmail(response.email, response._id);

        res
          .status(200)
          .json({ msg: "signup successfully !", signupData: signupData });
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  } else {
    return res
      .status(400)
      .json({ msg: "password and confirm password not matched !" });
  }
});

router.get("/verify-email/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const verify_status = await signup.findOne({ _id: id });
    if (verify_status.is_verify === false) {
      const verified = await signup.updateOne(
        { _id: id },
        { $set: { is_verify: true } }
      );
      res.redirect("http://localhost:3000/verification-success");
    } else {
      res.redirect("http://localhost:3000/");
    }
  } catch (err) {
    res.status(501).json({ msg: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const matchedUser = await signup.findOne({ email: email });
  if (matchedUser) {
    const checkPassword = await bcrypt.compare(password, matchedUser.password);
    if (checkPassword) {
      if (matchedUser.is_verify === true) {
        const token = jwt.sign({ matchedUser }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        res.status(200).json({ msg: "login succesfull", user: matchedUser });
      } else {
        res.status(400).json({ msg: "Please verify your email first" });
      }
    } else {
      res.status(400).json({ msg: "email and password not matched" });
    }
  } else {
    res.status(400).json({ msg: "email and password not matched" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(0),
  });
  res.status(200).json({ msg: "Logout successfully" });
});

router.post("/send-reset-password-link", async (req, res) => {
  const email = req.body.email;
  const checkEmailInDb = await signup.findOne({ email: email });
  if (checkEmailInDb) {
    const token = uuidv4();

    const add_token = signup
      .updateOne({ email: email }, { $set: { token: token } })
      .then((response) => {
        forgetPasswordEmail(email, token);

        res.cookie("reset", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        res.status(200).json({ msg: "Password reset link has been sent" });
      })
      .catch((err) => {
        res.status(500).json({ msg: "Can’t send email now,try again letter" });
      });
  } else {
    res.status(500).json({ msg: "Entered Email not exists" });
  }
});

router.post("/forget-password/:token", async (req, res) => {
  const token = req.params.token;
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  if (password === cpassword) {
    const newhashPassword = await bcrypt.hash(req.body.password, 10);
    const updatedpassword = signup
      .updateOne(
        { token: token },
        { $set: { password: newhashPassword, token: "" } }
      )
      .then(() => {
        res.cookie("reset", "", {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          expires: new Date(0),
        });
        res.status(200).json({ msg: "password reset successfull" });
      })
      .catch((err) => {
        res.status(400).json({ msg: "error" });
      });
  } else {
    res.status(400).json({ msg: "password and confirm password not matched" });
  }
});

router.get("/check-auth", verifyToken, async (req, res) => {
  const isAuthenticated = req.isAuthenticated;

  if (isAuthenticated === true) {
    const id = req.userId;
    try {
      const loginUserDetails = await signup.findOne({ _id: id });
      res.status(200).json({ authenticated: true, userInfo: loginUserDetails });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ authenticated: false });
  }
});

router.put(
  "/edit-profile",
  verifyToken,
  upload.single("profile_img"),
  uploadToCloudinary,
  async (req, res) => {
    if (req.fileValidationError) {
      return res.status(400).json({ msg: "invaild file type" });
    }

    const name = req.body.name ? req.body.name : null;

    const id = req.userId;

    let updatedProfileData = {};

    if (name !== null || undefined) {
      updatedProfileData.name = name;
    }

    if (req.file) {
      const cloudinaryResponse = req.resultData;
      const secureUrl = cloudinaryResponse.secure_url;
      const publicId = cloudinaryResponse.public_id;

      updatedProfileData.profile_img = secureUrl;

      updatedProfileData.cloudinary_public_id = publicId;
    }

    try {
      const updatedUserProfile = await signup.findByIdAndUpdate(
        id,
        updatedProfileData
      );
      if (!updatedUserProfile) {
        res
          .status(400)
          .json({ msg: "unexpected error occured try again latter !" });
      }
      res.status(200).json({ msg: "profile updated !" });
    } catch (error) {
      console.log(error);
    }
  }
);

router.put(
  "/remove-profile-image/:public_id",
  verifyToken,
  removeFromCloudinary,
  async (req, res) => {
    const id = req.userId;

    let dataToUpdate = {
      profile_img: "/default-user.svg",
      cloudinary_public_id: "",
    };

    try {
      const updatedData = await signup.findByIdAndUpdate(id, dataToUpdate);
      if (!updatedData) {
        res.status(401).json({ msg: "Error in deleting image !" });
      }

      res.status(200).json({ msg: "succesfully deleted profile image !" });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post("/post-product-review/:id", verifyToken, async (req, res) => {
  const productId = req.params.id;
  const userId = req.userId;
  try {
    const is_already_review = await reviewModel.findOne({
      product_id: productId,
      review_by: userId,
    });

    if (is_already_review) {
      return res
        .status(400)
        .json({ msg: "you have already review this product" });
    }

    const review = new reviewModel({
      product_id: productId,
      review_by: userId,
      review_rating: req.body.reviewRating,
      review_desc: req.body.reviewDesc,
      review_title: req.body.reviewTitle,
    });

    const savedReview = await review.save();

    console.log(savedReview);
    if (!savedReview) {
      res.status(500).json({ msg: "error in review" });
    }

    res.status(201).json({ msg: "succesfully rate the product" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-product-review/:id", verifyToken, async (req, res) => {
  const productId = req.params.id;
  try {
    const productReviews = await reviewModel
      .find({ product_id: productId })
      .populate("review_by");

    if (!productReviews) {
      return res.status(400).json({ msg: "no reviews found for this product" });
    }

    return res
      .status(200)
      .json({ msg: "product reviews fetched !", productReviews });
  } catch (error) {
    console.log(error);
  }
});

router.put("/like-review/:id", async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.body.userId;

  try {
    const isReviewExists = await reviewModel.findById(reviewId);

    if (!isReviewExists) {
      return res.status(404).json({ msg: "review not found" });
    }

    const alreadyLikes = isReviewExists.likes.includes(userId);

    const isDislike = isReviewExists.dislikes.includes(userId);

    if (isDislike) {
      const removeDislike = await reviewModel.findByIdAndUpdate(reviewId, {
        $pull: { dislikes: userId },
      });
    }
    if (!alreadyLikes) {
      const addLike = await reviewModel.findByIdAndUpdate(
        reviewId,
        {
          $addToSet: { likes: userId },
        },

        { new: true }
      );

      if (addLike) {
        res.status(200).json({ msg: "review liked", isLiked: true });
      }
    }

    if (alreadyLikes) {
      const removeLike = await reviewModel.findByIdAndUpdate(
        reviewId,
        {
          $pull: { likes: userId },
        },
        { new: true }
      );

      if (removeLike) {
        res.status(200).json({ msg: "like removed", isLiked: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/dislike-review/:id", async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.body.userId;

  try {
    const isReviewExists = await reviewModel.findById(reviewId);

    if (!isReviewExists) {
      return res.status(404).json({ msg: "review not found" });
    }

    const alreadyDisLike = isReviewExists.dislikes.includes(userId);

    const isLike = isReviewExists.likes.includes(userId);

    if (isLike) {
      const removeLike = await reviewModel.findByIdAndUpdate(reviewId, {
        $pull: { likes: userId },
      });
    }

    if (!alreadyDisLike) {
      const addDisLike = await reviewModel.findByIdAndUpdate(
        reviewId,
        {
          $addToSet: { dislikes: userId },
        },

        { new: true }
      );

      if (addDisLike) {
        res.status(200).json({ msg: "review disliked", isDisliked: true });
      }
    }

    if (alreadyDisLike) {
      const removeDisLike = await reviewModel.findByIdAndUpdate(
        reviewId,
        {
          $pull: { dislikes: userId },
        },
        { new: true }
      );

      if (removeDisLike) {
        res.status(200).json({ msg: "dislike removed", isDisliked: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete-product-review/:id", verifyToken, async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.userId;
  const isReviewExists = await reviewModel.findOne({
    _id: reviewId,
    review_by: userId,
  });
  if (!isReviewExists) {
    return res.status(404).json({ msg: "review not exists" });
  }

  const deletedReview = await reviewModel.findByIdAndDelete(reviewId);

  if (!deletedReview) {
    return res.status(400).json({ msg: "unexpected error,try again letter" });
  }

  res.status(200).json({ msg: "review deleted !" });
});

router.put("/edit-product-review/:id", verifyToken, async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.userId;
  const isReviewExists = await reviewModel.findOne({
    _id: reviewId,
    review_by: userId,
  });
  if (!isReviewExists) {
    return res.status(404).json({ msg: "review not exists" });
  }

  const editedReview = await reviewModel.findByIdAndUpdate(
    reviewId,
    {
      review_rating: req.body.reviewRating,
      review_desc: req.body.reviewDesc,
      review_title: req.body.reviewTitle,
    },
    { new: true }
  );

  if (!editedReview) {
    return res.status(400).json({ msg: "unexpected error,try again letter" });
  }

  res.status(200).json({ msg: "review edit successfully !" });
});

router.get(
  "/single-product-review-details/:id",
  verifyToken,
  async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.userId;
    try {
      const reviewDetails = await reviewModel.findOne({
        _id: reviewId,
        review_by: userId,
      });

      if (!reviewDetails) {
        return res.status(404).json({ msg: "your review not found" });
      }

      res.status(200).json({
        msg: "review deatils fetched !",
        reviewDetails: reviewDetails,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
