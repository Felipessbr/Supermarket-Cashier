import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import ProdutosGrid from "./components/ProdutosGrid";
import Carrinho from "./components/Carrinho";
import ModalPagamento from "./components/ModalPagamento";
import ModalCupomFiscal from "./components/ModalCupomFiscal";
import GestaoEstoque from "./components/estoque/GestaoEstoque";

import { produtos } from "./data/produtos";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarPagamento, setMostrarPagamento] = useState(false);
  const [mostrarCupom, setMostrarCupom] = useState(false);
  const [desconto, setDesconto] = useState(0);
  const [cpf, setCpf] = useState("");

  const [view, setView] = useState("vendas"); // 👈 CONTROLE DE TELA

  const [formaPagamento, setFormaPagamento] = useState("dinheiro");
  const [valorPago, setValorPago] = useState("");
  const [cupomData, setCupomData] = useState(null);
  const [animacaoAdd, setAnimacaoAdd] = useState("");

  const [totalVendas, setTotalVendas] = useState(0);

  const [tipoCartao, setTipoCartao] = useState("debito");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validadeCartao, setValidadeCartao] = useState("");
  const [cvvCartao, setCvvCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [parcelas, setParcelas] = useState(1);

  const [chavePix, setChavePix] = useState("");
  const [tipoChavePix, setTipoChavePix] = useState("celular");

  const [validarCamposCartao, setValidarCamposCartao] = useState(false);

  // ---------------------------------------
  // CALCULAR TOTAL DO CARRINHO
  // ---------------------------------------
  const calcularTotal = () => {
    return carrinho.reduce((acc, item) => acc + item.subtotal, 0);
  };

  // ---------------------------------------
  // ADICIONAR PRODUTO
  // ---------------------------------------
  const adicionarProduto = (codigo) => {
    const produto = produtos[codigo];
    const itemExistente = carrinho.find((item) => item.codigo === codigo);

    setAnimacaoAdd(codigo);
    setTimeout(() => setAnimacaoAdd(""), 500);

    if (itemExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.codigo === codigo
            ? {
                ...item,
                quantidade: item.quantidade + 1,
                subtotal: (item.quantidade + 1) * item.preco,
              }
            : item
        )
      );
    } else {
      setCarrinho([
        ...carrinho,
        {
          codigo,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: 1,
          subtotal: produto.preco,
        },
      ]);
    }
  };

  const alterarQuantidade = (codigo, delta) => {
    const item = carrinho.find((i) => i.codigo === codigo);
    if (!item) return;

    const novaQtd = item.quantidade + delta;
    if (novaQtd <= 0) return removerProduto(codigo);

    setCarrinho(
      carrinho.map((i) =>
        i.codigo === codigo
          ? { ...i, quantidade: novaQtd, subtotal: novaQtd * i.preco }
          : i
      )
    );
  };

  const removerProduto = (codigo) => {
    setCarrinho(carrinho.filter((item) => item.codigo !== codigo));
  };

  // ---------------------------------------
  // ABRIR PAGAMENTO
  // ---------------------------------------
  const abrirPagamento = () => {
    if (!carrinho.length) return;
    setDesconto(0);
    setValidarCamposCartao(false);
    setMostrarPagamento(true);
  };

  // ---------------------------------------
  // FINALIZAR PAGAMENTO
  // ---------------------------------------
  const confirmarPagamento = () => {
    const total = calcularTotal();
    const valorDesconto = (total * desconto) / 100;
    const totalFinal = total - valorDesconto;

    let troco = 0;
    let dadosPagamento = { tipo: formaPagamento };

    if (formaPagamento === "dinheiro") {
      const valor = parseFloat(valorPago) || 0;
      if (valor < totalFinal) {
        return toast.error("Valor insuficiente!");
      }
      troco = valor - totalFinal;
    }

    if (formaPagamento === "cartao") {
      setValidarCamposCartao(true);

      if (
        !numeroCartao ||
        numeroCartao.length < 19 ||
        !validadeCartao ||
        validadeCartao.length < 5 ||
        !cvvCartao ||
        cvvCartao.length < 3 ||
        !nomeCartao
      ) {
        return toast.error("Preencha todos os dados!");
      }

      dadosPagamento = {
        tipo: "cartao",
        tipoCartao,
        numeroCartao: numeroCartao.slice(-4),
        nomeCartao,
        parcelas: tipoCartao === "credito" ? parcelas : 1,
      };
    }

    if (formaPagamento === "pix") {
      if (!chavePix) return toast.error("Informe a chave PIX!");

      dadosPagamento = { tipo: "pix", chavePix, tipoChavePix };
    }

    const cupom = {
      itens: [...carrinho],
      subtotal: total,
      desconto: valorDesconto,
      total: totalFinal,
      formaPagamento,
      dadosPagamento,
      troco,
      cpf,
      data: new Date().toLocaleString("pt-BR"),
    };

    setTotalVendas(totalVendas + totalFinal);
    setCupomData(cupom);
    setMostrarPagamento(false);
    setMostrarCupom(true);
  };

  const novaVenda = () => {
    setCarrinho([]);
    setDesconto(0);
    setCpf("");
    setValorPago("");
    setFormaPagamento("dinheiro");
    setTipoCartao("debito");
    setNumeroCartao("");
    setValidadeCartao("");
    setCvvCartao("");
    setNomeCartao("");
    setChavePix("");
    setParcelas(1);
    setValidarCamposCartao(false);
    setMostrarCupom(false);
  };

  // ======================================================
  // =========  RENDERIZAÇÃO DAS TELAS ====================
  // ======================================================

  // 🔥 Tela de ESTOQUE
  if (view === "estoque") {
    return (
      <GestaoEstoque
        produtos={produtos}
        onVoltar={() => setView("vendas")}
      />
    );
  }

  // 🔥 Tela de VENDAS (principal)
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* ---------- TÍTULO ---------- */}
        <div className="text-center mb-8 border-b-2 border-white/20 pb-4 relative">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Villa Itália
          </h1>
          <p className="text-[var(--cor-texto)] text-lg mb-2">
            Villa Itália Supermercado
          </p>
        </div>

        {/* ---------- DASHBOARD ---------- */}
        <Dashboard
          totalVendas={totalVendas}
          itensCarrinho={carrinho.length}
          totalProdutos={Object.keys(produtos).length}
          onAbrirEstoque={() => setView("estoque")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProdutosGrid
            produtos={produtos}
            onAdicionarProduto={adicionarProduto}
            animacaoAdd={animacaoAdd}
          />

          <Carrinho
            carrinho={carrinho}
            total={calcularTotal()}
            onAlterarQuantidade={alterarQuantidade}
            onRemover={removerProduto}
            onFinalizar={abrirPagamento}
          />
        </div>
      </div>

      {/* MODAIS */}
      <ModalPagamento
        mostrar={mostrarPagamento}
        onFechar={() => {
          setMostrarPagamento(false);
          setValidarCamposCartao(false);
        }}
        desconto={desconto}
        setDesconto={setDesconto}
        cpf={cpf}
        setCpf={setCpf}
        formaPagamento={formaPagamento}
        setFormaPagamento={setFormaPagamento}
        totalSemDesconto={calcularTotal()}
        onConfirmar={confirmarPagamento}
        valorPago={valorPago}
        setValorPago={setValorPago}
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
        chavePix={chavePix}
        setChavePix={setChavePix}
        tipoChavePix={tipoChavePix}
        setTipoChavePix={setTipoChavePix}
        validarCamposCartao={validarCamposCartao}
      />

      <ModalCupomFiscal
        mostrar={mostrarCupom}
        cupomData={cupomData}
        onNovaVenda={novaVenda}
      />

      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
    </div>
  );
}

export default App;
