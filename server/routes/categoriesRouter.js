const express = require("express");
const {
  createCategories,
  deleteCategories,
  getCategories,
  updateCategories,
} = require("../controller/categoriesController");

const router = express.Router();

// Category routes
router.get("/", getCategories);
router.post("/", createCategories);
router.put("/", updateCategories);
router.delete("/", deleteCategories);

module.exports = router;
