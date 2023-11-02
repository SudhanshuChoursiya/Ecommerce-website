const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  review_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersignup",
    required: true,
  },
  review_rating: {
    type: Number,
    required: true,
  },
  review_desc: {
    type: String,
    required: true,
  },
  review_title: {
    type: String,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "usersignup",
    default: [],
  },
  dislikes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "usersignup",
    default: [],
  },
  posted_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("review", reviewSchema);
