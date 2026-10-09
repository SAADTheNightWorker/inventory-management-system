const express = require("express");
const {
  getUnits,
  createUnits,
  updateUnits,
  deleteUnits,
} = require("../controller/unitsController");

const router = express.Router();

// Unit routes
router.get("/", getUnits);
router.post("/", createUnits);
router.put("/", updateUnits);
router.delete("/", deleteUnits);

module.exports = router;
