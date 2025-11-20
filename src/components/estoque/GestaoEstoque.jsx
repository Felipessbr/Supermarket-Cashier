import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  History,
  ArrowLeft,
} from "lucide-react";
import TabelaProdutos from "./TabelaProdutos";

export default function GestaoEstoque({
  produtos,
  onVoltar,
  onAtualizarProdutos,
}) {
  const [view, setView] = useState("produtos"); // produtos, historico, alertas
  const [mostrarModalProduto, setMostrarModalProduto] = useState(false);
  const [mostrarModalMovimentacao, setMostrarModalMovimentacao] =
    useState(false);
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [produtoMovimentacao, setProdutoMovimentacao] = useState(null);
  const [historico, setHistorico] = useState([]);

  // Carregar histórico do localStorage
  useEffect(() => {
    const hist = localStorage.getItem("historicoMovimentacoes");
    if (hist) {
      setHistorico(JSON.parse(hist));
    }
  }, []);

  // Salvar histórico no localStorage
  const salvarHistorico = (novoHistorico) => {
    setHistorico(novoHistorico);
    localStorage.setItem(
      "historicoMovimentacoes",
      JSON.stringify(novoHistorico)
    );
  };

  const handleEditarProduto = (codigo) => {
    setProdutoEdit({ codigo, ...produtos[codigo] });
    setMostrarModalProduto(true);
  };

  const handleMovimentar = (codigo, tipo) => {
    setProdutoMovimentacao({
      codigo,
      ...produtos[codigo],
      tipoMovimentacao: tipo,
    });
    setMostrarModalMovimentacao(true);
  };

  const handleSalvarProduto = (dadosProduto) => {
    onAtualizarProdutos(dadosProduto);
    setMostrarModalProduto(false);
    setProdutoEdit(null);
  };

  const handleSalvarMovimentacao = (movimentacao) => {
    // Atualizar estoque do produto
    const novoProduto = {
      ...produtos[movimentacao.codigo],
      estoque: movimentacao.novoEstoque,
    };

    onAtualizarProdutos({ codigo: movimentacao.codigo, ...novoProduto });

    // Adicionar ao histórico
    const novaMovimentacao = {
      id: Date.now(),
      ...movimentacao,
      data: new Date().toLocaleString("pt-BR"),
    };

    salvarHistorico([novaMovimentacao, ...historico]);
    setMostrarModalMovimentacao(false);
    setProdutoMovimentacao(null);
  };

  // Calcular estatísticas
  const totalProdutos = Object.keys(produtos).length;
  const valorTotalEstoque = Object.values(produtos).reduce(
    (acc, p) => acc + p.estoque * p.custoUnitario,
    0
  );
  const produtosEstoqueBaixo = Object.values(produtos).filter(
    (p) => p.estoque <= p.estoqueMinimo
  ).length;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="fex items-center justify-content-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onVoltar}
              className="bg-white/10 backdrop-blur-lg p-3 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6 text-[var(--cor-texto)]" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Gestão de Estoque
              </h1>
              <p className="text-[var(--cor-texto)]">Controle do inventario</p>
            </div>
          </div>

          <button onClick={() => {
            setProdutoEdit(null)
            setMostrarModalProduto(true)
          }}
          className=" border border-white/20 hover:border-white/50 rounded-2xl  text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-5 h-5"/>
            Novo Produto
          </button>
        </div>

              {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="bg-[var(--cor-fundo)] p-4 rounded-xl">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-whitetext-sm font-medium">Total de Produtos</p>
                <p className="text-3xl font-bold text-white">{totalProdutos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="bg-green-500 p-4 rounded-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-whitetext-sm font-medium">Valor em Estoque</p>
                <p className="text-3xl font-bold text-white">R$ {valorTotalEstoque.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className={`${produtosEstoqueBaixo > 0 ? 'bg-red-500' : 'bg-amber-500'} p-4 rounded-xl`}>
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-whitetext-sm font-medium">Estoque Baixo</p>
                <p className="text-3xl font-bold text-white">{produtosEstoqueBaixo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setView('produtos')}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              view === 'produtos'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-whitehover:bg-white/20'
            }`}
          >
            <Package className="w-5 h-5" />
            Produtos
          </button>
          <button
            onClick={() => setView('historico')}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              view === 'historico'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-whitehover:bg-white/20'
            }`}
          >
            <History className="w-5 h-5" />
            Histórico
          </button>
          <button
            onClick={() => setView('alertas')}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              view === 'alertas'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-whitehover:bg-white/20'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
            Alertas
            {produtosEstoqueBaixo > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {produtosEstoqueBaixo}
              </span>
            )}
          </button>
        </div>

        {/* Conteúdo */}
        {view === 'produtos' && (
          <TabelaProdutos
            produtos={produtos}
            onEditar={handleEditarProduto}
            onMovimentar={handleMovimentar}
          />
        )}

        {view === 'historico' && (
          <HistoricoMovimentacoes
            historico={historico}
            produtos={produtos}
          />
        )}

        {view === 'alertas' && (
          <AlertasEstoque
            produtos={produtos}
            onMovimentar={handleMovimentar}
          />
        )}
      </div>

      {/* Modais */}
      {mostrarModalProduto && (
        <ModalAdicionarProduto
          produto={produtoEdit}
          onSalvar={handleSalvarProduto}
          onFechar={() => {
            setMostrarModalProduto(false);
            setProdutoEdit(null);
          }}
        />
      )}

      {mostrarModalMovimentacao && (
        <ModalMovimentacao
          produto={produtoMovimentacao}
          onSalvar={handleSalvarMovimentacao}
          onFechar={() => {
            setMostrarModalMovimentacao(false);
            setProdutoMovimentacao(null);
          }}
        />
      )}
    </div>
  );
}
