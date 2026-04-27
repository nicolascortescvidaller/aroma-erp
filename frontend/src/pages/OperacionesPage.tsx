import { useState } from "react";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { PageTitle } from "../components/PageTitle";
import { useFetch } from "../hooks/useFetch";
import api from "../services/api";
import type { Mantenimiento } from "../types";
import { getErrorMessage } from "../utils/http";

interface AlertaRow {
  maquina_id: string;
  cliente: string;
  serial: string;
  modelo: string;
  dias_sin_mantenimiento: number;
}

export function OperacionesPage() {
  const { data, loading, refetch } = useFetch<Mantenimiento[]>("/mantenimientos");
  const [alertas, setAlertas] = useState<AlertaRow[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadAlertas() {
    try {
      const response = await api.post("/mantenimientos/alertas");
      setAlertas(response.data.data.maquinas || []);
    } catch (err) {
      setError(getErrorMessage(err, "No se pudieron cargar alertas"));
    }
  }

  return (
    <div className="space-y-4">
      <PageTitle
        title="Operaciones"
        subtitle="Mantenimientos y alertas de visita"
        actions={
          <div className="flex gap-2">
            <button
              className="btn-secondary"
              onClick={async () => {
                await loadAlertas();
                setOpen(true);
              }}
            >
              Ver alertas 30+ dias
            </button>
            <button className="btn-secondary" onClick={refetch}>
              Actualizar
            </button>
          </div>
        }
      />

      {loading ? <p className="text-sm text-slate-500">Cargando mantenimientos...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <DataTable
        rows={data ?? []}
        rowKey={(row) => row.id}
        searchableKeys={["tipo", "cliente_id", "maquina_id", "tecnico_id"]}
        columns={[
          { key: "tipo", title: "Tipo" },
          { key: "cliente_id", title: "Cliente" },
          { key: "maquina_id", title: "Maquina" },
          { key: "fecha_programada", title: "Programada" },
          { key: "fecha_ejecutada", title: "Ejecutada" },
          { key: "tecnico_id", title: "Tecnico" }
        ]}
      />

      <Modal open={open} onClose={() => setOpen(false)} title="Alertas de maquinas sin mantenimiento">
        <DataTable
          rows={alertas}
          rowKey={(row) => row.maquina_id}
          searchableKeys={["cliente", "serial", "modelo"]}
          columns={[
            { key: "cliente", title: "Cliente" },
            { key: "serial", title: "Serial" },
            { key: "modelo", title: "Modelo" },
            { key: "dias_sin_mantenimiento", title: "Dias sin mantenimiento" }
          ]}
        />
      </Modal>
    </div>
  );
}
