const jwt = require("jsonwebtoken");
const User = require("../models/user");
const generalConst = require("../constants/general");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, generalConst.uniqueText);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    next();
  } catch {
    res.status(401).send({ error: "Not authorized!" });
  }
};

module.exports = auth;
