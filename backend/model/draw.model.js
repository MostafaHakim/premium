const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema({
  drawDate: {
    type: Date,
    required: true,
  },
  winningNumbers: {
    type: [Number],
    required: true,
  },
});

const Draw = mongoose.model("Draw", drawSchema);

module.exports = Draw;
