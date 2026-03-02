import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import imagemNot from "../img/carrinho-e-cesta-de-compras-e-icones-financas.png"

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <img src={imagemNot} alt="Página não encontrada" className="mx-auto w-[45%] mb-6" />
       
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--cor-texto)] mb-6">
          Página não encontrada
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <button
          onClick={() => navigate("/")}
          className="
            bg-[var(--cor-fundo)] 
            text-white 
            px-8 
            py-4 
            rounded-xl 
            font-bold 
            transition-all 
            duration-300 
            hover:bg-[#1a0e22] 
            cursor-pointer
            flex 
            items-center 
            gap-3 
            mx-auto
            shadow-lg
            border
            border-white/20
          "
        >
          <Home className="w-5 h-5" />
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}