// src/routes/Routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardVendas from '../pages/DashboardVendas';
import Analytics from '../pages/Analytics';
import GestaoEstoque from '../pages/GestaoEstoque';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota Principal - Dashboard de Vendas */}
      <Route path="/" element={<DashboardVendas />} />
      
      {/* Rota de Analytics */}
      <Route path="/analytics" element={<Analytics />} />
      
      {/* Rota de Gestão de Estoque */}
      <Route path="/estoque" element={<GestaoEstoque />} />
      
      {/* Rota 404 - Página não encontrada */}
      <Route path="/404" element={<NotFound />} />
      
      {/* Redirecionar qualquer rota não encontrada para 404 */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}