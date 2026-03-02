import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#6C63FF", "#3AC6A6", "#5BC0EB", "#F7B801"];

export default function MetodoPagamento({ vendasHistorico = [] }) {
  const data = useMemo(() => {
    const contador = {};

    vendasHistorico.forEach((v) => {
      const tipo =
        v.formaPagamento ||
        (v.dadosPagamento && v.dadosPagamento.tipo) ||
        "outros";

      contador[tipo] = (contador[tipo] || 0) + 1;
    });

    return Object.entries(contador).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  }, [vendasHistorico]);

  return (
    <div className="bg-white/5 rounded-2xl  shadow-md">
      <h2 className="text-md font-medium mb-2 p-4">
        Métodos de Pagamento
      </h2>

      <div style={{ width: "100%", height: 226 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              cornerRadius={12}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#2A2033",
                border: "1px solid #3B2A45",
                borderRadius: "10px",
                color: "#EDE9FE",
              }}
              labelStyle={{
                color: "#EDE9FE",
                fontWeight: "bold",
              }}
              itemStyle={{
                color: "#EDE9FE",
              }}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}

              formatter={(value, name) => {
                return [value, name];
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                paddingTop: 20,
              }}
              formatter={(value) => (
                <span className="text-gray-200 text-sm">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
