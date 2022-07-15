const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/isAuthenticated");

router.get("/users", isAuthenticated, async (req, res, next) => {
  try {
    res.status(200).json(req.payload);
  } catch (error) {
    next(error);
  }
});

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    console.log("file is: ", req.file);
    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
    }
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    res.json({ fileUrl: req.file.path });
});

router.put("/users", async (req, res, next) => {
  try {
    const id = req.user._id;
    const { image } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        image
      },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
