const { createAccount, getUserProfile } = require("../../controllers/client/user");

const router = require("express").Router();

router.get("/google", createAccount);
router.get("/profile", getUserProfile);

module.exports = router;
