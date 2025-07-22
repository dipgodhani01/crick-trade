const { createTeam, getTeamsByAuction, deleteTeam } = require("../../controllers/client/teams");
const upload = require("../../middlewares/uploadMiddleware");

const router = require("express").Router();

router.post("/create", upload.single("logo"), createTeam);
router.get("/get-all/:auctionId", getTeamsByAuction);
router.delete("/delete/:auctionId/:teamId", deleteTeam);

module.exports = router;
