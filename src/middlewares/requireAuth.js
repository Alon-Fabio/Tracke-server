const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { errMsgLI, errMsgSTWW } = require("../messages/errormsg");
const { JWT_PHRASE } = require("../../secret");

module.exports = (req, res, next) => {
  let { authorization: token } = req.headers;

  if (!token) return res.status(401).send({ error: errMsgLI });

  token = token.replace("Bearer ", "");

  jwt.verify(token, JWT_PHRASE, async (err, payload) => {
    if (err) return res.status(401).send({ error: errMsgLI });

    const user = await User.findById(payload.userId, (err, user) => {
      if (err || user === null)
        return res.status(401).send({ error: errMsgSTWW });

      return user;
    });

    req.user = user;
    next();
  });
};
