const mongoose = require("mongoose");
const { Schema } = mongoose;
const { table } = require("../config/tables");

const UserSchema = new Schema({
  name: String,
  email: String,
  image:String,
});

module.exports = mongoose.model(table.users, UserSchema);
