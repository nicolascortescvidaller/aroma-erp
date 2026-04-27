import { useMemo } from "react";
import { Chart } from "../components/Chart";
import { DataTable } from "../components/DataTable";
import { PageTitle } from "../components/PageTitle";
import { useFetch } from "../hooks/useFetch";
import type { ChartPoint, Lead } from "../types";

type PipelineResponse = {
  total: number;
  resumen: Array<{ etapa: string; cantidad: number; monto_total: number }>;
  leads: Lead[];
};

export function LeadsPage() {
  const { data, loading } = useFetch<PipelineResponse>("/leads/pipeline");

  const chartData = useMemo<ChartPoint[]>(
    () =>
      (data?.resumen || []).map((item) => ({
        name: item.etapa,
        value: item.cantidad
      })),
    [data]
  );

  return (
    <div className="space-y-4">
      <PageTitle title="CRM Leads" subtitle="Pipeline visual por etapa" />

      {loading ? <p className="text-sm text-slate-500">Cargando pipeline...</p> : null}

      <Chart data={chartData} title="Leads por etapa" />

      <DataTable
        rows={data?.leads || []}
        rowKey={(row) => row.id}
        searchableKeys={["nombre", "empresa", "email", "etapa"]}
        columns={[
          { key: "nombre", title: "Nombre" },
          { key: "empresa", title: "Empresa" },
          { key: "email", title: "Email" },
          { key: "etapa", title: "Etapa" },
          {
            key: "monto_esperado",
            title: "Monto",
            render: (row) => `$ ${Number(row.monto_esperado || 0).toLocaleString("es-CO")}`
          }
        ]}
      />
    </div>
  );
}
