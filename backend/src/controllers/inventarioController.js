const model = require("../models/inventarioModel");
const { successResponse, errorResponse } = require("../utils/response");

async function getAll(req, res) {
  const data = await model.listInventario(req.query);
  return res.json(successResponse(data, "Inventario obtenido"));
}

async function getById(req, res) {
  const data = await model.getInventarioById(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Inventario no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Inventario obtenido"));
}

async function create(req, res) {
  const data = await model.createInventario(req.body);
  return res.status(201).json(successResponse(data, "Inventario creado"));
}

async function update(req, res) {
  const data = await model.updateInventario(req.params.id, req.body);
  if (!data) return res.status(404).json(errorResponse("Inventario no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Inventario actualizado"));
}

async function remove(req, res) {
  const data = await model.removeInventario(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Inventario no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Inventario eliminado"));
}

async function getMovimientos(req, res) {
  const data = await model.listMovimientos(req.query.inventario_id);
  return res.json(successResponse(data, "Movimientos obtenidos"));
}

async function createMovimiento(req, res) {
  const payload = {
    ...req.body,
    creado_por: req.user?.sub || null
  };
  const data = await model.createMovimiento(payload);
  return res.status(201).json(successResponse(data, "Movimiento registrado"));
}

async function getBajoStock(_req, res) {
  const data = await model.listBajoStock();
  return res.json(successResponse(data, "Productos bajo stock obtenidos"));
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getMovimientos,
  createMovimiento,
  getBajoStock
};
