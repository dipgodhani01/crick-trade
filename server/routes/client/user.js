const { createAccount } = require("../../controllers/client/user");

const router = require("express").Router();

router.get("/google", createAccount);



module.exports = router;