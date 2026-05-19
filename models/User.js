const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  kakaoId: Number,

  nickname: String,

  profileImage: String,

});

module.exports =
  mongoose.model("User", userSchema);