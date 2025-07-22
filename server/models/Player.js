const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
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
    minimumBid: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    ts_size: {
      type: String,
      required: true,
    },
    tr_size: {
      type: String,
      required: true,
    },
    ts_name: {
      type: String,
      required: true,
    },
    ts_number: {
      type: String,
      required: true,
    },
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
