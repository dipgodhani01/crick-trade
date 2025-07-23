const path = require("path");
const fs = require("fs");
const Player = require("../../models/Player");
const { default: mongoose } = require("mongoose");

exports.createPlayer = async (req, res) => {
  try {
    const {
      name,
      sportCategory,
      phone,
      age,
      tshirtSize,
      trouserSize,
      jerseyName,
      jerseyNumber,
      auctionId,
    } = req.body;

    let logoUrl = "";
    if (req.file) {
      logoUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const newPlayer = new Player({
      logo: logoUrl,
      name,
      minimumBid: "100000",
      category: sportCategory,
      phone,
      age,
      ts_size: tshirtSize,
      tr_size: trouserSize,
      ts_name: jerseyName,
      ts_number: jerseyNumber,
      auction: auctionId,
      status:'pending',
    });

    await newPlayer.save();

    res.status(201).json({
      success: true,
      message: "Player created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPlayersByAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const players = await Player.find({ auction: auctionId });

    res.status(200).json({
      success: true,
      data: players,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const { auctionId, playerId } = req.params;

    const player = await Player.findOneAndDelete({
      _id: playerId,
      auction: auctionId,
    });

    if (!player) {
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

exports.getPlayerById = async (req, res) => {
  try {
    const { auctionId, playerId } = req.params;

    const player = await Player.findOne({
      _id: playerId,
      auction: auctionId,
    });

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found or doesn't belong to this auction",
      });
    }

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const {
      name,
      sportCategory,
      phone,
      age,
      tshirtSize,
      trouserSize,
      jerseyName,
      jerseyNumber,
      auctionId,
      playerId,
    } = req.body;

    const player = await Player.findById({ _id: playerId, auction: auctionId });

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found or doesn't belong to this auction",
      });
    }

    if (req.file) {
      const oldLogoPath = player.logo?.replace(
        `${req.protocol}://${req.get("host")}`,
        ""
      );
      const fullPath = path.join(__dirname, "../../../", oldLogoPath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }

      player.logo = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    player.name = name;
    player.minimumBid = "100000" || player.minimumBid;
    player.category = sportCategory;
    player.phone = phone;
    player.age = age;
    player.ts_size = tshirtSize;
    player.tr_size = trouserSize;
    player.ts_name = jerseyName;
    player.ts_number = jerseyNumber;
    player.auction = auctionId;

    await player.save();

    res.status(200).json({
      success: true,
      message: "Player updated successfully",
      data: player,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

exports.changePlayerBasePrice = async (req, res) => {
  try {
    const { minimumBid, playerId, auctionId } = req.body;

    const player = await Player.findOne({ _id: playerId, auction: auctionId });

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found or doesn't belong to this auction",
      });
    }

    player.minimumBid = minimumBid;

    await player.save();

    res.status(200).json({
      success: true,
      message: "Player base price updated successfully",
      data: player,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};


exports.getRandomPlayer = async (req, res) => {
  try {
    const { auctionId } = req.query;

    if (!auctionId) {
      return res.status(400).json({
        success: false,
        message: "Auction Not Found!",
      });
    }

    const [player] = await Player.aggregate([
      {
        $match: {
          auction: new mongoose.Types.ObjectId(auctionId),
          status: "pending",
        },
      },
      { $sample: { size: 1 } },
    ]);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "No pending players found for this auction",
      });
    }

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};