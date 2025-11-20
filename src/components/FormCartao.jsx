import React, { useState, useEffect } from "react";
import { CreditCard, AlertCircle } from "lucide-react";

export default function FormCartao({
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
  totalFinal,

  validarCampos,
}) {
  const [mostrarAviso, setMostrarAviso] = useState(false);

  // Estados de erro nos campos
  const [erroNumero, setErroNumero] = useState(false);
  const [erroValidade, setErroValidade] = useState(false);
  const [erroCvv, setErroCvv] = useState(false);
  const [erroNome, setErroNome] = useState(false);

  // Quando o App pedir validação → pinta bordas
  useEffect(() => {
    if (validarCampos) {
      setErroNumero(numeroCartao.trim().length < 19);
      setErroValidade(validadeCartao.trim().length < 5);
      setErroCvv(cvvCartao.trim().length < 3);
      setErroNome(nomeCartao.trim().length === 0);
    }
  }, [validarCampos]);

  return (
    <div className="animate-slideDown space-y-4">
      {/* Número do Cartão */}
      <div>
        <label className="block text-sm font-semibold text-[var(--cor-fundo)] mb-2">
          Número do Cartão
        </label>
        <input
          type="text"
          placeholder="0000 0000 0000 0000"
          maxLength="19"
          value={numeroCartao}
          onChange={(e) => {
            const valor = e.target.value.replace(/\D/g, "");
            const formatado = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
            setNumeroCartao(formatado);
            setErroNumero(false);
          }}
          className={`w-full px-4 py-3 border-2 rounded-xl text-[var(--cor-fundo)] transition-colors focus:outline-none 
            ${
              erroNumero
                ? "border-red-500"
                : "border-gray-200 focus:border-blue-500"
            }`}
        />
      </div>

      {/* Validade + CVV */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-[var(--cor-fundo)] mb-2">
            Validade
          </label>
          <input
            type="text"
            placeholder="MM/AA"
            maxLength="5"
            value={validadeCartao}
            onChange={(e) => {
              let valor = e.target.value.replace(/\D/g, "");
              if (valor.length >= 2) {
                valor = valor.slice(0, 2) + "/" + valor.slice(2, 4);
              }
              setValidadeCartao(valor);
              setErroValidade(false);
            }}
            className={`w-full px-4 py-3 border-2 rounded-xl text-[var(--cor-fundo)] transition-colors focus:outline-none 
              ${
                erroValidade
                  ? "border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--cor-fundo)] mb-2">
            CVV
          </label>
          <input
            type="text"
            placeholder="123"
            maxLength="3"
            value={cvvCartao}
            onChange={(e) => {
              setCvvCartao(e.target.value.replace(/\D/g, ""));
              setErroCvv(false);
            }}
            className={`w-full px-4 py-3 border-2 rounded-xl text-[var(--cor-fundo)] transition-colors focus:outline-none 
              ${
                erroCvv
                  ? "border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
          />
        </div>
      </div>

      {/* Nome no Cartão */}
      <div>
        <label className="block text-sm font-semibold text-[var(--cor-fundo)] mb-2">
          Nome no Cartão
        </label>
        <input
          type="text"
          placeholder="NOME COMPLETO"
          value={nomeCartao}
          onChange={(e) => {
            const valor = e.target.value;
            if (/[0-9]/.test(valor)) {
              setMostrarAviso(true);
              setTimeout(() => setMostrarAviso(false), 2000);
            }
            setNomeCartao(valor.replace(/[0-9]/g, "").toUpperCase());
            setErroNome(false);
          }}
          className={`w-full px-4 py-3 border-2 rounded-xl uppercase transition-colors focus:outline-none text-[var(--cor-fundo)]
            ${
              erroNome
                ? "border-red-500"
                : "border-gray-200 focus:border-blue-500"
            }`}
        />

        {mostrarAviso && (
          <p className="text-red-500 text-xs mt-1 animate-slideDown">
            ! Apenas letras são permitidas
          </p>
        )}
      </div>

      {/* Tipo de transação */}
      <div>
        <label className="block text-sm font-semibold text-[var(--cor-fundo)] mb-2">
          Tipo de Transação
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setTipoCartao("debito");
              setParcelas(1);
            }}
            className={`py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              tipoCartao === "debito"
                ? "bg-[var(--cor-fundo)] text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Débito
          </button>

          <button
            onClick={() => setTipoCartao("credito")}
            className={`py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              tipoCartao === "credito"
                ? "bg-[var(--cor-fundo)] text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Crédito
          </button>
        </div>
      </div>

      {/* Parcelas se crédito */}
      {tipoCartao === "credito" && (
        <div className="animate-slideDown">
          <label className="block text-sm font-semibold text-[var(--cor-fundo)] mb-2">
            Parcelas
          </label>
          <select
            value={parcelas}
            onChange={(e) => setParcelas(parseInt(e.target.value))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 cursor-pointer text-[var(--cor-fundo)]"
          >
            {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}x de R$ {(totalFinal / num).toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
