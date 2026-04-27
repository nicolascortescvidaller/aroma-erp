import { useState } from "react";
import { DataTable } from "../components/DataTable";
import { PageTitle } from "../components/PageTitle";
import { useFetch } from "../hooks/useFetch";
import api from "../services/api";
import type { Inventario } from "../types";
import { getErrorMessage } from "../utils/http";

interface Movimiento {
  id: string;
  inventario_id: string;
  tipo: "entrada" | "salida";
  origen: string;
  cantidad: number;
  costo_unitario: number;
  fecha: string;
}

interface BajoStock {
  producto_id: string;
  codigo: string;
  nombre: string;
  cantidad_minima: number;
  cantidad_actual: number;
  cantidad_faltante: number;
}

export function InventarioPage() {
  const { data, loading } = useFetch<Inventario[]>("/inventario");
  const { data: bajoStock, refetch } = useFetch<BajoStock[]>("/inventario/bajo-stock");
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function cargarMovimientos() {
    try {
      const response = await api.get("/inventario/movimientos");
      setMovimientos(response.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err, "No se pudieron obtener movimientos"));
    }
  }

  return (
    <div className="space-y-4">
      <PageTitle
        title="Inventario"
        subtitle="Stock de fragancias y movimientos"
        actions={
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={cargarMovimientos}>
              Ver movimientos
            </button>
            <button className="btn-secondary" onClick={refetch}>
              Refrescar bajo stock
            </button>
          </div>
        }
      />

      {loading ? <p className="text-sm text-slate-500">Cargando inventario...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <DataTable
        rows={data ?? []}
        rowKey={(row) => row.id}
        searchableKeys={["producto_id", "ubicacion"]}
        columns={[
          { key: "producto_id", title: "Producto" },
          { key: "cantidad_actual", title: "Cantidad" },
          { key: "ubicacion", title: "Ubicacion" },
          {
            key: "valor_total",
            title: "Valor Total",
            render: (row) => `$ ${Number(row.valor_total || 0).toLocaleString("es-CO")}`
          }
        ]}
      />

      <h2 className="text-lg font-semibold">Bajo stock</h2>
      <DataTable
        rows={bajoStock ?? []}
        rowKey={(row) => row.producto_id}
        searchableKeys={["codigo", "nombre"]}
        columns={[
          { key: "codigo", title: "Codigo" },
          { key: "nombre", title: "Nombre" },
          { key: "cantidad_actual", title: "Actual" },
          { key: "cantidad_minima", title: "Minimo" },
          { key: "cantidad_faltante", title: "Faltante" }
        ]}
      />

      {movimientos.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold">Movimientos recientes</h2>
          <DataTable
            rows={movimientos}
            rowKey={(row) => row.id}
            searchableKeys={["tipo", "origen", "inventario_id"]}
            columns={[
              { key: "inventario_id", title: "Inventario" },
              { key: "tipo", title: "Tipo" },
              { key: "origen", title: "Origen" },
              { key: "cantidad", title: "Cantidad" },
              { key: "fecha", title: "Fecha" }
            ]}
          />
        </>
      ) : null}
    </div>
  );
}
