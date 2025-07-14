const User = require("../../models/User");
const axios = require("axios");
const { oauth2client } = require("../../utils/googleConfig");
const { generateToken, setTokenCookie, clearTokenCookie } = require("../../services/userService");

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
    const token = generateToken({ _id: user._id, email: user.email });
    setTokenCookie(res, token);

    return res.status(200).json({
      status: true,
      message: `Account created successfully!`,
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
    
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};


exports.logout = (req, res) => {
  try {
    clearTokenCookie(res);

    return res.status(200).json({
      status: true,
      message: "Logout successful!",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Logout failed!",
    });
  }
};