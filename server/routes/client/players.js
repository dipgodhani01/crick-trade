
const { getPlayersByAuction, createPlayer, deletePlayer, getPlayerById, updatePlayer,changePlayerBasePrice, getRandomPlayer } = require("../../controllers/client/players");
const upload = require("../../middlewares/uploadMiddleware");

const router = require("express").Router();

router.post("/create", upload.single("logo"), createPlayer);
router.get("/all-players/:auctionId", getPlayersByAuction);
router.get("/get-one/:auctionId/:playerId", getPlayerById);
router.put("/update", upload.single("logo"), updatePlayer);
router.put("/change-baseprice", changePlayerBasePrice);
router.get("/random-player", getRandomPlayer);
router.delete("/delete/:auctionId/:playerId", deletePlayer);

module.exports = router;
