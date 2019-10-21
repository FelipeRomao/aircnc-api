const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

SpotSchema.virtual("thumbnail_url").get(function() {
  return `http://192.168.1.4:8888/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Spot", SpotSchema);
