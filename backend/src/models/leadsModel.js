const {
  selectMany,
  selectOneById,
  insertOne,
  updateOne,
  deleteOne
} = require("../services/supabase");

function listLeads(filters = {}) {
  const queryFilters = [];
  if (filters.etapa) queryFilters.push({ column: "etapa", value: filters.etapa });
  if (filters.vendedor_id) queryFilters.push({ column: "vendedor_id", value: filters.vendedor_id });
  if (filters.nombre) queryFilters.push({ column: "nombre", op: "ilike", value: `%${filters.nombre}%` });

  return selectMany("leads", {
    filters: queryFilters,
    orderBy: { column: "fecha_creacion", ascending: false }
  });
}

function getLeadById(id) {
  return selectOneById("leads", id);
}

function createLead(payload) {
  return insertOne("leads", payload);
}

function updateLead(id, payload) {
  return updateOne("leads", id, payload);
}

function removeLead(id) {
  return deleteOne("leads", id);
}

function getPipeline(vendedorId) {
  const filters = vendedorId ? [{ column: "vendedor_id", value: vendedorId }] : [];
  return selectMany("leads", { filters });
}

module.exports = {
  listLeads,
  getLeadById,
  createLead,
  updateLead,
  removeLead,
  getPipeline
};
