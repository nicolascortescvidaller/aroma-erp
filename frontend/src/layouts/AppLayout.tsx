import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const menu = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/clientes", label: "CRM Clientes" },
  { to: "/leads", label: "CRM Leads" },
  { to: "/operaciones", label: "Operaciones" },
  { to: "/inventario", label: "Inventario" },
  { to: "/quejas", label: "Quejas" },
  { to: "/reportes", label: "Reportes" }
];

export function AppLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function onLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white text-slate-800">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="text-lg font-semibold text-brand-blue">
            ERP Aroma Marketing
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full bg-slate-100 px-3 py-1">{user?.nombre}</span>
            <button
              onClick={onLogout}
              className="rounded-md bg-brand-terracotta px-3 py-1.5 font-medium text-white hover:opacity-90"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <nav className="space-y-1">
            {menu.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-brand-blue text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
