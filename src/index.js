const express = require("express");
const mongoose = require("mongoose");

const { MONGODB_URI } = require("../secret");

const app = express();

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
app.get("/", (req, res) => {
  res.send("You did it boy!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
