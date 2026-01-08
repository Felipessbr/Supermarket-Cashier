// src/App.jsx
import React from "react";
import AppRoutes from "./routes/Routes";
import { VendasProvider } from "./context/VendasContext";

function App() {
 
  return (
    <VendasProvider>
      <AppRoutes />
    </VendasProvider>
  );
}

export default App;