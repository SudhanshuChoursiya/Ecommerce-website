const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_img:{
    type:String,
    default:"/default-user.svg"
  },
  cloudinary_public_id:{
    type:String
  },
  is_verify: {
    type: Boolean,
    default: false,
  },
  is_admin: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default:"",
  }
});

module.exports = mongoose.model("usersignup", registerSchema);
