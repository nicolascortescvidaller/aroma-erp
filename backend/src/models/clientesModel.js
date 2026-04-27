const {
  selectMany,
  selectOneById,
  insertOne,
  updateOne,
  deleteOne
} = require("../services/supabase");

function listClientes(filters = {}) {
  const queryFilters = [];
  if (filters.vendedor_id) queryFilters.push({ column: "vendedor_id", value: filters.vendedor_id });
  if (filters.estado) queryFilters.push({ column: "estado", value: filters.estado });
  if (filters.tipo) queryFilters.push({ column: "tipo", value: filters.tipo });
  if (filters.nombre) queryFilters.push({ column: "nombre", op: "ilike", value: `%${filters.nombre}%` });

  return selectMany("clientes", {
    filters: queryFilters,
    orderBy: { column: "creado_en", ascending: false }
  });
}

function getClienteById(id) {
  return selectOneById("clientes", id);
}

function createCliente(payload) {
  return insertOne("clientes", payload);
}

function updateCliente(id, payload) {
  return updateOne("clientes", id, payload);
}

function removeCliente(id) {
  return deleteOne("clientes", id);
}

module.exports = {
  listClientes,
  getClienteById,
  createCliente,
  updateCliente,
  removeCliente
};
