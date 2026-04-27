const model = require("../models/quejasModel");
const { successResponse, errorResponse } = require("../utils/response");

async function getAll(req, res) {
  const data = await model.listQuejas(req.query);
  return res.json(successResponse(data, "Quejas obtenidas"));
}

async function getById(req, res) {
  const data = await model.getQuejaById(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Queja no encontrada", "NOT_FOUND"));
  return res.json(successResponse(data, "Queja obtenida"));
}

async function create(req, res) {
  const payload = { ...req.body };
  if (payload.estado === "resuelta" && !payload.fecha_resolucion) {
    payload.fecha_resolucion = new Date().toISOString();
  }
  const data = await model.createQueja(payload);
  return res.status(201).json(successResponse(data, "Queja creada"));
}

async function update(req, res) {
  const payload = { ...req.body };
  if (payload.estado === "resuelta" && !payload.fecha_resolucion) {
    payload.fecha_resolucion = new Date().toISOString();
  }
  if (payload.estado && payload.estado !== "resuelta") {
    payload.fecha_resolucion = null;
  }
  const data = await model.updateQueja(req.params.id, payload);
  if (!data) return res.status(404).json(errorResponse("Queja no encontrada", "NOT_FOUND"));
  return res.json(successResponse(data, "Queja actualizada"));
}

async function remove(req, res) {
  const data = await model.removeQueja(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Queja no encontrada", "NOT_FOUND"));
  return res.json(successResponse(data, "Queja eliminada"));
}

async function sinResolver(_req, res) {
  const data = await model.listSinResolver();
  return res.json(successResponse(data, "Quejas sin resolver obtenidas"));
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  sinResolver
};
