const express = require("express");
const mongoose = require("mongoose");

const { errMsgDataSyn, errMsgSTWW } = require("../messages/errormsg");

const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations)
    return res.status(422).send({ error: errMsgDataSyn });

  try {
    let track = new Track({ name, locations, userId: req.user._id });
    await track.save((err, saved) => {
      if (err) console.log(err);
    });
    res.send(track);
  } catch (error) {
    res.status(422).send({ error: errMsgSTWW });
  }
});

module.exports = router;
