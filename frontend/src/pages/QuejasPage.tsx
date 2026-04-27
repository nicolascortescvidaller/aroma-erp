import { useState } from "react";
import { useForm } from "react-hook-form";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { PageTitle } from "../components/PageTitle";
import { useFetch } from "../hooks/useFetch";
import api from "../services/api";
import type { Queja } from "../types";
import { getErrorMessage } from "../utils/http";

type QuejaForm = {
  cliente_id: string;
  descripcion: string;
  categoria: Queja["categoria"];
  estado: Queja["estado"];
  responsable_id: string;
};

const initial: QuejaForm = {
  cliente_id: "",
  descripcion: "",
  categoria: "producto",
  estado: "abierta",
  responsable_id: ""
};

export function QuejasPage() {
  const { data, loading, refetch } = useFetch<Queja[]>("/quejas");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<QuejaForm>({ defaultValues: initial });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    try {
      await api.post("/quejas", values);
      reset(initial);
      setOpen(false);
      await refetch();
    } catch (err) {
      setError(getErrorMessage(err, "No se pudo registrar la queja"));
    }
  });

  return (
    <div>
      <PageTitle
        title="Quejas"
        subtitle="Gestion de casos y estados"
        actions={<button className="btn-primary" onClick={() => setOpen(true)}>Nueva queja</button>}
      />

      {loading ? <p className="text-sm text-slate-500">Cargando quejas...</p> : null}

      <DataTable
        rows={data ?? []}
        rowKey={(row) => row.id}
        searchableKeys={["descripcion", "estado", "categoria", "cliente_id"]}
        columns={[
          { key: "cliente_id", title: "Cliente" },
          { key: "categoria", title: "Categoria" },
          { key: "estado", title: "Estado" },
          { key: "descripcion", title: "Descripcion" },
          { key: "fecha_creacion", title: "Fecha" }
        ]}
      />

      <Modal open={open} onClose={() => setOpen(false)} title="Registrar queja">
        <form className="space-y-3" onSubmit={onSubmit}>
          <input className="input" placeholder="Cliente ID" {...register("cliente_id", { required: true })} />
          <textarea className="input" rows={4} placeholder="Descripcion" {...register("descripcion", { required: true })} />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <select className="input" {...register("categoria")}>
              <option value="producto">Producto</option>
              <option value="servicio">Servicio</option>
              <option value="entrega">Entrega</option>
              <option value="otro">Otro</option>
            </select>
            <select className="input" {...register("estado")}>
              <option value="abierta">Abierta</option>
              <option value="en_progreso">En progreso</option>
              <option value="resuelta">Resuelta</option>
            </select>
          </div>
          <input className="input" placeholder="Responsable ID" {...register("responsable_id")} />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="flex justify-end">
            <button className="btn-primary" type="submit">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
