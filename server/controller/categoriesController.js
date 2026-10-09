const tables = require("../config/tables");
const dotenv = require("dotenv");
const { GlobalSelect } = require("../GlobalFunctions/GlobalSelect");
const { GlobalInsert } = require("../GlobalFunctions/GlobalCreate");
const { GlobalUpdate } = require("../GlobalFunctions/GlobalUpdate");
const { GlobalDelete } = require("../GlobalFunctions/GlobalDelete");
const RESPONSE = require("../GlobalResponse/RESPONSE");
const moment = require("moment");
require("moment-timezone");
const logger = require("../Utils/logger");

dotenv.config();

const getCategories = async (req, res) => {
  try {
    const payload = {
      tableName: tables.categories,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error fetching clients", error));
  }
};

const createCategories = async (req, res) => {
  try {
    const { category_name, created_by, category_code, description } = req.body;

    if (!category_name) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.categories,
      databaseFields: {
        category_code: category_code,
        category_name: category_name,
        description: description,
        created_by: created_by,
        created_at: moment.tz("Asia/Karachi").format("YYYY-MM-DD-HH-mm-ss"),
      },
    };

    await GlobalInsert(payload, res);
  } catch (error) {
    logger.error(`Error creating client: ${error.message}`, error);
    return res.status(500).send(RESPONSE(false, "Error creating client", {}));
  }
};

const updateCategories = async (req, res) => {
  try {
    const { id, category_code, description, category_name, is_active } = req.body;

    if (!id && !category_code) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.categories,
      databaseFields: {
        category_name: category_name,
        description: description,
        is_active: is_active,
        updated_at: moment.tz("Asia/Karachi").format("YYYY-MM-DD-HH-mm-ss"),
      },
    };

    await GlobalUpdate(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error updating client", error));
  }
};

const deleteCategories = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.categories,
      databaseFields: {
        id: id,
      },
    };

    await GlobalDelete(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error deleting client", error));
  }
};

module.exports = {
  getCategories,
  createCategories,
  updateCategories,
  deleteCategories,
};
