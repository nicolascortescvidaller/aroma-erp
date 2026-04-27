const {
  selectMany,
  selectOneById,
  insertOne,
  updateOne,
  deleteOne
} = require("../services/supabase");

function listProductos(filters = {}) {
  const queryFilters = [];
  if (filters.nombre) queryFilters.push({ column: "nombre", op: "ilike", value: `%${filters.nombre}%` });
  if (filters.codigo) queryFilters.push({ column: "codigo", op: "ilike", value: `%${filters.codigo}%` });
  if (filters.activo !== undefined) queryFilters.push({ column: "activo", value: filters.activo });

  return selectMany("productos_laboratorio", {
    filters: queryFilters,
    orderBy: { column: "codigo", ascending: true }
  });
}

function getProductoById(id) {
  return selectOneById("productos_laboratorio", id);
}

function createProducto(payload) {
  return insertOne("productos_laboratorio", payload);
}

function updateProducto(id, payload) {
  return updateOne("productos_laboratorio", id, payload);
}

function removeProducto(id) {
  return deleteOne("productos_laboratorio", id);
}

module.exports = {
  listProductos,
  getProductoById,
  createProducto,
  updateProducto,
  removeProducto
};
