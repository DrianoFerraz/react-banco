import { useState } from "react";
import { useClientes } from "./hooks/useClientes";
import { Link } from "react-router-dom";
import "./App.css";

export default function App() {
  const { clientes } = useClientes();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCpf, setFiltroCpf] = useState("");

  const clientesFiltrados = clientes.filter((cliente) => {
    const nomeMatch = cliente.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const cpfMatch = cliente.cpfCnpj.includes(filtroCpf);
    return nomeMatch && cpfMatch;
  });

  const clientesPorPagina = 10;
  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);
  const indexInicio = (paginaAtual - 1) * clientesPorPagina;
  const indexFim = indexInicio + clientesPorPagina;
  const clientesPaginados = clientesFiltrados.slice(indexInicio, indexFim);

  const prevPage = () => setPaginaAtual((p) => Math.max(p - 1, 1));
  const nextPage = () => setPaginaAtual((p) => Math.min(p + 1, totalPaginas));

  return (
    <div className="app-container">
      <header className="header">
        <h1>Clientes</h1>
      </header>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          aria-label="Buscar por nome"
        />
        <input
          type="text"
          placeholder="Buscar por CPF/CNPJ"
          value={filtroCpf}
          onChange={(e) => setFiltroCpf(e.target.value)}
          aria-label="Buscar por CPF ou CNPJ"
        />
      </div>

      <div className="clientes-lista">
        {clientesPaginados.map((cliente) => (
          <div key={cliente.id} className="cliente-card" role="listitem">
            <h3>
              <Link to={`/cliente/${cliente.id}`} aria-label={`Ver detalhes do cliente ${cliente.nome}`}>
                {cliente.nome}
              </Link>
            </h3>
            <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
          </div>
        ))}
      </div>

      <div className="paginacao">
        <button onClick={prevPage} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button onClick={nextPage} disabled={paginaAtual === totalPaginas}>
          Próxima
        </button>
      </div>

      {/* Novo botão para acessar a lista de todos os clientes */}
      <div className="listar-todos-botao">
        <Link to="/todos-clientes">
          <button>Listar Todos os Clientes</button>
        </Link>
      </div>
    </div>
  );
}
