const Counter = require("../models/Counter");

exports.previewController = async (req, res) => {
  try {
   const counter = await Counter.findOne({id: "incident_seq"});
   const currentLetter = counter ? counter.series : "A";
   const nextSeq = counter ? counter.seq + 1 : 100001;
   const paddedSeq = String(nextSeq).padStart(6, "0");
    const nextIncidentNumber = `J${currentLetter}${paddedSeq}`;

    res.status(200).json({ nextIncidentNumber });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};