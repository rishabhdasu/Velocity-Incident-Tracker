const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  id: { type: String, required: true }, 
  seq: { type: Number, default: 100000 }, 
  series: { type: String, default: "A" }   
});

module.exports = mongoose.model("Counter", counterSchema);
