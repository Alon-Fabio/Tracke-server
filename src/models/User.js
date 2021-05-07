const mongoose = require("mongoose");

//I've add the 'maxLength' to the schema properties.

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, maxLength: 20 },
  password: { type: String, required: true, maxLength: 10 },
});

mongoose.model("User", userSchema);
