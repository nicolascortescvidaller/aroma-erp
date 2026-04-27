import { useState } from "react";
import { useForm } from "react-hook-form";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { PageTitle } from "../components/PageTitle";
import { useFetch } from "../hooks/useFetch";
import api from "../services/api";
import type { Cliente } from "../types";
import { getErrorMessage } from "../utils/http";

type ClienteForm = {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  tipo: Cliente["tipo"];
  estado: Cliente["estado"];
  vendedor_id: string;
};

const initial: ClienteForm = {
  nombre: "",
  email: "",
  telefono: "",
  direccion: "",
  tipo: "restaurante",
  estado: "activo",
  vendedor_id: ""
};

export function ClientesPage() {
  const { data, loading, refetch } = useFetch<Cliente[]>("/clientes");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<ClienteForm>({ defaultValues: initial });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    try {
      await api.post("/clientes", values);
      setOpen(false);
      reset(initial);
      await refetch();
    } catch (err) {
      setError(getErrorMessage(err, "No se pudo crear el cliente"));
    }
  });

  return (
    <div>
      <PageTitle
        title="CRM Clientes"
        subtitle="Gestion de clientes y filtros comerciales"
        actions={<button className="btn-primary" onClick={() => setOpen(true)}>Nuevo cliente</button>}
      />

      {loading ? <p className="text-sm text-slate-500">Cargando clientes...</p> : null}

      <DataTable
        rows={data ?? []}
        rowKey={(row) => row.id}
        searchableKeys={["nombre", "email", "telefono", "estado", "tipo"]}
        columns={[
          { key: "nombre", title: "Nombre" },
          { key: "email", title: "Email" },
          { key: "telefono", title: "Telefono" },
          { key: "tipo", title: "Tipo" },
          { key: "estado", title: "Estado" },
          { key: "vendedor_id", title: "Vendedor" }
        ]}
      />

      <Modal open={open} onClose={() => setOpen(false)} title="Crear cliente">
        <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={onSubmit}>
          <input className="input" placeholder="Nombre" {...register("nombre", { required: true })} />
          <input className="input" placeholder="Email" {...register("email")} />
          <input className="input" placeholder="Telefono" {...register("telefono")} />
          <input className="input" placeholder="Direccion" {...register("direccion")} />
          <select className="input" {...register("tipo")}>
            <option value="restaurante">Restaurante</option>
            <option value="hotel">Hotel</option>
            <option value="oficina">Oficina</option>
            <option value="otro">Otro</option>
          </select>
          <select className="input" {...register("estado")}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="riesgo">Riesgo</option>
          </select>
          <input className="input md:col-span-2" placeholder="Vendedor ID" {...register("vendedor_id")} />
          {error ? <p className="md:col-span-2 text-sm text-red-600">{error}</p> : null}
          <div className="md:col-span-2 flex justify-end">
            <button className="btn-primary" type="submit">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
