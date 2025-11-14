import React from "react";
import { ShoppingCart, DollarSign } from "lucide-react";
import CarrinhoItem from "./CarrinhoItem";

export default function Carrinho({
  carrinho,
  total,
  onAlterarQuantidade,
  onRemover,
  onFinalizar,
}) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
        <div className="bg-[var(--cor-fundo)] p-2 rounded-lg">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        Carrinho de Compras
        {carrinho.length > 0 && (
          <span className="bg-[var(--cor-fundo)] text-white text-sm font-bold px-3 py-1 rounded-lg">
            {carrinho.length}
          </span>
        )}
      </h2>

      {carrinho.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="w-24 h-24 mx-auto mb-4 text-white/30" />
          <p className="text-xl font-semibold text-white mb-2">
            Carrinho vazio
          </p>
          <p className="text-white/70">Adicione produtos para começar</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 max-h-[350px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
            {carrinho.map((item, index) => (
              <CarrinhoItem
                key={item.codigo}
                item={item}
                index={index}
                onAlterarQuantidade={onAlterarQuantidade}
                onRemover={onRemover}
              />
            ))}
          </div>

          <div className="border-t-2 border-white/20 pt-5 space-y-4">
            <div className="flex justify-between text-lg text-white">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold text-[var(--cor-texto)]">
                R$ {total.toFixed(2)}
              </span>
            </div>
            <div className="bg-[var(--cor-fundo)] backdrop-blur-sm p-4 rounded-xl border border-[var(--cor-texto)]/30">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">TOTAL:</span>
                <span className="text-3xl font-bold text-[var(--cor-texto)]">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={onFinalizar}
              className="
    w-full 
    text-white 
    py-4 
    rounded-xl 
    font-bold 
    text-lg 
    flex 
    items-center 
    justify-center 
    gap-3 
    cursor-pointer
    transition-all 
    duration-300 
    bg-[#4f3e50]
    shadow-[0_4px_15px_rgba(0,0,0,0.4)]
    hover:shadow-[0_6px_25px_rgba(0,0,0,0.6)]
    hover:scale-[1.03]
    active:scale-[0.97]
    active:shadow-[0_3px_10px_rgba(0,0,0,0.4)]
    animate-[fadeIn_0.6s_ease-out]
  "
            >
              <DollarSign className="w-6 h-6" />
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}
