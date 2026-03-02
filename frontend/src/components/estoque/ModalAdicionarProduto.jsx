import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { toast } from "react-toastify";

export default function ModalAdicionarProduto({ produto, onSalvar, onFechar }) {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [custoUnitario, setCustoUnitario] = useState("");
  const [estoque, setEstoque] = useState("");
  const [estoqueMinimo, setEstoqueMinimo] = useState("");

  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [erroNome, setErroNome] = useState(false);

  const isEdicao = !!produto;

  useEffect(() => {
    if (produto) {
      setCodigo(produto.codigo);
      setNome(produto.nome);
      setCategoria(produto.categoria);
      setPreco(produto.preco.toString());
      setCustoUnitario(produto.custoUnitario.toString());
      setEstoque(produto.estoque.toString());
      setEstoqueMinimo(produto.estoqueMinimo.toString());
    }
  }, [produto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !codigo ||
      !nome ||
      !categoria ||
      !preco ||
      !custoUnitario ||
      !estoque ||
      !estoqueMinimo
    ) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const novoProduto = {
      codigo,
      nome,
      categoria,
      preco: parseFloat(preco),
      custoUnitario: parseFloat(custoUnitario),
      estoque: parseInt(estoque),
      estoqueMinimo: parseInt(estoqueMinimo),
    };

    onSalvar(novoProduto);
    toast.success(isEdicao ? "Produto atualizado!" : "Produto adicionado!");
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--cor-fundo)]">
            {isEdicao ? "Editar Produto" : "Novo Produto"}
          </h2>

          <button
            onClick={onFechar}
            className="text-gray-500 hover:text-[var(--cor-fundo)] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 text-[var(--cor-fundo)]">
          <div className="grid grid-cols-2 gap-4">
            {/* Código */}
            <div>
              <label className="block text-sm font-bold mb-2">Código *</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                disabled={isEdicao}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[var(--cor-fundo)] focus:outline-none disabled:bg-gray-100"
                placeholder="001"
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-bold mb-2">Categoria *</label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => {
                  const valor = e.target.value;

                  if (/[0-9]/.test(valor)) {
                    setMostrarAviso(true);
                    setTimeout(() => setMostrarAviso(false), 2000);
                  }

                  const somenteLetras = valor.replace(/[0-9]/g, "").toUpperCase();

                  setCategoria(somenteLetras);
                }}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${
                  erroNome ? "border-red-500" : "border-gray-300 focus:border-[var(--cor-fundo)]"
                }`}
                placeholder="BEBIDAS, PADARIA..."
              />
              {mostrarAviso && (
                <p className="text-red-500 text-xs mt-1 animate-slideDown">
                  ! Apenas letras são permitidas
                </p>
              )}
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="block text-sm font-bold mb-2">Nome do Produto *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => {
                const valor = e.target.value;

                if (/[0-9]/.test(valor)) {
                  setMostrarAviso(true);
                  setTimeout(() => setMostrarAviso(false), 2000);
                }

                const somenteLetras = valor.replace(/[0-9]/g, "").toUpperCase();

                setNome(somenteLetras);
                setErroNome(false);
              }}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${
                erroNome ? "border-red-500" : "border-gray-300 focus:border-[var(--cor-fundo)]"
              }`}
              placeholder="ARROZ, FEIJÃO, AÇÚCAR..."
            />

            {mostrarAviso && (
              <p className="text-red-500 text-xs mt-1 animate-slideDown">
                ! Apenas letras são permitidas
              </p>
            )}
          </div>

          {/* Preço e custo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">
                Preço de Venda (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[var(--cor-fundo)] focus:outline-none"
                placeholder="25.90"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Custo Unitário (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                value={custoUnitario}
                onChange={(e) => setCustoUnitario(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[var(--cor-fundo)] focus:outline-none"
                placeholder="18.00"
              />
            </div>
          </div>

          {/* Estoque */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Estoque Atual *</label>
              <input
                type="number"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[var(--cor-fundo)] focus:outline-none"
                placeholder="50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Estoque Mínimo *</label>
              <input
                type="number"
                value={estoqueMinimo}
                onChange={(e) => setEstoqueMinimo(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[var(--cor-fundo)] focus:outline-none"
                placeholder="10"
              />
            </div>
          </div>

          {/* Cálculo de margem */}
          {preco && custoUnitario && (
            <div className="bg-[var(--cor-fundo)] border-2 text-[var(--cor-texto)] rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="font-bold">Margem de Lucro:</span>
                <span className="text-2xl font-bold">
                  {(
                    ((parseFloat(preco) - parseFloat(custoUnitario)) /
                      parseFloat(custoUnitario)) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </div>

              <div className="flex justify-between items-center mt-2 text-sm">
                <span>Lucro por unidade:</span>
                <span
                  className={`font-bold ${
                    parseFloat(preco) - parseFloat(custoUnitario) < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  R$ {(parseFloat(preco) - parseFloat(custoUnitario)).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onFechar}
              className="flex-1 bg-gray-200 text-[var(--cor-fundo)] py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 bg-[var(--cor-fundo)] text-white py-3 rounded-xl font-bold transition-all duration-300 hover:bg-[#1a0e22] cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isEdicao ? "Salvar Alterações" : "Adicionar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
