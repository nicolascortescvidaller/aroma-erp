const {
  selectMany,
  selectOneById,
  insertOne,
  updateOne,
  deleteOne
} = require("../services/supabase");

function listQuejas(filters = {}) {
  const queryFilters = [];
  if (filters.cliente_id) queryFilters.push({ column: "cliente_id", value: filters.cliente_id });
  if (filters.estado) queryFilters.push({ column: "estado", value: filters.estado });
  if (filters.responsable_id) queryFilters.push({ column: "responsable_id", value: filters.responsable_id });

  return selectMany("quejas_reclamos", {
    filters: queryFilters,
    orderBy: { column: "fecha_creacion", ascending: false }
  });
}

function getQuejaById(id) {
  return selectOneById("quejas_reclamos", id);
}

function createQueja(payload) {
  return insertOne("quejas_reclamos", payload);
}

function updateQueja(id, payload) {
  return updateOne("quejas_reclamos", id, payload);
}

function removeQueja(id) {
  return deleteOne("quejas_reclamos", id);
}

function listSinResolver() {
  return selectMany("quejas_reclamos", {
    filters: [{ column: "estado", op: "in", value: ["abierta", "en_progreso"] }],
    orderBy: { column: "fecha_creacion", ascending: false }
  });
}

module.exports = {
  listQuejas,
  getQuejaById,
  createQueja,
  updateQueja,
  removeQueja,
  listSinResolver
};
