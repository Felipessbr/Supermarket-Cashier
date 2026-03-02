// src/components/graficos/ProdutosVendidos.jsx
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ProdutosVendidos({ vendasHistorico = [], produtos = {} }) {
  const data = useMemo(() => {
    const contador = {};

    vendasHistorico.forEach((v) => {
      (v.itens || []).forEach((i) => {
        const name = i.nome || produtos[i.codigo]?.nome || i.codigo;
        contador[name] = (contador[name] || 0) + (i.quantidade || 0);
      });
    });

    return Object.entries(contador)
      .map(([name, qtd]) => ({ name, qtd }))
      .sort((a, b) => b.qtd - a.qtd)
      .slice(0, 6);
  }, [vendasHistorico, produtos]);

  const gradientColors = ["#7C3AED", "#9F7AEA", "#A78BFA", "#C4B5FD"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        barCategoryGap="20%"
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#9F7AEA" />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" opacity={0.2}  />
        <XAxis type="number" stroke="#C4B5FD" tick={{ fill: "#C4B5FD" }} />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: "#E9D5FF", fontSize: 14 }}
          width={120}
          
        />
        <Tooltip
          contentStyle={{
            background: "#2A2033",
            border: "1px solid #3B2A45",
            borderRadius: "8px",
            color: "#EDE9FE",

          }}
        />
        <Bar
          dataKey="qtd"
          radius={[6, 6, 6, 6]}
          barSize={21}
          fill="url(#barGradient)"
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={gradientColors[index % gradientColors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
