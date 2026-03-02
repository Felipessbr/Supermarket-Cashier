import React from 'react';
import { Package } from 'lucide-react';

export default function ProdutosGrid({ produtos, onAdicionarProduto, animacaoAdd }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
        <div className="bg-[var(--cor-fundo)] p-2 rounded-lg">
          <Package className="w-6 h-6" />
        </div>
        Produtos Disponíveis
      </h2>
      
      <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {Object.entries(produtos).map(([codigo, produto]) => (
          <div
            key={codigo}
            onClick={() => onAdicionarProduto(codigo)}
            className={`bg-[var(--cor-fundo)] text-white p-5 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              animacaoAdd === codigo ? 'scale-95 ring-4' : ''
            }`}
          >
            <div className="text-xs text-[var(--cor-texto)] mb-2 font-medium">{produto.categoria}</div>
            <div className="font-bold text-base mb-3">{produto.nome}</div>
            <div className="text-2xl font-bold text-[var(--cor-texto)]">
             R$ {produto.preco.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}