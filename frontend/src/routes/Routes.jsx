import { Routes, Route, Navigate } from "react-router-dom";
import DashboardVendas from "../pages/DashboardVendas";
import Analytics from "../pages/Analytics";
import GestaoEstoque from "../pages/GestaoEstoque";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Redireciona raiz para login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard protegido */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardVendas />
          </PrivateRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        }
      />

      <Route
        path="/estoque"
        element={
          <PrivateRoute>
            <GestaoEstoque />
          </PrivateRoute>
        }
      />

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />

    </Routes>
  );
}