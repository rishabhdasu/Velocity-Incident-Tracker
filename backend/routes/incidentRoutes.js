const express = require("express");
const {
  createIncident,
  getAllIncident,
  downloadIncidentExcel,
} = require("../controllers/incidentController");
const { previewController } = require("../controllers/previewController");

const router = express.Router();

router.get("/preview-number", previewController);
router.post("/create", createIncident);
router.get("/all", getAllIncident);
router.get("/downloadexcel", downloadIncidentExcel);

module.exports = router;
