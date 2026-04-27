const { dashboardGeneral } = require("../models/reportesModel");
const { successResponse } = require("../utils/response");

async function getDashboard(_req, res) {
  const data = await dashboardGeneral();
  return res.json(successResponse(data, "Dashboard obtenido"));
}

module.exports = {
  getDashboard
};
