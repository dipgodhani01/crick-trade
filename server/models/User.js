const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  image:String,
});

module.exports = mongoose.model('Users', UserSchema);
