const Assets = require("../models/Assets");

exports.addAsset = async (req, res) => {
  try {
    const { serialNumber, status, assetName, installedDate } = req.body;
    if (!serialNumber || !status || !assetName || !installedDate) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const newAsset = new Assets({
      serialNumber,
      status,
      assetName,
      installedDate,
    });
    await newAsset.save();
    res.status(201).json({ message: "Asset added successfully", newAsset });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
