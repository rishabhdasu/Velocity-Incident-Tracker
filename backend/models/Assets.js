const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      uniquie: true,
    },
    assetName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Connected", "Disconnected"],
      default: true,
    },
    installedDate: { type: Date, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Assets", AssetSchema);
