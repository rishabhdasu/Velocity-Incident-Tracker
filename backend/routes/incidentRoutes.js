const express = require("express");
const {
  createIncident,
  getAllIncident,
  downloadIncidentExcel,
} = require("../controllers/incidentController");

const router = express.Router();

router.post("/create", createIncident);
router.get("/all", getAllIncident);
router.get("/downloadexcel", downloadIncidentExcel);

module.exports = router;
