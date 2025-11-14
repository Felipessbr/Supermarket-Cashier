import React from "react";
import { Receipt } from "lucide-react";

export default function ModalCupomFiscal({ mostrar, cupomData, onNovaVenda }) {
  if (!mostrar || !cupomData) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--cor-fundo)] flex items-center gap-2">
            <Receipt className="w-6 h-6 text-[var(--cor-fundo)]" />
            Cupom Fiscal
          </h2>
        </div>

        <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl font-mono text-sm bg-gray-50">
          <div className="text-center mb-4 pb-4 border-b-2 border-gray-300">
            <div className="text-xl font-bold">SUPERMERCADO XPTO</div>
            <div className="text-xs text-gray-600 mt-1">
              CNPJ: 12.345.678/0001-90
            </div>
            <div className="text-xs text-gray-600">
              Rua das Flores, 123 - Centro
            </div>
            <div className="text-xs text-gray-600 mt-2">{cupomData.data}</div>
            {cupomData.cpf && (
              <div className="text-xs text-gray-600">CPF: {cupomData.cpf}</div>
            )}
          </div>

          {cupomData.itens.map((item, idx) => (
            <div key={idx} className="mb-3 pb-2 border-b border-gray-200">
              <div className="font-bold">{item.nome}</div>
              <div className="text-gray-600">
                {item.quantidade} × R$ {item.preco.toFixed(2)} = R${" "}
                {item.subtotal.toFixed(2)}
              </div>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t-2 border-gray-300 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>R$ {cupomData.subtotal.toFixed(2)}</span>
            </div>
            {cupomData.desconto > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Desconto:</span>
                <span>-R$ {cupomData.desconto.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300">
              <span>TOTAL:</span>
              <span>R$ {cupomData.total.toFixed(2)}</span>
            </div>
            {cupomData.formaPagamento === "cartao" &&
              cupomData.dadosPagamento.tipoCartao === "credito" &&
              cupomData.dadosPagamento.parcelas > 1 && (
                <div className="flex justify-between">
                  <span>Parcelas:</span>
                  <span>
                    {cupomData.dadosPagamento.parcelas}x R${" "}
                    {(
                      cupomData.total / cupomData.dadosPagamento.parcelas
                    ).toFixed(2)}
                  </span>
                </div>
              )}
            {cupomData.troco > 0 && (
              <div className="flex justify-between">
                <span>Troco:</span>
                <span>R$ {cupomData.troco.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="text-center mt-4 pt-4 border-t-2 border-gray-300 font-bold">
            OBRIGADO E VOLTE SEMPRE!
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-200 text-[var(--cor-fundo)] py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Receipt className="w-5 h-5" />
            Imprimir
          </button>
          <button
            onClick={onNovaVenda}
            className="flex-1 
    bg-[var(--cor-fundo)] 
    text-white 
    py-3 
    rounded-xl 
    font-bold 
    transition-all 
    duration-300 
    cursor-pointer
    hover:bg-[#1a0e22]"
          >
            Nova Venda
          </button>
        </div>
      </div>
    </div>
  );
}
