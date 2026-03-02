import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsComponent from "../components/Analytics";
import { produtos as produtosIniciais } from "../data/produtos";
import { useVendas } from "../context/VendasContext";
import { ToastContainer } from "react-toastify";

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const { vendasHistorico } = useVendas(); // Pegar do contexto
  const [produtos] = useState(produtosIniciais);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navegação */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition cursor-pointer"
            >
              Dashboard
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-[var(--cor-fundo)] border border-white/30 text-white shadow-lg cursor-pointer"
            >
              Analytics
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate("/estoque")}
              className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition cursor-pointer"
            >
              Gestão de Estoque
            </button>
          </div>
        </div>

        {/* Mostrar quantidade de vendas carregadas */}
        <div className="mb-4 text-sm text-gray-400">
          📊 {vendasHistorico.length} venda(s) registrada(s)
        </div>

        <AnalyticsComponent 
          vendasHistorico={vendasHistorico} 
          produtos={produtos} 
        />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        theme="colored"
      />
    </div>
  );
}