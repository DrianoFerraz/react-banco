import React, { useState } from "react";
import { useClientes, Cliente } from "../hooks/useClientes"; 
import ClienteCard from "../components/ClienteCard";
import Pagination from "../components/Pagination";

// Página responsável por listar todos os clientes com suporte a busca e paginação
const ClientesPage: React.FC = () => {
  const { clientes, loading } = useClientes(); // Hook personalizado que busca os dados dos clientes
  const [search, setSearch] = useState(""); // Estado local para o termo de pesquisa
  const [page, setPage] = useState(1); // Estado para controlar a página atual
  const itemsPerPage = 10; // Define o número de itens por página

  // Filtra os clientes com base no nome ou CPF/CNPJ, ignorando maiúsculas/minúsculas
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
      cliente.cpfCnpj.includes(search)
  );

  // Seleciona os clientes que devem ser exibidos na página atual
  const currentPageClientes = filteredClientes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <h1>Clientes</h1>

      {/* Campo de busca por nome ou CPF/CNPJ */}
      <input
        type="text"
        placeholder="Pesquisar por nome ou CPF/CNPJ"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Exibe o carregamento enquanto os dados ainda estão sendo obtidos */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {/* Renderiza os cards dos clientes da página atual */}
          {currentPageClientes.map((cliente: Cliente) => (
            <ClienteCard key={cliente.id} cliente={cliente} />
          ))}
        </div>
      )}

      {/* Componente de paginação para navegar entre as páginas */}
      <Pagination
        currentPage={page}
        totalItems={filteredClientes.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ClientesPage;
