const { createAccount, getUserProfile } = require("../../controllers/client/user");
const { protectUser } = require("../../middlewares/auth");

const router = require("express").Router();

router.get("/google", createAccount);
router.get("/profile", protectUser, getUserProfile);

module.exports = router;
