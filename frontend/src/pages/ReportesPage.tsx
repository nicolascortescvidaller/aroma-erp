import { Chart } from "../components/Chart";
import { PageTitle } from "../components/PageTitle";
import { useFetch } from "../hooks/useFetch";
import type { ChartPoint } from "../types";

interface OperacionesReport {
  total_mantenimientos: number;
  resumen_por_tecnico: Array<{ tecnico_id: string; mantenimientos: number; horas_trabajadas: number }>;
}

interface QuejasReport {
  total: number;
  resumen: Record<string, number>;
}

interface StockReport {
  total_items_inventario: number;
  valor_total: number;
  bajo_stock: Array<{ nombre: string; cantidad_faltante: number }>;
}

interface MaquinasReport {
  total: number;
  resumen: Record<string, number>;
}

export function ReportesPage() {
  const { data: operaciones } = useFetch<OperacionesReport>("/reportes/operaciones");
  const { data: quejas } = useFetch<QuejasReport>("/reportes/quejas");
  const { data: stock } = useFetch<StockReport>("/reportes/stock");
  const { data: maquinas } = useFetch<MaquinasReport>("/reportes/maquinas");
  const { data: clientesRiesgo } = useFetch<Array<{ cliente_id: string; nombre: string; dias_sin_mantenimiento: number }>>(
    "/reportes/clientes-riesgo"
  );

  const operacionesData: ChartPoint[] =
    operaciones?.resumen_por_tecnico.map((item) => ({
      name: item.tecnico_id,
      value: item.mantenimientos
    })) || [];

  const quejasData: ChartPoint[] = Object.entries(quejas?.resumen || {}).map(([name, value]) => ({
    name,
    value
  }));

  const maquinasData: ChartPoint[] = Object.entries(maquinas?.resumen || {}).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-4">
      <PageTitle title="Reportes" subtitle="Top 5 reportes criticos" />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Chart data={operacionesData} title="Operaciones por tecnico" />
        <Chart data={quejasData} title="Estado de quejas" />
        <Chart data={maquinasData} title="Estado de maquinas" />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-600">Stock valorizado</h3>
          <p className="mt-3 text-2xl font-bold">$ {Number(stock?.valor_total || 0).toLocaleString("es-CO")}</p>
          <p className="mt-1 text-sm text-slate-500">Items inventario: {stock?.total_items_inventario || 0}</p>
          <p className="mt-1 text-sm text-slate-500">Bajo stock: {stock?.bajo_stock?.length || 0}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-slate-600">Clientes en riesgo</h3>
        <ul className="space-y-1 text-sm">
          {(clientesRiesgo || []).slice(0, 20).map((item) => (
            <li key={item.cliente_id} className="flex justify-between border-b border-slate-100 py-1">
              <span>{item.nombre}</span>
              <span className="text-slate-500">{item.dias_sin_mantenimiento} dias</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
