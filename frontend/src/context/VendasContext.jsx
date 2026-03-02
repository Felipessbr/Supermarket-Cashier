
import React, { createContext, useContext, useState, useEffect } from 'react';

const VendasContext = createContext();

export function VendasProvider({ children }) {
  const [vendasHistorico, setVendasHistorico] = useState(() => {
    try {
      const raw = localStorage.getItem('vendasHistorico');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem('vendasHistorico', JSON.stringify(vendasHistorico));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }, [vendasHistorico]);

  // Adicionar nova venda
  const adicionarVenda = (cupom) => {
    setVendasHistorico((prev) => [cupom, ...prev]);
  };

  return (
    <VendasContext.Provider value={{ vendasHistorico, adicionarVenda }}>
      {children}
    </VendasContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useVendas() {
  const context = useContext(VendasContext);
  if (!context) {
    throw new Error('useVendas deve ser usado dentro de VendasProvider');
  }
  return context;
}