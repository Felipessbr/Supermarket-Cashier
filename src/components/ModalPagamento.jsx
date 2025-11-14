import React, { useState } from "react";
import {
  DollarSign,
  X,
  Banknote,
  CreditCard,
  Smartphone,
  AlertCircle,
} from "lucide-react";
import { InputMask } from "@react-input/mask";
import FormDinheiro from "./FormDinheiro";
import FormCartao from "./FormCartao";
import FormPix from "./FormPix";

export default function ModalPagamento({
  mostrar,
  onFechar,
  desconto,
  setDesconto,
  cpf,
  setCpf,
  formaPagamento,
  setFormaPagamento,
  totalSemDesconto,
  onConfirmar,
  valorPago,
  setValorPago,
  numeroCartao,
  setNumeroCartao,
  validadeCartao,
  setValidadeCartao,
  cvvCartao,
  setCvvCartao,
  nomeCartao,
  setNomeCartao,
  tipoCartao,
  setTipoCartao,
  parcelas,
  setParcelas,
  chavePix,
  setChavePix,
  tipoChavePix,
  setTipoChavePix,
  validarCamposCartao,
}) {
  const [erroCpf, setErroCpf] = useState(false);

  if (!mostrar) return null;

  // Cálculos em tempo real
  const valorDesconto = (totalSemDesconto * (desconto || 0)) / 100;
  const totalComDesconto = totalSemDesconto - valorDesconto;

  // Função de validação do CPF
  const validarCpf = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    setCpf(valor);
    setErroCpf(apenasNumeros.length > 0 && apenasNumeros.length < 11);
  };

  const getIconePagamento = (forma) => {
    switch (forma) {
      case "dinheiro":
        return <Banknote className="w-5 h-5" />;
      case "cartao":
        return <CreditCard className="w-5 h-5" />;
      case "pix":
        return <Smartphone className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-60 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[var(--cor-fundo)]" />
            Finalizar Pagamento
          </h2>
          <button
            onClick={onFechar}
            className="text-gray-500 hover:text-[var(--cor-fundo)]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="space-y-4">
          {/* Desconto */}
          <div>
            <label className="block text-sm font-bold text-[var(--cor-fundo)] mb-2">
              Desconto (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={desconto}
              onChange={(e) => {
                const valor = parseFloat(e.target.value) || 0;
                setDesconto(Math.min(100, Math.max(0, valor)));
              }}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* CPF */}
          <div>
            <label className="block text-sm font-bold text-[var(--cor-fundo)] mb-2">
              CPF na Nota (opcional)
            </label>
            <InputMask
              mask="___.___.___-__"
              replacement={{ _: /\d/ }}
              value={cpf}
              onChange={(e) => validarCpf(e.target.value)}
              placeholder="000.000.000-00"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                erroCpf
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {erroCpf && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>CPF inválido — verifique os números digitados.</span>
              </div>
            )}
          </div>

          {/* Forma de Pagamento */}
          <div>
            <label className="block text-sm font-bold text-[var(--cor-fundo)] mb-2">
              Forma de Pagamento
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["dinheiro", "cartao", "pix"].map((forma) => (
                <button
                  key={forma}
                  onClick={() => setFormaPagamento(forma)}
                  className={`py-3 rounded-xl font-bold transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    formaPagamento === forma
                      ? "bg-[var(--cor-fundo)] text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {getIconePagamento(forma)}
                  <span className="text-xs capitalize">{forma}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Formulários dinâmicos */}
          {formaPagamento === "dinheiro" && (
            <FormDinheiro
              valorPago={valorPago}
              setValorPago={setValorPago}
              totalFinal={totalComDesconto}
            />
          )}

          {formaPagamento === "cartao" && (
            <FormCartao
              numeroCartao={numeroCartao}
              setNumeroCartao={setNumeroCartao}
              validadeCartao={validadeCartao}
              setValidadeCartao={setValidadeCartao}
              cvvCartao={cvvCartao}
              setCvvCartao={setCvvCartao}
              nomeCartao={nomeCartao}
              setNomeCartao={setNomeCartao}
              tipoCartao={tipoCartao}
              setTipoCartao={setTipoCartao}
              parcelas={parcelas}
              setParcelas={setParcelas}
              totalFinal={totalComDesconto}
              validarCampos={validarCamposCartao}
            />
          )}

          {formaPagamento === "pix" && (
            <FormPix
              chavePix={chavePix}
              setChavePix={setChavePix}
              tipoChavePix={tipoChavePix}
              setTipoChavePix={setTipoChavePix}
              totalFinal={totalComDesconto}
            />
          )}

          {/* Resumo Final */}
          <div className="bg-[var(--cor-fundo)] p-4 rounded-xl border-2">
            <div className="space-y-2">
              {desconto > 0 && (
                <>
                  <div className="flex justify-between text-sm text-white">
                    <span>Subtotal:</span>
                    <span className="text-[var(--cor-texto)]">
                      R$ {totalSemDesconto.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600 font-semibold">
                    <span>Desconto ({desconto}%):</span>
                    <span>-R$ {valorDesconto.toFixed(2)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center pt-2 border-t-2 border-[var(--cor-texto)]">
                <span className="text-lg font-bold text-white">
                  Total a Pagar:
                </span>
                <span className="text-2xl font-bold text-[var(--cor-texto)]">
                  R$ {totalComDesconto.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onFechar}
              className="flex-1 bg-gray-200 text-[var(--cor-fundo)] py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirmar}
              className="
    flex-1 
    bg-[var(--cor-fundo)] 
    text-white 
    py-3 
    rounded-xl 
    font-bold 
    transition-all 
    duration-300 
    cursor-pointer
    hover:bg-[#1a0e22]
  "
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
