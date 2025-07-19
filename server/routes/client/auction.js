const { createAuction } = require("../../controllers/client/auction");
const upload = require("../../middlewares/uploadMiddleware");

const router = require("express").Router();

router.post("/create-auction", upload.single("logo"),createAuction);

module.exports = router;
