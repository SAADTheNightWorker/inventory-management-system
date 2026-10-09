const express = require("express");
const {
  getTransactionTypes,
  createTransactionTypes,
  updateTransactionTypes,
  deleteTransactionTypes,
} = require("../controller/transactionTypesController");

const router = express.Router();

// Transaction Types routes
router.get("/", getTransactionTypes);
router.post("/", createTransactionTypes);
router.put("/", updateTransactionTypes);
router.delete("/", deleteTransactionTypes);

module.exports = router;
