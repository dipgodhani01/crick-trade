const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    sportType: {
      type: String,
      required: true,
    },
    pointPerTeam: {
      type: Number,
      required: true,
    },
    minimumBid: {
      type: Number,
      required: true,
    },
    bidIncrement: {
      type: Number,
      required: true,
    },
    playersPerTeam: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auction", auctionSchema);
