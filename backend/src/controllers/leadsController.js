const model = require("../models/leadsModel");
const { successResponse, errorResponse } = require("../utils/response");

async function getAll(req, res) {
  const data = await model.listLeads(req.query);
  return res.json(successResponse(data, "Leads obtenidos"));
}

async function getById(req, res) {
  const data = await model.getLeadById(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Lead no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Lead obtenido"));
}

async function create(req, res) {
  const data = await model.createLead(req.body);
  return res.status(201).json(successResponse(data, "Lead creado"));
}

async function update(req, res) {
  const data = await model.updateLead(req.params.id, req.body);
  if (!data) return res.status(404).json(errorResponse("Lead no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Lead actualizado"));
}

async function remove(req, res) {
  const data = await model.removeLead(req.params.id);
  if (!data) return res.status(404).json(errorResponse("Lead no encontrado", "NOT_FOUND"));
  return res.json(successResponse(data, "Lead eliminado"));
}

async function pipeline(req, res) {
  const leads = await model.getPipeline(req.query.vendedor_id);
  const etapas = ["lead", "cotizacion", "ganado", "perdido"];

  const resumen = etapas.map((etapa) => {
    const items = leads.filter((item) => item.etapa === etapa);
    const monto_total = items.reduce((acc, item) => acc + Number(item.monto_esperado || 0), 0);
    return { etapa, cantidad: items.length, monto_total };
  });

  return res.json(
    successResponse(
      {
        total: leads.length,
        resumen,
        leads
      },
      "Pipeline obtenido"
    )
  );
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  pipeline
};
