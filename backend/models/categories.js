const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("category", categoriesSchema);
