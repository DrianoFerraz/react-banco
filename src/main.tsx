// Importação das dependências necessárias
import React from "react"; // Importa o React, necessário para a renderização de componentes
import ReactDOM from "react-dom/client"; // Importa a biblioteca para manipular o DOM no React
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importa os componentes do React Router para navegação
import App from "./App"; // Importa o componente principal da aplicação
import ClienteDetalhesPage from "./pages/ClienteDetalhesPage"; // Página para mostrar os detalhes de um cliente
import TodosClientesPage from "./pages/TodosClientesPage"; // Página para mostrar todos os clientes

// Renderização do componente principal na raiz da aplicação
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode> {/* Ativa a verificação de desenvolvimento no React */}
    <BrowserRouter> {/* Envolve toda a aplicação com o BrowserRouter para gerenciar as rotas */}
      <Routes> {/* Define as rotas da aplicação */}
        <Route path="/" element={<App />} /> {/* Rota principal (Home) que renderiza o componente App */}
        <Route path="/cliente/:id" element={<ClienteDetalhesPage />} /> {/* Rota dinâmica para a página de detalhes de um cliente */}
        <Route path="/todos-clientes" element={<TodosClientesPage />} /> {/* Rota para listar todos os clientes */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
