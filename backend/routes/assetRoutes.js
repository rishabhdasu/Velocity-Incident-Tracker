const express = require("express");
const {
  addAsset,
  getAllAsset,
  downloadAssetExcel,
} = require("../controllers/assetController");

const router = express.Router();

router.post("/create", addAsset);
router.get("/all", getAllAsset);
router.get("/downloadexcel", downloadAssetExcel);

module.exports = router;
