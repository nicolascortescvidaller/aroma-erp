import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { AppLayout } from "./layouts/AppLayout";
import { ClientesPage } from "./pages/ClientesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { InventarioPage } from "./pages/InventarioPage";
import { LeadsPage } from "./pages/LeadsPage";
import { LoginPage } from "./pages/LoginPage";
import { OperacionesPage } from "./pages/OperacionesPage";
import { QuejasPage } from "./pages/QuejasPage";
import { ReportesPage } from "./pages/ReportesPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="operaciones" element={<OperacionesPage />} />
        <Route path="inventario" element={<InventarioPage />} />
        <Route path="quejas" element={<QuejasPage />} />
        <Route path="reportes" element={<ReportesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
