import React from 'react';
import { TrendingUp, ShoppingCart, Package, Boxes } from 'lucide-react';

export default function Dashboard({ totalVendas, itensCarrinho, totalProdutos, onAbrirEstoque }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      {/* Card - Vendas Hoje */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="bg-[var(--cor-fundo)] p-4 rounded-xl">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-1">Vendas Hoje</p>
            <p className="text-3xl font-bold text-[var(--cor-texto)]">
              R$ {totalVendas.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Card - Itens no Carrinho */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="bg-[var(--cor-fundo)] p-4 rounded-xl">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-1">Itens no Carrinho</p>
            <p className="text-3xl font-bold text-[var(--cor-texto)]">{itensCarrinho}</p>
          </div>
        </div>
      </div>

      {/* Card - Total de Produtos */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="bg-[var(--cor-fundo)] p-4 rounded-xl">
            <Package className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-1">Produtos</p>
            <p className="text-3xl font-bold text-[var(--cor-texto)]">{totalProdutos}</p>
          </div>
        </div>
      </div>

      {/* Card - Botão Estoque */}
      <button
        onClick={onAbrirEstoque}
        className="bg-[var(--cor-fundo)] backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-[var(--cor-fundo-hover)] transition-all duration-300 flex items-center justify-center gap-4"
      >
        <Boxes className="w-8 h-8 text-white" />
        <p className="text-xl font-bold text-[var(--cor-texto)]">
          Gestão de Estoque
        </p>
      </button>

    </div>
  );
}
