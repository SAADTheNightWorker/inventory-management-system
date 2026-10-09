const express = require("express");
const {
  createStations,
  deleteStations,
  getStations,
  updateStations,
} = require("../controller/stationsController");

const router = express.Router();

// Station routes
router.get("/", getStations);
router.post("/", createStations);
router.put("/", updateStations);
router.delete("/", deleteStations);

module.exports = router;
