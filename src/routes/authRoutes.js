const express = require("express");
const mongoose = require("mongoose");

// Schema
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.send("You made the post request");
});

module.exports = router;
