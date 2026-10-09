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

const getLocations = async (req, res) => {
  try {
    const payload = {
      tableName: tables.locations,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error fetching clients", error));
  }
};

const createLocations = async (req, res) => {
  try {
    const { parent_location_id, location_code, location_name, location_type, created_by } = req.body;

    if (!parent_location_id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.locations,
      databaseFields: {
        parent_location_id: parent_location_id,
        location_code: location_code,
        location_name: location_name,
        location_type: location_type,
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

const updateLocations = async (req, res) => {
  try {
    const { id, location_code, location_name, location_type, is_active } = req.body;

    if (id && !location_code) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.locations,
      databaseFields: {
        location_name: location_name,
        location_type: location_type,
        is_active: is_active || 1,
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

const deleteLocations = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.locations,
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
  getLocations,
  createLocations,
  updateLocations,
  deleteLocations,
};
