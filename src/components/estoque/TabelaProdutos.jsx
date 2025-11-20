import React, { useState } from "react";
import {
  Edit,
  TrendingUp,
  TrendingDown,
  Search,
  AlertCircle,
} from "lucide-react";

export default function TabelaProdutos({ produtos, onEditar, onMovimentar }) {
  const [busca, setBusca] = useState("");

  //!FILTRAR PRODUTO PELA BUSCA
  const produtosFiltrados = Object.entries(produtos).filter(
    ([codigo, produto]) => {
      const termoBusca = busca.toLowerCase();
      return (
        produto.nome.toLowerCase().includes(termoBusca) ||
        codigo.includes(termoBusca) ||
        produto.categoria.toLowerCase().includes(termoBusca)
      );
    }
  );
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
      {/* BUSCA */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nome, código ou categoria..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-12 pr-3 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-blue-50 focus:outline-none"
          />
        </div>
      </div>

      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-2 border-white/20">
              <th className="text-left py-3 px-4 text-white font-bold">
                Código
              </th>
              <th className="text-left py-3 px-4 text-white font-bold">
                Produto
              </th>
              <th className="text-left py-3 px-4 text-white font-bold">
                Categoria
              </th>
              <th className="text-left py-3 px-4 text-white font-bold">
                Estoque
              </th>
              <th className="text-left py-3 px-4 text-white font-bold">Min.</th>
              <th className="text-left py-3 px-4 text-white font-bold">
                Preço
              </th>
              <th className="text-left py-3 px-4 text-white font-bold">
                Custo
              </th>
              <th className="text-left py-3 px-4 text-white font-bold">
                Status
              </th>
              <th className="text-left py-3 px-4 text-white font-bold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map(([codigo, produto]) => {
              const estoquePercentual =
                (produto.estoque / produto.estoqueMinimo) * 100;
              const statusEstoque =
                produto.estoque === 0
                  ? "sem-estoque"
                  : produto.estoque <= produto.estoqueMinimo * 0.5
                  ? "critico"
                  : produto.estoque <= produto.estoqueMinimo
                  ? "baixo"
                  : "ok";

              return (
                <tr
                  key={codigo}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 text-white font-mono">{codigo}</td>
                  <td className="py-4 px-4 text-white font-semibold">
                    {produto.nome}
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-white/10 backdrop-blur-lg rounded-2xl px-3 py-1  text-sm">
                      {produto.categoria}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-400">
                    <span
                      className={`font-bold text-lg
                      ${
                        statusEstoque === "sem-estoque"
                          ? "text-red-400"
                          : statusEstoque === "critico"
                          ? "text-orange-400"
                          : statusEstoque === "baixo"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {produto.estoque}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-400">
                    {produto.estoqueMinimo}
                  </td>
                  <td className="py-4 px-4 text-right text-white font-semibold">
                    {produto.preco.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-400">
                    {produto.custoUnitario.toFixed(2)}
                  </td>

                  <td className="py-4 px-4 text-center">
                    {statusEstoque === "sem-estoque" && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 justify-content">
                        <AlertCircle className="w-3 h-3" />
                        SEM ESTOQUE
                      </span>
                    )}
                    {statusEstoque === "critico" && (
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 justify-center">
                        <AlertCircle className="w-3 h-3" />
                        CRÍTICO
                      </span>
                    )}
                    {statusEstoque === "baixo" && (
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        BAIXO
                      </span>
                    )}
                    {statusEstoque === "ok" && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        OK
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEditar(codigo)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors cursor-pointer"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onMovimentar(codigo, "entrada")}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors cursor-pointer"
                        title="Entrada"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onMovimentar(codigo, "saida")}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors cursor-pointer"
                        title="Saída"
                      >
                        <TrendingDown className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {produtosFiltrados.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
