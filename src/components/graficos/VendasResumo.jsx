// src/components/graficos/VendasResumo.jsx
import React from "react";

export default function VendasResumo({ vendasHistorico = [] }) {
  const totalTransacoes = vendasHistorico.length;
  const totalFaturado = vendasHistorico.reduce((s, v) => s + Number(v.total || 0), 0);
  const ticketMedio = totalTransacoes ? totalFaturado / totalTransacoes : 0;

  return (
    <div>
      <p className="text-sm text-gray-300">Total faturado</p>
      <p className="text-2xl font-bold">R$ {totalFaturado.toFixed(2)}</p>

      <div className="mt-4">
        <p className="text-sm text-gray-300">Transações</p>
        <p className="text-xl">{totalTransacoes}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-300">Ticket médio</p>
        <p className="text-xl">R$ {ticketMedio.toFixed(2)}</p>
      </div>
    </div>
  );
}
