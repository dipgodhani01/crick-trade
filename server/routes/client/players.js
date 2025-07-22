
const { getPlayersByAuction, createPlayer, deletePlayer, getPlayerById, updatePlayer } = require("../../controllers/client/players");
const upload = require("../../middlewares/uploadMiddleware");

const router = require("express").Router();

router.post("/create", upload.single("logo"), createPlayer);
router.get("/all-players/:auctionId", getPlayersByAuction);
router.get("/get-one/:auctionId/:playerId", getPlayerById);
router.put("/update", upload.single("logo"), updatePlayer);
router.delete("/delete/:auctionId/:playerId", deletePlayer);



module.exports = router;
