import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CarrinhoItem({
  item,
  index,
  onAlterarQuantidade,
  onRemover,
}) {
  return (
    <div
      className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center transition-all duration-300 hover:bg-white/15 border border-white/10"
      style={{
        animation: `slideIn 0.4s ease-out ${index * 0.1}s backwards`,
      }}
    >
      <div className="flex-1">
        <div className="font-bold text-white text-lg mb-1">{item.nome}</div>
        <div className="text-sm">
          R$ {item.preco.toFixed(2)} × {item.quantidade} =
          <span className="font-bold ml-1">R$ {item.subtotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onAlterarQuantidade(item.codigo, -1)}
          className="bg-[var(--cor-fundo)] text-white hover:text-[var(--cor-fundo)]  w-9 h-9 rounded-lg hover:bg-[var(--cor-fundo)]/70 transition-colors flex items-center justify-center cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="font-bold text-xl w-10 text-center text-[var(--cor-texto)]">
          {item.quantidade}
        </span>
        <button
          onClick={() => onAlterarQuantidade(item.codigo, 1)}
          className="bg-[var(--cor-fundo)] text-white w-9 h-9 rounded-lg hover:text-[var(--cor-fundo)] hover:bg-[var(--cor-fundo)]/70 transition-colors flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => onRemover(item.codigo)}
          className="bg-[var(--cor-fundo)] text-white w-9 h-9 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center ml-2 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
