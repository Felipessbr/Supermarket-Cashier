import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import ProdutosGrid from "./components/ProdutosGrid";
import Carrinho from "./components/Carrinho";
import ModalPagamento from "./components/ModalPagamento";
import ModalCupomFiscal from "./components/ModalCupomFiscal";
import { produtos } from "./data/produtos";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
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

  const [tipoCartao, setTipoCartao] = useState("debito");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validadeCartao, setValidadeCartao] = useState("");
  const [cvvCartao, setCvvCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [parcelas, setParcelas] = useState(1);

  const [chavePix, setChavePix] = useState("");
  const [tipoChavePix, setTipoChavePix] = useState("celular");

  const [validarCamposCartao, setValidarCamposCartao] = useState(false);

  const calcularTotal = (carrinho) => {
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
    if (item) {
      const novaQtd = item.quantidade + delta;
      if (novaQtd <= 0) {
        removerProduto(codigo);
      } else {
        setCarrinho(
          carrinho.map((i) =>
            i.codigo === codigo
              ? { ...i, quantidade: novaQtd, subtotal: novaQtd * i.preco }
              : i
          )
        );
      }
    }
  };

  const removerProduto = (codigo) => {
    setCarrinho(carrinho.filter((item) => item.codigo !== codigo));
  };

  const abrirPagamento = () => {
    if (carrinho.length === 0) return;
    setDesconto(0);
    setValidarCamposCartao(false); // Reset da validação
    setMostrarPagamento(true);
  };

  const confirmarPagamento = () => {
    const total = calcularTotal(carrinho);
    const valorDesconto = (total * desconto) / 100;
    const totalFinal = total - valorDesconto;

    let troco = 0;
    let dadosPagamento = { tipo: formaPagamento };

    if (formaPagamento === "dinheiro") {
      const valor = parseFloat(valorPago) || 0;
      if (valor < totalFinal) {
        toast.error("Valor insuficiente!");
        return;
      }
      troco = valor - totalFinal;
    } else if (formaPagamento === "cartao") {
      // Ativa validação visual
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
        toast.error("Preencha todos os dados do cartão!");
        return;
      }
      dadosPagamento = {
        tipo: "cartao",
        tipoCartao: tipoCartao,
        numeroCartao: numeroCartao.slice(-4),
        nomeCartao: nomeCartao,
        parcelas: tipoCartao === "credito" ? parcelas : 1,
      };
    } else if (formaPagamento === "pix") {
      if (!chavePix) {
        toast.error("Informe a chave PIX!");
        return;
      }
      dadosPagamento = {
        tipo: "pix",
        chavePix: chavePix,
        tipoChavePix: tipoChavePix,
      };
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
    setValidarCamposCartao(false); // Reset após sucesso
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
    <div className="min-h-screen p-4 md:p-8 ">
      <div className="max-w-7xl mx-auto ">
        <div
          className=" text-center mb-8 
              border-b-2 border-white/20 
              relative pb-4
              after:content-[''] 
              after:absolute 
              after:bottom-0 
              after:left-0
              after:w-full 
              after:h-[2px]
              after:bg-black/40
              after:translate-y-[4px]
              after:blur-sm "
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Villa Itália
          </h1>
          <p className="text-[var(--cor-texto)] text-lg mb-2 ">Villa Itália Supermercado</p>
        </div>

        <Dashboard
          totalVendas={totalVendas}
          itensCarrinho={carrinho.length}
          totalProdutos={Object.keys(produtos).length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProdutosGrid
            produtos={produtos}
            onAdicionarProduto={adicionarProduto}
            animacaoAdd={animacaoAdd}
          />

          <Carrinho
            carrinho={carrinho}
            total={calcularTotal(carrinho)}
            onAlterarQuantidade={alterarQuantidade}
            onRemover={removerProduto}
            onFinalizar={abrirPagamento}
          />
        </div>
      </div>

      <ModalPagamento
        mostrar={mostrarPagamento}
        onFechar={() => {
          setMostrarPagamento(false);
          setValidarCamposCartao(false); // Reset ao fechar
        }}
        desconto={desconto}
        setDesconto={setDesconto}
        cpf={cpf}
        setCpf={setCpf}
        formaPagamento={formaPagamento}
        setFormaPagamento={setFormaPagamento}
        totalSemDesconto={calcularTotal(carrinho)}
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
