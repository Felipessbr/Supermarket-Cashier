import React, { useState, useEffect } from 'react';
import { AlertCircle, QrCode } from 'lucide-react';

export default function FormPix({ 
  chavePix, 
  setChavePix, 
  tipoChavePix, 
  setTipoChavePix, 
  totalFinal 
}) {
  const [erro, setErro] = useState(false);

  useEffect(() => {
    // Limpa o erro quando o usuário digita algo
    if (chavePix.trim() !== "") setErro(false);
  }, [chavePix]);

  const getPlaceholder = () => {
    switch (tipoChavePix) {
      case "celular":
        return "(11) 98765-4321";
      case "email":
        return "seuemail@exemplo.com";
      case "cpf":
        return "000.000.000-00";
      case "aleatoria":
        return "chave-aleatoria-exemplo";
      default:
        return "Digite a chave PIX";
    }
  };

  const handleBlur = () => {
    // Exibe erro se o campo estiver vazio ao sair do foco
    if (chavePix.trim() === "") {
      setErro(true);
    }
  };

  return (
    <div className="animate-slideDown space-y-4">
      {/* QR Code */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-200">
        <div className="text-center">
          <div className="inline-block bg-white p-4 rounded-xl mb-3 shadow-md">
            <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <QrCode className="w-16 h-16 text-white" />
            </div>
          </div>
          <p className="text-sm font-semibold text-[var(--cor-fundo)]">
            Escaneie o QR Code
          </p>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm font-bold">OU</div>

      {/* Tipo de Chave */}
      <div>
        <label className="block text-sm font-semibold text-[var(--cor-fundo)] mb-2">
          Tipo de Chave
        </label>
        <select
          value={tipoChavePix}
          onChange={(e) => setTipoChavePix(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-800 font-medium"
        >
          <option value="celular">Celular</option>
          <option value="email">E-mail</option>
          <option value="cpf">CPF/CNPJ</option>
          <option value="aleatoria">Chave Aleatória</option>
        </select>
      </div>

      {/* Chave PIX */}
      <div>
        <label className="block text-sm font-semibold text-[var(--cor-fundo)] mb-2">
          Chave PIX
        </label>
        <input
          type="text"
          placeholder={getPlaceholder()}
          value={chavePix}
          onChange={(e) => setChavePix(e.target.value)}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-gray-800 ${
            erro
              ? "border-red-500 focus:border-red-500"
              : "border-gray-200 focus:border-blue-500"
          }`}
        />
        {erro && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> Informe sua chave PIX.
          </p>
        )}
      </div>

      {/* Aviso */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          Aguardando confirmação do pagamento. O valor de{" "}
          <strong>R$ {totalFinal.toFixed(2)}</strong> deve ser transferido.
        </p>
      </div>
    </div>
  );
}
