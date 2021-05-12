// Schema imports
require("./models/User");

// Libraries
const express = require("express");
const mongoose = require("mongoose");

// Files
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");

// Imports
const { MONGODB_URI } = require("../secret");

const app = express();

// Middleware
app.use(express.json());
app.use(authRoutes);

// DB config
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongooose instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting on Mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Hello user, your email is ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
