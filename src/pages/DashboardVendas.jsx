// src/pages/DashboardVendas.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ProdutosGrid from "../components/ProdutosGrid";
import Carrinho from "../components/Carrinho";
import ModalPagamento from "../components/ModalPagamento";
import ModalCupomFiscal from "../components/ModalCupomFiscal";
import { useVendas } from "../context/VendasContext";
import { produtos as produtosIniciais } from "../data/produtos";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardVendas() {
  const navigate = useNavigate();
  const [produtos] = useState(produtosIniciais);
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarPagamento, setMostrarPagamento] = useState(false);
  const [mostrarCupom, setMostrarCupom] = useState(false);
  const [desconto, setDesconto] = useState(0);
  const [cpf, setCpf] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("dinheiro");
  const [valorPago, setValorPago] = useState("");
  const [cupomData, setCupomData] = useState(null);
  const [animacaoAdd, setAnimacaoAdd] = useState("");
  const [totalVendas, setTotalVendas] = useState(0);
  
  // Estados do cartão
  const [tipoCartao, setTipoCartao] = useState("debito");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validadeCartao, setValidadeCartao] = useState("");
  const [cvvCartao, setCvvCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [parcelas, setParcelas] = useState(1);

  const {  adicionarVenda } = useVendas();
  
  // Estados do PIX
  const [chavePix, setChavePix] = useState("");
  const [tipoChavePix, setTipoChavePix] = useState("celular");
  
  const [validarCamposCartao, setValidarCamposCartao] = useState(false);

  const calcularTotal = () => {
    return carrinho.reduce((acc, item) => acc + item.subtotal, 0);
  };

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
  
  const abrirPagamento = () => {
      if (!carrinho.length) return;
    setDesconto(0);
    setValidarCamposCartao(false);
    setMostrarPagamento(true);
};

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

const now = new Date();
const cupom = {
    id: now.getTime(),
    itens: [...carrinho],
      subtotal: total,
      desconto: valorDesconto,
      total: totalFinal,
      formaPagamento,
      dadosPagamento,
      troco,
      cpf,
      data: now.toLocaleString("pt-BR"),
      dataISO: now.toISOString(),
    };
    
    setTotalVendas((prev) => prev + totalFinal);
    setCupomData(cupom);
    setMostrarPagamento(false);
    setMostrarCupom(true);
    setValidarCamposCartao(false);
    adicionarVenda(cupom);
};

const novaVenda = () => {
    if (cupomData) {
        toast.success(
            `Venda faturada no valor de R$ ${cupomData.total.toFixed(2)}`,
            {
                position: "top-center",
          autoClose: 2500,
          theme: "colored",
        }
      );
    }

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
    setTipoChavePix("celular");
    setParcelas(1);
    setValidarCamposCartao(false);
    setMostrarCupom(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Villa Itália
          </h1>
          <p>Villa Itália Supermercado</p>
        </div>

        {/* Dashboard Cards */}
        <Dashboard
          totalVendas={totalVendas}
          itensCarrinho={carrinho.length}
          totalProdutos={Object.keys(produtos).length}
        />

        {/* Navegação */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-xl bg-[var(--cor-fundo)] text-white shadow-lg border border-white/20 cursor-pointer"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/analytics")}
            className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition cursor-pointer"
          >
            Analytics
          </button>
          <button
            onClick={() => navigate("/estoque")}
            className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition cursor-pointer"
          >
            Estoque
          </button>
        </div>

        {/* Grid Principal */}
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

      {/* Modais */}
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