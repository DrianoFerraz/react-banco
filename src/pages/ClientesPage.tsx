import React, { useState } from "react";
import { useClientes, Cliente } from "../hooks/useClientes"; 
import ClienteCard from "../components/ClienteCard";
import Pagination from "../components/Pagination";

const ClientesPage: React.FC = () => {
  const { clientes, loading } = useClientes();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
      cliente.cpfCnpj.includes(search)
  );

  const currentPageClientes = filteredClientes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <h1>Clientes</h1>

      <input
        type="text"
        placeholder="Pesquisar por nome ou CPF/CNPJ"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {currentPageClientes.map((cliente: Cliente) => (
            <ClienteCard key={cliente.id} cliente={cliente} />
          ))}
        </div>
      )}


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
