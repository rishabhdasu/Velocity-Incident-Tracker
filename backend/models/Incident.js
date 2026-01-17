const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "closed", "pending", "on-hold"],
      default: "open",
    },
    priority: { type: String, enum: ["low", "medium", "high", "critical"] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Incident", IncidentSchema);
