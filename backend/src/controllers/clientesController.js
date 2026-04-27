const model = require("../models/clientesModel");
const { successResponse, errorResponse } = require("../utils/response");

async function getAll(req, res) {
  const data = await model.listClientes(req.query);
  return res.json(successResponse(data, "Clientes obtenidos"));
}

async function getById(req, res) {
  const data = await model.getClienteById(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Cliente no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Cliente obtenido"));
}

async function create(req, res) {
  const data = await model.createCliente(req.body);
  return res.status(201).json(successResponse(data, "Cliente creado"));
}

async function update(req, res) {
  const data = await model.updateCliente(req.params.id, req.body);
  if (!data) return res.status(404).json(errorResponse("Cliente no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Cliente actualizado"));
}

async function remove(req, res) {
  const data = await model.removeCliente(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Cliente no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Cliente eliminado"));
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
