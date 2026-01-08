import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CarrinhoItem({
  item,
  index,
  onAlterarQuantidade,
  onRemover,
}) {
  const handleDiminuir = () => {
    if (onAlterarQuantidade) {
      onAlterarQuantidade(item.codigo, -1);
    }
  };

  const handleAumentar = () => {
    if (onAlterarQuantidade) {
      onAlterarQuantidade(item.codigo, 1);
    }
  };

  const handleRemover = () => {
    if (onRemover) {
      onRemover(item.codigo);
    }
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center transition-all duration-300 hover:bg-white/15 border border-white/10"
      style={{
        animation: `slideIn 0.4s ease-out ${index * 0.1}s backwards`,
      }}
    >
      <div className="flex-1">
        <h3 className="font-bold text-white text-lg mb-1">
          {item.nome}
        </h3>

        <p className="text-sm text-white/80">
          R$ {item.preco.toFixed(2)} × {item.quantidade} =
          <span className="font-bold ml-1 text-white">
            R$ {item.subtotal.toFixed(2)}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleDiminuir}
          className="bg-[var(--cor-fundo)] text-white w-9 h-9 rounded-lg hover:bg-[var(--cor-fundo)]/70 transition-colors flex items-center justify-center"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="font-bold text-xl w-10 text-center text-white">
          {item.quantidade}
        </span>

        <button
          onClick={handleAumentar}
          className="bg-[var(--cor-fundo)] text-white w-9 h-9 rounded-lg hover:bg-[var(--cor-fundo)]/70 transition-colors flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={handleRemover}
          className="bg-[var(--cor-fundo)] text-white w-9 h-9 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center ml-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
