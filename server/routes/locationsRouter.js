const express = require("express");
const {
  getLocations,
  createLocations,
  updateLocations,
  deleteLocations,
} = require("../controller/locationsController");

const router = express.Router();

// Location routes
router.get("/", getLocations);
router.post("/", createLocations);
router.put("/", updateLocations);
router.delete("/", deleteLocations);

module.exports = router;
