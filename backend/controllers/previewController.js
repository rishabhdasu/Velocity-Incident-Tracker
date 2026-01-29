const Counter = require("../models/Counter");

exports.previewController = async (req, res) => {
  console.log("Preview COntroller");
  try {
    const counter = await Counter.findOne({ id: "incident_seq" });
    const currSeq = counter ? counter.seq : 1000;
    const nextIncidentNumber = `INC-${currSeq + 1}`;
    res
      .status(200)
      .json({ message: "New Incident Number", nextIncidentNumber });
  } catch (err) {
    console.error("Something went wrong in previewController", err);
    res.status(500).json({ message: "Something went wrong", err });
  }
};
