const {
  createTeam,
  getTeamsByAuction,
  deleteTeam,
  getTeamById,
  updateTeam,
} = require("../../controllers/client/teams");
const upload = require("../../middlewares/uploadMiddleware");

const router = require("express").Router();

router.post("/create", upload.single("logo"), createTeam);
router.get("/get-all/:auctionId", getTeamsByAuction);
router.get("/get-one/:auctionId/:teamId", getTeamById);
router.put("/update", upload.single("logo"), updateTeam);
router.delete("/delete/:auctionId/:teamId", deleteTeam);

module.exports = router;
