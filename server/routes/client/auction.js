const { createAuction, getAuction } = require("../../controllers/client/auction");
const upload = require("../../middlewares/uploadMiddleware");

const router = require("express").Router();

router.post("/create-auction", upload.single("logo"),createAuction);
router.get("/get/:userId", getAuction);

module.exports = router;
