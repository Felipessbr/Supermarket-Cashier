// import React, { useState } from 'react';
// import { History, TrendingUp, TrendingDown, Search, Calendar } from 'lucide-react';

// export default function HistoricoMovimentacoes({ historico, produtos }) {
//   const [busca, setBusca] = useState('');
//   const [filtroTipo, setFiltroTipo] = useState('todos'); // todos, entrada, saida

//   // Filtrar histórico
//   const historicoFiltrado = historico.filter(mov => {
//     const termoBusca = busca.toLowerCase();
//     const matchBusca = 
//       mov.nome.toLowerCase().includes(termoBusca) ||
//       mov.codigo.includes(termoBusca) ||
//       mov.motivo.toLowerCase().includes(termoBusca);

//     const matchTipo = 
//       filtroTipo === 'todos' || 
//       mov.tipo === filtroTipo;

//     return matchBusca && matchTipo;
//   });

//   return (
//     <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-white flex items-center gap-2">
//           <History className="w-6 h-6" />
//           Histórico de Movimentações
//         </h2>
//         <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold">
//           {historicoFiltrado.length} registros
//         </span>
//       </div>

//       {/* Filtros */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div className="relative">
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Buscar por produto, código ou motivo..."
//             value={busca}
//             onChange={(e) => setBusca(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
//           />
//         </div>

//         <div className="flex gap-2">
//           <button
//             onClick={() => setFiltroTipo('todos')}
//             className={`flex-1 py-3 rounded-xl font-bold transition-all ${
//               filtroTipo === 'todos'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-white/10 text-blue-200 hover:bg-white/20'
//             }`}
//           >
//             Todos
//           </button>
//           <button
//             onClick={() => setFiltroTipo('entrada')}
//             className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
//               filtroTipo === 'entrada'
//                 ? 'bg-green-600 text-white'
//                 : 'bg-white/10 text-green-200 hover:bg-white/20'
//             }`}
//           >
//             <TrendingUp className="w-4 h-4" />
//             Entradas
//           </button>
//           <button
//             onClick={() => setFiltroTipo('saida')}
//             className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
//               filtroTipo === 'saida'
//                 ? 'bg-red-600 text-white'
//                 : 'bg-white/10 text-red-200 hover:bg-white/20'
//             }`}
//           >
//             <TrendingDown className="w-4 h-4" />
//             Saídas
//           </button>
//         </div>
//       </div>

//       {/* Lista */}
//       <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
//         {historicoFiltrado.length === 0 ? (
//           <div className="text-center py-12 text-gray-400">
//             <History className="w-16 h-16 mx-auto mb-4 opacity-20" />
//             <p className="text-lg">Nenhuma movimentação encontrada</p>
//           </div>
//         ) : (
//           historicoFiltrado.map((mov) => (
//             <div
//               key={mov.id}
//               className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-all"
//             >
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex items-start gap-3">
//                   <div className={`p-2 rounded-lg ${
//                     mov.tipo === 'entrada' 
//                       ? 'bg-green-500' 
//                       : 'bg-red-500'
//                   }`}>
//                     {mov.tipo === 'entrada' ? (
//                       <TrendingUp className="w-5 h-5 text-white" />
//                     ) : (
//                       <TrendingDown className="w-5 h-5 text-white" />
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-white text-lg">{mov.nome}</h3>
//                     <p className="text-sm text-gray-400">Código: {mov.codigo}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <span className={`text-2xl font-bold ${
//                     mov.tipo === 'entrada' ? 'text-green-400' : 'text-red-400'
//                   }`}>
//                     {mov.tipo === 'entrada' ? '+' : '-'}{mov.quantidade}
//                   </span>
//                   <p className="text-xs text-gray-400 mt-1">unidades</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 mb-3">
//                 <div className="bg-white/5 rounded-lg p-2">
//                   <p className="text-xs text-gray-400">Anterior</p>
//                   <p className="font-bold text-white">{mov.estoqueAnterior}</p>
//                 </div>
//                 <div className="bg-white/5 rounded-lg p-2">
//                   <p className="text-xs text-gray-400">Novo</p>
//                   <p className="font-bold text-white">{mov.novoEstoque}</p>
//                 </div>
//                 <div className="bg-white/5 rounded-lg p-2">
//                   <p className="text-xs text-gray-400">Usuário</p>
//                   <p className="font-bold text-white text-sm">{mov.usuario}</p>
//                 </div>
//               </div>

//               <div className="bg-white/5 rounded-lg p-3 mb-2">
//                 <p className="text-xs text-gray-400 mb-1">Motivo:</p>
//                 <p className="text-white text-sm">{mov.motivo}</p>
//               </div>

//               <div className="flex items-center gap-2 text-xs text-gray-400">
//                 <Calendar className="w-3 h-3" />
//                 {mov.data}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }