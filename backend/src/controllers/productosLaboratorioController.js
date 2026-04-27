const model = require("../models/productosLaboratorioModel");
const { successResponse, errorResponse } = require("../utils/response");

async function getAll(req, res) {
  const data = await model.listProductos(req.query);
  return res.json(successResponse(data, "Productos obtenidos"));
}

async function getById(req, res) {
  const data = await model.getProductoById(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Producto no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Producto obtenido"));
}

async function create(req, res) {
  const data = await model.createProducto(req.body);
  return res.status(201).json(successResponse(data, "Producto creado"));
}

async function update(req, res) {
  const data = await model.updateProducto(req.params.id, req.body);
  if (!data) return res.status(404).json(errorResponse("Producto no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Producto actualizado"));
}

async function remove(req, res) {
  const data = await model.removeProducto(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Producto no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Producto eliminado"));
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
