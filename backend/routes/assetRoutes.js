const express = require("express");
const {
  addAsset,
  getAllAsset,
  downloadAssetExcel,
} = require("../controllers/assetController");

const router = express.Router();

router.post("/add", addAsset);
router.get("/get", getAllAsset);
router.get("/downloadexcel", downloadAssetExcel);
