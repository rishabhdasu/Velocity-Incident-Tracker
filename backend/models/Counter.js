const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  seq: {
    type: Number,
    default: 1000, // Your tickets will start at 1001
  },
});

module.exports = mongoose.model("Counter", counterSchema);
