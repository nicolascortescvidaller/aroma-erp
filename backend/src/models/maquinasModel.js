const {
  selectMany,
  selectOneById,
  insertOne,
  updateOne,
  deleteOne
} = require("../services/supabase");

function listMaquinas(filters = {}) {
  const queryFilters = [];
  if (filters.cliente_id) queryFilters.push({ column: "cliente_id", value: filters.cliente_id });
  if (filters.estado) queryFilters.push({ column: "estado", value: filters.estado });
  if (filters.serial) queryFilters.push({ column: "serial", op: "ilike", value: `%${filters.serial}%` });

  return selectMany("maquinas", {
    filters: queryFilters,
    orderBy: { column: "creado_en", ascending: false }
  });
}

function getMaquinaById(id) {
  return selectOneById("maquinas", id);
}

function createMaquina(payload) {
  return insertOne("maquinas", payload);
}

function updateMaquina(id, payload) {
  return updateOne("maquinas", id, payload);
}

function removeMaquina(id) {
  return deleteOne("maquinas", id);
}

module.exports = {
  listMaquinas,
  getMaquinaById,
  createMaquina,
  updateMaquina,
  removeMaquina
};
