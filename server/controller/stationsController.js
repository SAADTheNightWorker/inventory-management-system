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

const getStations = async (req, res) => {
  try {
    const payload = {
      tableName: tables.stations,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error fetching clients", error));
  }
};

const createStations = async (req, res) => {
  try {
    const { station_name, description, created_by, station_code } = req.body;

    if (!station_name) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.stations,
      databaseFields: {
        station_name: station_name,
        station_code: station_code,
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

const updateStations = async (req, res) => {
  try {
    const { id, station_code, station_name, description, is_active, } = req.body;

    if (id && !station_code) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.stations,
      databaseFields: {
        station_name: station_name,
        description: description,
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

const deleteStations = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.stations,
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
  getStations,
  createStations,
  updateStations,
  deleteStations,
};
