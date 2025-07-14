const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEOUT,
  });
};

exports.setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure:false,
    sameSite: "Lax",
    maxAge: 1000 * 60 * 60 * 24, 
  });
};

exports.clearTokenCookie = (res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
  });
};