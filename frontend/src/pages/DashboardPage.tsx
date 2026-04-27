import { Card } from "../components/Card";
import { PageTitle } from "../components/PageTitle";
import { useFetch } from "../hooks/useFetch";
import type { KPIData } from "../types";

export function DashboardPage() {
  const { data, loading, error, refetch } = useFetch<KPIData>("/dashboard");

  return (
    <div>
      <PageTitle
        title="Dashboard"
        subtitle="Vista general de operaciones"
        actions={
          <button className="btn-secondary" onClick={refetch}>
            Actualizar
          </button>
        }
      />

      {loading ? <p className="text-sm text-slate-500">Cargando KPIs...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Maquinas Activas" value={data?.maquinas_activas ?? 0} />
        <Card title="Alertas de Stock" value={data?.stock_alertas ?? 0} />
        <Card title="Quejas Pendientes" value={data?.quejas_pendientes ?? 0} />
        <Card title="Clientes Riesgo" value={data?.clientes_riesgo ?? 0} />
      </div>
    </div>
  );
}
