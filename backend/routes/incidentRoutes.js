const express = require("express");
const {
  createIncident,
  getAllIncident,
  downloadIncidentExcel,
} = require("../controllers/incidentController");
const { previewController } = require("../controllers/previewController");
const { protect } = require("../middlewares/authMiddleware");


const router = express.Router();
router.use(protect);

router.get("/preview-number", previewController);
router.post("/create", createIncident);
router.get("/all", getAllIncident);
router.get("/downloadexcel", downloadIncidentExcel);

module.exports = router;
