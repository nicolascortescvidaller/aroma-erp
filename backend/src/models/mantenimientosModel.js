const {
  selectMany,
  selectOneById,
  insertOne,
  updateOne,
  deleteOne
} = require("../services/supabase");

function listMantenimientos(filters = {}) {
  const queryFilters = [];
  if (filters.maquina_id) queryFilters.push({ column: "maquina_id", value: filters.maquina_id });
  if (filters.tecnico_id) queryFilters.push({ column: "tecnico_id", value: filters.tecnico_id });
  if (filters.cliente_id) queryFilters.push({ column: "cliente_id", value: filters.cliente_id });
  if (filters.tipo) queryFilters.push({ column: "tipo", value: filters.tipo });
  if (filters.fecha_desde) queryFilters.push({ column: "fecha_programada", op: "gte", value: filters.fecha_desde });
  if (filters.fecha_hasta) queryFilters.push({ column: "fecha_programada", op: "lte", value: filters.fecha_hasta });

  return selectMany("mantenimientos", {
    filters: queryFilters,
    orderBy: { column: "fecha_programada", ascending: false }
  });
}

function getMantenimientoById(id) {
  return selectOneById("mantenimientos", id);
}

function createMantenimiento(payload) {
  return insertOne("mantenimientos", payload);
}

function updateMantenimiento(id, payload) {
  return updateOne("mantenimientos", id, payload);
}

function removeMantenimiento(id) {
  return deleteOne("mantenimientos", id);
}

function maquinasSinMantenimiento30Dias() {
  return selectMany("vw_maquinas_sin_mantenimiento_30_dias", {
    orderBy: { column: "dias_sin_mantenimiento", ascending: false }
  });
}

module.exports = {
  listMantenimientos,
  getMantenimientoById,
  createMantenimiento,
  updateMantenimiento,
  removeMantenimiento,
  maquinasSinMantenimiento30Dias
};
