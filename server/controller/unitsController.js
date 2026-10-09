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

const getUnits = async (req, res) => {
  try {
    const payload = {
      tableName: tables.units,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error fetching clients", error));
  }
};

const createUnits = async (req, res) => {
  try {
    const { unit_name, created_by, unit_code } = req.body;

    if (!unit_name) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.units,
      databaseFields: {
        unit_code: unit_code,
        unit_name: unit_name,
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

const updateUnits = async (req, res) => {
  try {
    const { id, unit_code, unit_name, is_active, updated_by } = req.body;

    if (!id && !unit_code) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.units,
      databaseFields: {
        unit_name: unit_name,
        is_active: is_active || 1,
        updated_by: updated_by,
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

const deleteUnits = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.units,
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
  getUnits,
  createUnits,
  updateUnits,
  deleteUnits,
};
