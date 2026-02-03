const Asset = require("../models/Asset");
const xlsx = require("xlsx");

exports.addAsset = async (req, res) => {
  try {
    const { serialNumber, status, assetName, installedDate } = req.body;
    if (!serialNumber || !status || !assetName || !installedDate) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newAsset = new Asset({
      serialNumber,
      status,
      assetName,
      installedDate,
    });
    await newAsset.save();
    res.status(201).json({ message: "Asset added successfully", newAsset });
  } catch (err) {
    console.error("ADD_ASSET_ERROR:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllAsset = async (req, res) => {
  try {
    const asset = await Asset.find();
    return res.status(200).json(asset);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

exports.getAssetBySerial= async (req, res) => {
  try {
    const {serialNumber } = req.params;
    const asset = await Asset.findOne({serialNumber: serialNumber.trim().toUpperCase()});
      if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    return res.status(200).json(asset);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

exports.downloadAssetExcel = async (req, res) => {
  try {
    const asset = await Asset.find();
    const data = asset.map((item) => ({
      "Serial Number": item.serialNumber,
      "Asset Name": item.assetName,
      Status: item.status,
      "Installed Date": item.installedDate
        ? new Date(item.installedDate).toLocaleString()
        : "N/A",
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Assets");
    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader("Content-Disposition", "attachment; filename=assets.xlsx");
    return res.send(buffer);
  } catch (err) {
    console.error("Add Asset Error:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again" });
  }
};


