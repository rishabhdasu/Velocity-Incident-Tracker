const express = require("express");
const {
  addAsset,
  getAllAsset,
  downloadAssetExcel,
  getAssetBySerial,
} = require("../controllers/assetController");

const router = express.Router();

router.post("/create", addAsset);
router.get("/all", getAllAsset);
router.get(`/find/:serialNumber`, getAssetBySerial);
router.get("/downloadexcel", downloadAssetExcel);

module.exports = router;
