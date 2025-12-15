// src/components/graficos/VendasPorPeriodo.jsx
import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays } from "date-fns";

function formatPtBR(date) {
  return format(date, "dd/MM");
}

export default function VendasPorPeriodo({ vendasHistorico = [] }) {
  const data = useMemo(() => {
    const dias = [];
    const hoje = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = subDays(hoje, i);
      const key = d.toISOString().slice(0, 10);
      dias.push({ key, label: formatPtBR(d), value: 0 });
    }

    vendasHistorico.forEach((v) => {
      const dia = (v.dataISO || "").slice(0, 10);
      const idx = dias.findIndex((d) => d.key === dia);
      if (idx >= 0) dias[idx].value += Number(v.total) || 0;
    });

    return dias.map((d) => ({ name: d.label, vendas: Number(d.value.toFixed(2)) }));
  }, [vendasHistorico]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`}
          contentStyle={{ backgroundColor: "#2A2033", borderRadius: "8px", border: "1px solid #3B2A45" }}
        />
        <Line type="monotone" dataKey="vendas" stroke="#8884d8" strokeWidth={3} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
