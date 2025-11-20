import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormDinheiro({ valorPago, setValorPago, totalFinal }) {
  const [status, setStatus] = useState("default"); 

  const troco =
    valorPago && parseFloat(valorPago) >= totalFinal
      ? parseFloat(valorPago) - totalFinal
      : 0;

  const handleChange = (e) => {
    const valor = e.target.value;
    setValorPago(valor);

    // Se o campo estiver vazio
    if (valor === "") {
      setStatus("erro");
      toast.info("Informe o valor recebido!");
      return;
    }

    // Se o valor for menor que o total
    if (parseFloat(valor) < totalFinal) {
      setStatus("erro");
      toast.warn("O valor recebido é menor que o total a pagar!");
      return;
    }

    setStatus("OK")
  };
  const bordaInput =
    status === "erro"
      ? "border-red-500 focus:border-red-600"
      : status === "OK"
      ? "border-green-500 focus:border-green-600"
      : "border-gray-300 focus:border-blue-800";


  return (
    <div className="animate-slideDown">
      <label className="block text-sm font-bold text-[var(--cor-fundo)] mb-2">
        Valor Recebido
      </label>

      <input
        type="number"
        step="0.01"
        value={valorPago}
        onChange={handleChange}
        className={`w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-800 focus:outline-none transition-colors text-[var(--cor-fundo)] ${bordaInput}`}
        placeholder="Digite o valor recebido"
      />

      {troco > 0 && (
        <div className="mt-2 p-3 bg-green-100 rounded-lg text-green-800 font-bold">
          💰 Troco: R$ {troco.toFixed(2)}
        </div>
      )}

    </div>
  );
}
