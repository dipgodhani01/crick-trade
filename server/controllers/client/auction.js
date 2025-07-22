const Auction = require("../../models/Auction");
const path = require("path");
const fs = require("fs");

exports.createAuction = async (req, res) => {
  try {
    const {
      name,
      date,
      sportType,
      pointPerTeam,
      minimumBid,
      bidIncrement,
      playersPerTeam,
      userId,
    } = req.body;

    const inputDate = new Date(date);
    const currentDate = Date.now();

    if (inputDate.getTime() < currentDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid auction date. Past dates are not allowed.",
      });
    } else {
      let logoUrl = "";
      if (req.file) {
        logoUrl = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`;
      }

      const auction = new Auction({
        logo: logoUrl,
        name,
        date,
        sportType,
        pointPerTeam,
        minimumBid,
        bidIncrement,
        playersPerTeam,
        user: userId,
      });

      await auction.save();

      res.status(201).json({
        success: true,
        message: "Auction created successfully",
        auction,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server error!",
    });
  }
};

exports.getAuction = async (req, res) => {
  try {
    const { userId } = req.params;
    const auctions = await Auction.find({ user: userId });

    res.status(201).json({
      success: true,
      data: auctions,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server error!",
    });
  }
};

exports.deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    await auction.deleteOne();
    res.status(200).json({
      success: true,
      message: "Auction deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server error!",
    });
  }
};

exports.getSingleAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId);

    if (!auction) {
      return res
        .status(404)
        .json({ success: false, message: "Auction not found" });
    }

    res.status(200).json({ success: true, data: auction });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res
        .status(404)
        .json({ success: false, message: "Auction not found" });
    }

    const {
      name,
      date,
      sportType,
      pointPerTeam,
      minimumBid,
      bidIncrement,
      playersPerTeam,
    } = req.body;

    if (req.file) {
      const oldLogoPath = auction.logo?.replace(
        `${req.protocol}://${req.get("host")}`,
        ""
      );
      const fullPath = path.join(__dirname, "../../../", oldLogoPath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }

      auction.logo = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    auction.name = name || auction.name;
    auction.date = date || auction.date;
    auction.sportType = sportType || auction.sportType;
    auction.pointPerTeam = pointPerTeam || auction.pointPerTeam;
    auction.minimumBid = minimumBid || auction.minimumBid;
    auction.bidIncrement = bidIncrement || auction.bidIncrement;
    auction.playersPerTeam = playersPerTeam || auction.playersPerTeam;

    await auction.save();

    res.status(200).json({
      success: true,
      message: "Auction updated successfully",
      data: auction,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

