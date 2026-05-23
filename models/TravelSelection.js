const mongoose = require("mongoose");

const travelSelectionSchema =
new mongoose.Schema({

  userId: String,

  place: String,

  categories: [String],

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports =
mongoose.model(
  "TravelSelection",
  travelSelectionSchema
);