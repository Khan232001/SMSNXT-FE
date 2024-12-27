const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dnufoyhon', 
  api_key: '939498848613834', 
  api_secret: '23C_rZeYQydz28_ty9V2ZUczsm8'
});

module.exports = cloudinary;
