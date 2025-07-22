const Team = require("../../models/Team");

exports.createTeam = async (req, res) => {
  try {
    const { name, auctionId } = req.body;
    let logoUrl = "";
    if (req.file) {
      logoUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const newTeam = new Team({
      name,
      logo: logoUrl,
      auction: auctionId,
    });

    await newTeam.save();

    res.status(201).json({
      success: true,
      message: "Team created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTeamsByAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const teams = await Team.find({ auction: auctionId });

    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { auctionId, teamId } = req.params;
    const team = await Team.findOneAndDelete({
      _id: teamId,
      auction: auctionId, 
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found or doesn't belong to this auction",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
