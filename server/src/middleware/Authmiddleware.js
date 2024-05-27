const jwt = require("jsonwebtoken");
const User = require('../model/user');

require("dotenv").config();

module.exports.isAuthenticated = async (req, res, next) => {
  const token =  req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid request!" });
  }
};

module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    res.locals.user = user || null;
    next();
  } catch (err) {
    console.log(err.message);
    res.locals.user = null;
    next();
  }
};


