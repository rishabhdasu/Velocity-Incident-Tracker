const express = require("express");
const {
  createIncident,
  getAllIncident,
  downloadIncidentExcel,
} = require("../controllers/incidentController");

const router = express.Router();

router.post("/add", createIncident);
router.get("/get", getAllIncident);
router.get("/downloadexcel", downloadIncidentExcel);

module.exports = router;
