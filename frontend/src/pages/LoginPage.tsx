import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    try {
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch {
      setError("No se pudo iniciar sesion. Verifica tus credenciales.");
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-brand-blue via-slate-800 to-brand-terracotta p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h1 className="text-2xl font-bold text-brand-ink">ERP Aroma</h1>
        <p className="mt-1 text-sm text-slate-500">Ingreso al sistema comercial y operativo</p>

        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              className="input"
              {...register("email", {
                required: "Email requerido",
                pattern: { value: /\S+@\S+\.\S+/, message: "Email invalido" }
              })}
            />
            {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              className="input"
              type="password"
              {...register("password", {
                required: "Password requerido",
                minLength: { value: 6, message: "Minimo 6 caracteres" }
              })}
            />
            {errors.password ? (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            ) : null}
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button className="btn-primary w-full" disabled={loading} type="submit">
            {loading ? "Ingresando..." : "Iniciar sesion"}
          </button>
        </form>
      </div>
    </div>
  );
}
