export const calcularTotal = (carrinho) => {
  return carrinho.reduce((acc, item) => acc + item.subtotal, 0);
};

export const calcularTotalFinal = (carrinho, desconto) => {
  const total = calcularTotal(carrinho);
  const valorDesconto = (total * desconto) / 100;
  return total - valorDesconto;
};

export const calcularValorParcela = (total, parcelas) => {
  return total / parcelas;
};