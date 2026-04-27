const model = require("../models/reportesModel");
const { successResponse } = require("../utils/response");

async function operaciones(_req, res) {
  const data = await model.reporteOperaciones();
  return res.json(successResponse(data, "Reporte de operaciones generado"));
}

async function quejas(_req, res) {
  const data = await model.reporteQuejas();
  return res.json(successResponse(data, "Reporte de quejas generado"));
}

async function stock(_req, res) {
  const data = await model.reporteStock();
  return res.json(successResponse(data, "Reporte de stock generado"));
}

async function maquinas(_req, res) {
  const data = await model.reporteMaquinas();
  return res.json(successResponse(data, "Reporte de maquinas generado"));
}

async function clientesRiesgo(_req, res) {
  const data = await model.reporteClientesRiesgo();
  return res.json(successResponse(data, "Reporte de clientes en riesgo generado"));
}

module.exports = {
  operaciones,
  quejas,
  stock,
  maquinas,
  clientesRiesgo
};
