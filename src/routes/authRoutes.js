const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { JWT_PHRASE } = require("../../secret");

// Schema
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_PHRASE);
    res.send({ token });
  } catch (err) {
    console.error(err);
    return res
      .status(422)
      .send("This email is already in use, please enter a new one or log in.");
  }
});

module.exports = router;
