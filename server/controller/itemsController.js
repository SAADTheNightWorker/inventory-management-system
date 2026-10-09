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

const getItems = async (req, res) => {
  try {
    const payload = {
      tableName: tables.items,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error fetching clients", error));
  }
};

const createItems = async (req, res) => {
  try {
    const { item_name, created_by, item_code, description, min_stock, reorder_level, category_id, unit_id, issue_method } = req.body;

    if (!item_name) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.items,
      databaseFields: {
        item_code: item_code,
        item_name: item_name,
        description: description,
        min_stock: min_stock,
        reorder_level: reorder_level,
        category_id: category_id,
        unit_id: unit_id,
        issue_method: issue_method,
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

const updateItems = async (req, res) => {
  try {
    const { id, item_code, item_name, category_id, unit_id, description, min_stock, issue_method, is_active } = req.body;

    if (!id && !item_code) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.items,
      databaseFields: {
        item_name: item_name,
        category_id: category_id,
        unit_id: unit_id,
        description: description,
        min_stock: min_stock,
        issue_method: issue_method,
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

const deleteItems = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.items,
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
  getItems,
  createItems,
  updateItems,
  deleteItems,
};
