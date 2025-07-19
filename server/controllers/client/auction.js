const Auction = require("../../models/Auction");

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
