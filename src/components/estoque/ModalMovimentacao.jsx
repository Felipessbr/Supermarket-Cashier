// import React, { useState } from 'react';
// import { X, TrendingUp, TrendingDown, Save } from 'lucide-react';
// import { toast } from 'react-toastify';

// export default function ModalMovimentacao({ produto, onSalvar, onFechar }) {
//   const [quantidade, setQuantidade] = useState('');
//   const [motivo, setMotivo] = useState('');

//   if (!produto) return null;

//   const isEntrada = produto.tipoMovimentacao === 'entrada';
//   const novoEstoque = isEntrada 
//     ? produto.estoque + (parseInt(quantidade) || 0)
//     : produto.estoque - (parseInt(quantidade) || 0);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!quantidade || parseInt(quantidade) <= 0) {
//       toast.error('Informe uma quantidade válida!');
//       return;
//     }

//     if (!isEntrada && parseInt(quantidade) > produto.estoque) {
//       toast.error('Quantidade maior que o estoque disponível!');
//       return;
//     }

//     if (!motivo.trim()) {
//       toast.error('Informe o motivo da movimentação!');
//       return;
//     }

//     const movimentacao = {
//       codigo: produto.codigo,
//       nome: produto.nome,
//       tipo: isEntrada ? 'entrada' : 'saida',
//       quantidade: parseInt(quantidade),
//       estoqueAnterior: produto.estoque,
//       novoEstoque: novoEstoque,
//       motivo: motivo.trim(),
//       usuario: 'Sistema' // Pode ser dinâmico se tiver login
//     };

//     onSalvar(movimentacao);
//     toast.success(`${isEntrada ? 'Entrada' : 'Saída'} registrada com sucesso!`);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             {isEntrada ? (
//               <>
//                 <TrendingUp className="w-6 h-6 text-green-600" />
//                 Entrada de Estoque
//               </>
//             ) : (
//               <>
//                 <TrendingDown className="w-6 h-6 text-red-600" />
//                 Saída de Estoque
//               </>
//             )}
//           </h2>
//           <button
//             onClick={onFechar}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Info do Produto */}
//         <div className="bg-gray-100 rounded-xl p-4 mb-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-600">Produto</p>
//               <p className="font-bold text-gray-800">{produto.nome}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Código</p>
//               <p className="font-bold text-gray-800">{produto.codigo}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Estoque Atual</p>
//               <p className="font-bold text-gray-800">{produto.estoque} unidades</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Estoque Mínimo</p>
//               <p className="font-bold text-gray-800">{produto.estoqueMinimo} unidades</p>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-2">
//               Quantidade *
//             </label>
//             <input
//               type="number"
//               min="1"
//               value={quantidade}
//               onChange={(e) => setQuantidade(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
//               placeholder="Digite a quantidade"
//               autoFocus
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-2">
//               Motivo *
//             </label>
//             <textarea
//               value={motivo}
//               onChange={(e) => setMotivo(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
//               rows="3"
//               placeholder={isEntrada ? "Ex: Reposição do fornecedor" : "Ex: Produto com defeito"}
//             />
//           </div>

//           {/* Previsão */}
//           {quantidade && (
//             <div className={`p-4 rounded-xl border-2 ${
//               isEntrada ? 'bg-green-50 border-green-200' : 
//               novoEstoque < 0 ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
//             }`}>
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm font-semibold text-gray-700">Novo Estoque:</p>
//                   <p className={`text-3xl font-bold ${
//                     isEntrada ? 'text-green-600' : 
//                     novoEstoque < 0 ? 'text-red-600' : 'text-blue-600'
//                   }`}>
//                     {novoEstoque} unidades
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-gray-600">
//                     {isEntrada ? '+' : '-'}{quantidade} un
//                   </p>
//                   {novoEstoque < produto.estoqueMinimo && (
//                     <p className="text-xs text-orange-600 font-bold mt-1">
//                       ⚠️ Abaixo do mínimo
//                     </p>
//                   )}
//                   {novoEstoque < 0 && (
//                     <p className="text-xs text-red-600 font-bold mt-1">
//                       ❌ Estoque insuficiente!
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onFechar}
//               className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
//             >
//               Cancelar
//             </button>
//             <button
//               type="submit"
//               disabled={novoEstoque < 0}
//               className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
//                 novoEstoque < 0
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : isEntrada
//                   ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
//                   : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg'
//               }`}
//             >
//               <Save className="w-5 h-5" />
//               Confirmar {isEntrada ? 'Entrada' : 'Saída'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }