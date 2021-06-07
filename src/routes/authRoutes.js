const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Imports
const { JWT_PHRASE } = require("../../secret");
const { errMsgMissingCra } = require("../messages/errormsg");

// Schemas
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = new User({ email, password });
    // user.markModified("password");
    await user.save((err, saved) => {
      if (err) console.log(err);
    });

    const token = jwt.sign({ userId: user._id }, JWT_PHRASE);
    res.send({ token });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ error: errMsgMissingCra });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send({ error: errMsgMissingCra });

  const user = await User.findOne({ email });
  if (!user) return res.status(422).send({ error: errMsgMissingCra });
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, JWT_PHRASE);
    res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: errMsgMissingCra });
  }
});

module.exports = router;
