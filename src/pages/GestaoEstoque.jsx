// src/pages/GestaoEstoque.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GestaoEstoqueComponent from "../components/estoque/GestaoEstoque";
import { produtos as produtosIniciais } from "../data/produtos";
import { ToastContainer } from "react-toastify";

export default function GestaoEstoquePage() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState(produtosIniciais);

  const handleAtualizarProdutos = (dadosProduto) => {
    setProdutos((prev) => ({
      ...prev,
      [dadosProduto.codigo]: dadosProduto,
    }));
  };

  return (
    <>
      <GestaoEstoqueComponent
        produtos={produtos}
        onVoltar={() => navigate("/")}
        onAtualizarProdutos={handleAtualizarProdutos}
      />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        theme="colored"
      />
    </>
  );
}