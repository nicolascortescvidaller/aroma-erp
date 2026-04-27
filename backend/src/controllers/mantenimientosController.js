const model = require("../models/mantenimientosModel");
const { generarResumenIA } = require("../services/claude");
const { successResponse, errorResponse } = require("../utils/response");

async function getAll(req, res) {
  const data = await model.listMantenimientos(req.query);
  return res.json(successResponse(data, "Mantenimientos obtenidos"));
}

async function getById(req, res) {
  const data = await model.getMantenimientoById(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Mantenimiento no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Mantenimiento obtenido"));
}

async function create(req, res) {
  const data = await model.createMantenimiento(req.body);
  return res.status(201).json(successResponse(data, "Mantenimiento creado"));
}

async function update(req, res) {
  const data = await model.updateMantenimiento(req.params.id, req.body);
  if (!data) return res.status(404).json(errorResponse("Mantenimiento no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Mantenimiento actualizado"));
}

async function remove(req, res) {
  const data = await model.removeMantenimiento(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Mantenimiento no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Mantenimiento eliminado"));
}

async function alertas(req, res) {
  const maquinas = await model.maquinasSinMantenimiento30Dias();
  const resumenIA = await generarResumenIA({
    total: maquinas.length,
    maquinas: maquinas.slice(0, 20)
  });

  return res.json(
    successResponse(
      {
        maquinas,
        analisis_ia: resumenIA
      },
      "Alertas de maquinas sin mantenimiento generadas"
    )
  );
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  alertas
};
