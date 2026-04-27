const model = require("../models/maquinasModel");
const { successResponse, errorResponse } = require("../utils/response");

async function getAll(req, res) {
  const data = await model.listMaquinas(req.query);
  return res.json(successResponse(data, "Maquinas obtenidas"));
}

async function getById(req, res) {
  const data = await model.getMaquinaById(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Maquina no encontrada", "NOT_FOUND"));
  return res.json(successResponse(data, "Maquina obtenida"));
}

async function create(req, res) {
  const data = await model.createMaquina(req.body);
  return res.status(201).json(successResponse(data, "Maquina creada"));
}

async function update(req, res) {
  const data = await model.updateMaquina(req.params.id, req.body);
  if (!data) return res.status(404).json(errorResponse("Maquina no encontrada", "NOT_FOUND"));
  return res.json(successResponse(data, "Maquina actualizada"));
}

async function remove(req, res) {
  const data = await model.removeMaquina(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Maquina no encontrada", "NOT_FOUND"));
  return res.json(successResponse(data, "Maquina eliminada"));
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
