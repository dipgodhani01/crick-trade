const axios = require("axios");
const { oauth2client } = require("../../utils/googleConfig");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

exports.createAccount = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
      });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    return res.status(200).json({
      status: true,
      message: `Account created successfully!`,
      token,
      user,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: false, message: err.message, data: {} });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      status: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error fetching profile",
    });
  }
};
