require("./models/User");
const express = require("express");
const mongoose = require("mongoose");

const { MONGODB_URI } = require("../secret");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(authRoutes);

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
app.get("/", (req, res) => {
  res.send("You did it boy!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
