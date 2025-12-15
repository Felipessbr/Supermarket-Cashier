// src/components/Analytics.jsx
import React from "react";
import VendasResumo from "./graficos/VendasResumo.jsx";
import VendasPorPeriodo from "./graficos/VendasPorPeriodo.jsx";
import ProdutosVendidos from "./graficos/ProdutosVendidos.jsx";
import MetodoPagamento from "./graficos/MetodoPagamento.jsx";

export default function Analytics({ vendasHistorico = [], produtos = {} }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/5 rounded-2xl p-4 shadow-md">
          <VendasResumo vendasHistorico={vendasHistorico} />
        </div>

        <div className="col-span-1 md:col-span-2 bg-white/5 rounded-2xl p-4 shadow-md">
          <h3 className="text-md font-medium mb-2">Vendas (últimos 7 dias)</h3>
          <div className="h-64">
            <VendasPorPeriodo vendasHistorico={vendasHistorico} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-2xl p-4 shadow-md">
          <h3 className="text-md font-medium mb-2">Produtos mais vendidos</h3>
          <div className="h-56">
            <ProdutosVendidos vendasHistorico={vendasHistorico} produtos={produtos} />
          </div>
        </div>

        <div className="">
          <div className="h-56">
            <MetodoPagamento vendasHistorico={vendasHistorico} />
          </div>
        </div>
      </div>
    </div>
  );
}
