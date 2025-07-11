const mongoose = require("mongoose");
const { Schema } = mongoose;
const { table } = require("../config/tables");

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "block"],
      default: "active",
    },
    role: { type: String },
    isActive: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
  { toJSON: { virtuals: true } }
);

module.exports = mongoose.model(table.users, UserSchema);
