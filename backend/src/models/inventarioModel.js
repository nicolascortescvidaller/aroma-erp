const {
  selectMany,
  selectOneById,
  insertOne,
  updateOne,
  deleteOne
} = require("../services/supabase");

function listInventario(filters = {}) {
  const queryFilters = [];
  if (filters.producto_id) queryFilters.push({ column: "producto_id", value: filters.producto_id });
  if (filters.ubicacion) queryFilters.push({ column: "ubicacion", op: "ilike", value: `%${filters.ubicacion}%` });
  if (filters.cantidad_min) queryFilters.push({ column: "cantidad_actual", op: "gte", value: filters.cantidad_min });

  return selectMany("inventario", {
    filters: queryFilters,
    orderBy: { column: "actualizado_en", ascending: false }
  });
}

function getInventarioById(id) {
  return selectOneById("inventario", id);
}

function createInventario(payload) {
  return insertOne("inventario", payload);
}

function updateInventario(id, payload) {
  return updateOne("inventario", id, payload);
}

function removeInventario(id) {
  return deleteOne("inventario", id);
}

function listMovimientos(inventarioId) {
  const filters = inventarioId ? [{ column: "inventario_id", value: inventarioId }] : [];
  return selectMany("movimientos_inventario", {
    filters,
    orderBy: { column: "fecha", ascending: false }
  });
}

function createMovimiento(payload) {
  return insertOne("movimientos_inventario", payload);
}

function listBajoStock() {
  return selectMany("vw_inventario_bajo_minimo", {
    orderBy: { column: "cantidad_faltante", ascending: false }
  });
}

module.exports = {
  listInventario,
  getInventarioById,
  createInventario,
  updateInventario,
  removeInventario,
  listMovimientos,
  createMovimiento,
  listBajoStock
};
