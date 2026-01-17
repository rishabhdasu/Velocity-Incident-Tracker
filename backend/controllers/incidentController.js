const Incidents = require("../models/Incidents");
const Assets = require("../models/Assets");

exports.Incidents = async (req, res) => {
  try {
    const { serialNumber, title, description, status, priority } = req.body;
    if (!serialNumber || !title || !description || !status || !priority) {
      res.status(400).json({ message: "All fields are required" });
    }
    const existingAsset = await Asset.findOne({ serialNumber });
    if (!existingAsset) {
      return res
        .status(404)
        .json({ message: "Asset not found. Cannot create Incident" });
    }
    const newIncident = new Incidents({
      title,
      description,
      status,
      priority,
      asset: existingAsset._id,
    });
    await newIncident.save();
    res
      .status(201)
      .json({ message: "Incident successfuly created", newIncident });
  } catch (err) {
    res.status(500).json({
      message: " Internal Server Error. Please try again",
    });
  }
};
