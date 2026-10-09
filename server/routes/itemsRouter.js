const express = require("express");
const {
  getItems,
  createItems,
  updateItems,
  deleteItems,
} = require("../controller/itemsController");

const router = express.Router();

// Item routes
router.get("/", getItems);
router.post("/", createItems);
router.put("/", updateItems);
router.delete("/", deleteItems);

module.exports = router;
