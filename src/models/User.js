const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//I've add the 'maxLength' to the schema properties.

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, maxLength: 20 },
  password: { type: String, required: true, maxLength: 10 },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch) return reject(false);
      resolve(true);
    });
  });
};

mongoose.model("User", userSchema);
