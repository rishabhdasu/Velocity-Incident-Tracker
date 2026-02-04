const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },
    assetName: {
      type: String,
      required: [true, "Asset Name is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Connected", "Disconnected"],
      default: "Connected",
    },
    installedDate: { type: Date, required: true },
    // Site Address
    installedDate: { type: Date, required: true },
    siteName: {type: String, required: true, trim: true, uppercase:true},
    streetAddress1: {type: String, required: true, trim: true, uppercase:true},
    streetAddress2: {type: String, trim: true, uppercase:true},
    building: {type: String, trim: true, uppercase:true},
    room: {type: String, trim: true, uppercase:true},
    floor: {type: String, trim: true, uppercase:true},
    city: {type: String, required: true, trim: true, uppercase:true},
    state: {type: String, required: true, trim: true, uppercase:true},
    postalCode: {type: String, required: true, uppercase: true},
    country: {type: String, required: true, trim: true, uppercase: true},
  },
  { timestamps: true },
);

module.exports = mongoose.model("Asset", AssetSchema);
