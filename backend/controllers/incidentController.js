const Incident = require("../models/Incident");
const Asset = require("../models/Asset");
const xlsx = require("xlsx");
const Counter = require("../models/Counter");

// Create Incident Controller
exports.createIncident = async (req, res) => {
  try {
    const { assetId, title, description, status, priority } = req.body;
    if (!assetId || !title || !description || !status || !priority) {
      res.status(400).json({ message: "All fields are required" });
    }
    const newIncident = new Incident({
      title,
      description,
      status,
      priority,
      asset: assetId,
    });
    await newIncident.save();
    res
      .status(201)
      .json({ message: "Incident successfuly created", newIncident });
  } catch (err) {
    console.error("Create Incident Error:", err);
    return res.status(500).json({
      message: " Internal Server Error. Please try again",
    });
  }
};

// Get All Incidents
exports.getAllIncident = async (req, res) => {
  try {
    const allIncidents = await Incident.find().populate("asset");
    res.status(200).json(allIncidents);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
};

// Download Incident
exports.downloadIncidentExcel = async (req, res) => {
  try {
    const incident = await Incident.find().populate("asset");
    const data = incident.map((inc) => ({
      "Serial Number": inc.asset ? inc.asset.serialNumber : "N/A",
      "Date Created": new Date(inc.createdAt).toLocaleString(),
      Title: inc.title,
      Description: inc.description,
      Status: inc.status,
      Priority: inc.priority,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Incidents");
    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=incidents_report.xlsx",
    );
    return res.send(buffer);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
};
