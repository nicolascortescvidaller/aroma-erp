const { selectMany } = require("../services/supabase");

async function reporteOperaciones() {
  const mantenimientos = await selectMany("mantenimientos", {
    orderBy: { column: "fecha_programada", ascending: false }
  });

  const resumenPorTecnico = {};
  mantenimientos.forEach((item) => {
    const tecnico = item.tecnico_id || "sin_asignar";
    if (!resumenPorTecnico[tecnico]) {
      resumenPorTecnico[tecnico] = {
        tecnico_id: tecnico,
        mantenimientos: 0,
        horas_trabajadas: 0
      };
    }
    resumenPorTecnico[tecnico].mantenimientos += 1;
    resumenPorTecnico[tecnico].horas_trabajadas += Number(item.horas_trabajadas || 0);
  });

  return {
    total_mantenimientos: mantenimientos.length,
    resumen_por_tecnico: Object.values(resumenPorTecnico)
  };
}

async function reporteQuejas() {
  const quejas = await selectMany("quejas_reclamos");
  const resumen = { abierta: 0, en_progreso: 0, resuelta: 0 };
  quejas.forEach((q) => {
    if (resumen[q.estado] !== undefined) resumen[q.estado] += 1;
  });
  return { total: quejas.length, resumen };
}

async function reporteStock() {
  const bajoStock = await selectMany("vw_inventario_bajo_minimo");
  const inventario = await selectMany("inventario");
  const valor_total = inventario.reduce((acc, item) => acc + Number(item.valor_total || 0), 0);
  return {
    total_items_inventario: inventario.length,
    valor_total,
    bajo_stock: bajoStock
  };
}

async function reporteMaquinas() {
  const maquinas = await selectMany("maquinas");
  const resumen = { activa: 0, inactiva: 0, en_mantenimiento: 0 };
  maquinas.forEach((m) => {
    if (resumen[m.estado] !== undefined) resumen[m.estado] += 1;
  });
  return { total: maquinas.length, resumen };
}

async function reporteClientesRiesgo() {
  return selectMany("vw_clientes_en_riesgo", {
    orderBy: { column: "dias_sin_mantenimiento", ascending: false }
  });
}

async function dashboardGeneral() {
  const [maquinas, bajoStock, quejasPendientes, clientesRiesgo] = await Promise.all([
    selectMany("maquinas"),
    selectMany("vw_inventario_bajo_minimo"),
    selectMany("quejas_reclamos", {
      filters: [{ column: "estado", op: "in", value: ["abierta", "en_progreso"] }]
    }),
    selectMany("vw_clientes_en_riesgo")
  ]);

  return {
    maquinas_activas: maquinas.filter((m) => m.estado === "activa").length,
    stock_alertas: bajoStock.length,
    quejas_pendientes: quejasPendientes.length,
    clientes_riesgo: clientesRiesgo.length
  };
}

module.exports = {
  reporteOperaciones,
  reporteQuejas,
  reporteStock,
  reporteMaquinas,
  reporteClientesRiesgo,
  dashboardGeneral
};
