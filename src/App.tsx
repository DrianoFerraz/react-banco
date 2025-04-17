import { useState } from "react";
import { useClientes, Cliente } from "./hooks/useClientes";
import "./App.css";

export default function App() {
  const { clientes } = useClientes();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const clientesPorPagina = 10;

  const indexInicio = (paginaAtual - 1) * clientesPorPagina;
  const indexFim = indexInicio + clientesPorPagina;

  const clientesPaginados = clientes.slice(indexInicio, indexFim);

  const prevPage = () => setPaginaAtual((p) => Math.max(p - 1, 1));
  const nextPage = () => {
    const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);
    setPaginaAtual((p) => Math.min(p + 1, totalPaginas));
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Lista de Clientes</h1>
      </header>

      <div className="filtros">
        <input type="text" placeholder="Buscar por nome" />
        <input type="text" placeholder="Buscar por CPF/CNPJ" />
      </div>

      <div className="clientes-lista">
        {clientesPaginados.map((cliente: Cliente) => (
          <div key={cliente.id} className="cliente-card">
            <h3>{cliente.nome}</h3>
            <p>CPF/CNPJ: {cliente.cpfCnpj}</p>
            <p>Email: {cliente.email}</p>
          </div>
        ))}
      </div>

      <div className="paginacao">
        <button onClick={prevPage} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <span>Página {paginaAtual}</span>
        <button
          onClick={nextPage}
          disabled={paginaAtual === Math.ceil(clientes.length / clientesPorPagina)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
