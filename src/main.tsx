import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ClienteDetalhesPage from "./pages/ClienteDetalhesPage";
import TodosClientesPage from "./pages/TodosClientesPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cliente/:id" element={<ClienteDetalhesPage />} />
        <Route path="/todos-clientes" element={<TodosClientesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
