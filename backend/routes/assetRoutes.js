const express = require("express");
const {
  addAsset,
  getAllAsset,
  downloadAssetExcel,
  getAssetBySerial,
} = require("../controllers/assetController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.use(protect);

router.post("/create", addAsset);
router.get("/all", getAllAsset);
router.get(`/find/:serialNumber`, getAssetBySerial);
router.get("/downloadexcel", downloadAssetExcel);

module.exports = router;
