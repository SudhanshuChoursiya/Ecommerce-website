const mongoose = require("mongoose");

const sliderImagesSchema = new mongoose.Schema({
  
  desktop_img_url: {
    type: String,
    required: true,
  },
  mobile_img_url: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("slider_image", sliderImagesSchema);
