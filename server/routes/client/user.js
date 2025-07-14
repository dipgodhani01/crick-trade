const { createAccount, logout, getUserProfile } = require("../../controllers/client/user");
const { protectRoute } = require("../../middlewares/auth");

const router = require("express").Router();

router.get("/google", createAccount);
router.get("/profile", protectRoute, getUserProfile);
router.get("/logout",logout);


module.exports = router;