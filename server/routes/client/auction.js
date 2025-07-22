const { createAuction, getAuction, deleteAuction, getSingleAuction, updateAuction } = require("../../controllers/client/auction");
const upload = require("../../middlewares/uploadMiddleware.js");

const router = require("express").Router();

router.post("/create-auction", upload.single("logo"),createAuction);
router.get("/get/:userId", getAuction);
router.get("/one-auction/:auctionId", getSingleAuction);
router.put("/update/:id", upload.single("logo"), updateAuction); 
router.delete("/delete/:id", deleteAuction);

module.exports = router;
