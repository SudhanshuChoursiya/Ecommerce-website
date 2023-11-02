require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (req.file) {
      const buffer = req.file.buffer;
      const mimeType = req.file.mimetype;
      const base64Image = buffer.toString("base64");

      const dataUriString = `data:${mimeType};base64,${base64Image}`;
      const result = await cloudinary.uploader.upload(dataUriString, {
        allowed_formats: ["jpg", "png", "jpeg"],
        public_id: `profile_${Date.now()}_${req.file.originalname}`,
        unique_filename: true,
      });

      req.resultData = result;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

const removeFromCloudinary = async (req, res, next) => {
  try {
    const publicId = req.params.public_id;

    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "unexpected error occured" });
  }
};

module.exports = {
  uploadToCloudinary,
  removeFromCloudinary,
};
