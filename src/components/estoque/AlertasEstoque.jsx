// import React from 'react';
// import { AlertTriangle, TrendingUp, Package } from 'lucide-react';

// export default function AlertasEstoque({ produtos, onMovimentar }) {
//   // Filtrar produtos com estoque baixo
//   const produtosCriticos = Object.entries(produtos).filter(
//     ([_, p]) => p.estoque === 0
//   );
  
//   const produtosBaixos = Object.entries(produtos).filter(
//     ([_, p]) => p.estoque > 0 && p.estoque <= p.estoqueMinimo * 0.5
//   );
  
//   const produtosAtencao = Object.entries(produtos).filter(
//     ([_, p]) => p.estoque > p.estoqueMinimo * 0.5 && p.estoque <= p.estoqueMinimo
//   );

//   const totalAlertas = produtosCriticos.length + produtosBaixos.length + produtosAtencao.length;

//   const renderProduto = (codigo, produto, nivel) => {
//     const cores = {
//       critico: 'bg-red-500',
//       baixo: 'bg-orange-500',
//       atencao: 'bg-yellow-500'
//     };

//     const textos = {
//       critico: 'SEM ESTOQUE',
//       baixo: 'CRÍTICO',
//       atencao: 'ATENÇÃO'
//     };

//     return (
//       <div
//         key={codigo}
//         className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-all"
//       >
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex items-start gap-3 flex-1">
//             <div className={`${cores[nivel]} p-2 rounded-lg`}>
//               <AlertTriangle className="w-5 h-5 text-white" />
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-1">
//                 <h3 className="font-bold text-white text-lg">{produto.nome}</h3>
//                 <span className={`${cores[nivel]} text-white text-xs px-2 py-1 rounded-full font-bold`}>
//                   {textos[nivel]}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-400">Código: {codigo} • {produto.categoria}</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3 mb-4">
//           <div className="bg-white/5 rounded-lg p-3 text-center">
//             <p className="text-xs text-gray-400 mb-1">Atual</p>
//             <p className={`text-2xl font-bold ${cores[nivel].replace('bg-', 'text-')}`}>
//               {produto.estoque}
//             </p>
//           </div>
//           <div className="bg-white/5 rounded-lg p-3 text-center">
//             <p className="text-xs text-gray-400 mb-1">Mínimo</p>
//             <p className="text-2xl font-bold text-white">{produto.estoqueMinimo}</p>
//           </div>
//           <div className="bg-white/5 rounded-lg p-3 text-center">
//             <p className="text-xs text-gray-400 mb-1">Necessário</p>
//             <p className="text-2xl font-bold text-green-400">
//               +{produto.estoqueMinimo - produto.estoque}
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={() => onMovimentar(codigo, 'entrada')}
//           className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
//         >
//           <TrendingUp className="w-5 h-5" />
//           Registrar Entrada
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
//               <AlertTriangle className="w-6 h-6" />
//               Alertas de Estoque
//             </h2>
//             <p className="text-blue-200">
//               {totalAlertas} produto{totalAlertas !== 1 ? 's' : ''} requer{totalAlertas !== 1 ? 'em' : ''} atenção
//             </p>
//           </div>
//           <div className="bg-red-500 text-white px-6 py-3 rounded-full">
//             <span className="text-3xl font-bold">{totalAlertas}</span>
//           </div>
//         </div>
//       </div>

//       {/* Produtos Críticos */}
//       {produtosCriticos.length > 0 && (
//         <div>
//           <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
//             <Package className="w-5 h-5" />
//             Sem Estoque ({produtosCriticos.length})
//           </h3>
//           <div className="space-y-3">
//             {produtosCriticos.map(([codigo, produto]) => 
//               renderProduto(codigo, produto, 'critico')
//             )}
//           </div>
//         </div>
//       )}

//       {/* Produtos Baixos */}
//       {produtosBaixos.length > 0 && (
//         <div>
//           <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
//             <Package className="w-5 h-5" />
//             Estoque Crítico ({produtosBaixos.length})
//           </h3>
//           <div className="space-y-3">
//             {produtosBaixos.map(([codigo, produto]) => 
//               renderProduto(codigo, produto, 'baixo')
//             )}
//           </div>
//         </div>
//       )}

//       {/* Produtos Atenção */}
//       {produtosAtencao.length > 0 && (
//         <div>
//           <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
//             <Package className="w-5 h-5" />
//             Estoque Baixo ({produtosAtencao.length})
//           </h3>
//           <div className="space-y-3">
//             {produtosAtencao.map(([codigo, produto]) => 
//               renderProduto(codigo, produto, 'atencao')
//             )}
//           </div>
//         </div>
//       )}

//       {/* Nenhum alerta */}
//       {totalAlertas === 0 && (
//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
//           <Package className="w-20 h-20 mx-auto mb-4 text-green-400 opacity-50" />
//           <h3 className="text-2xl font-bold text-white mb-2">Tudo certo! ✅</h3>
//           <p className="text-blue-200">Todos os produtos estão com estoque adequado</p>
//         </div>
//       )}
//     </div>
//   );
// }