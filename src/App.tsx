// Importa os hooks necessários e o Link do React Router para navegação
import { useState } from "react";
import { useClientes } from "./hooks/useClientes"; // Hook customizado para obter a lista de clientes
import { Link } from "react-router-dom"; // Para navegação entre páginas
import "./App.css"; // Arquivo de estilos CSS

// Componente principal da aplicação
export default function App() {
  // Obtém a lista de clientes do hook useClientes
  const { clientes } = useClientes();
  // Define o estado da página atual (padrão: 1)
  const [paginaAtual, setPaginaAtual] = useState(1);
  // Define os filtros de busca por nome e CPF/CNPJ
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCpf, setFiltroCpf] = useState("");

  // Filtra os clientes com base nos filtros de nome e CPF/CNPJ
  const clientesFiltrados = clientes.filter((cliente) => {
    // Verifica se o nome do cliente contém o texto de filtro, ignorando maiúsculas/minúsculas
    const nomeMatch = cliente.nome.toLowerCase().includes(filtroNome.toLowerCase());
    // Verifica se o CPF/CNPJ contém o texto de filtro
    const cpfMatch = cliente.cpfCnpj.includes(filtroCpf);
    // Retorna o cliente se ambos os filtros forem correspondentes
    return nomeMatch && cpfMatch;
  });

  // Define quantos clientes serão mostrados por página
  const clientesPorPagina = 10;
  // Calcula o número total de páginas, baseado no número de clientes filtrados
  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);
  // Calcula os índices de início e fim dos clientes para a página atual
  const indexInicio = (paginaAtual - 1) * clientesPorPagina;
  const indexFim = indexInicio + clientesPorPagina;
  // Seleciona os clientes a serem mostrados na página atual
  const clientesPaginados = clientesFiltrados.slice(indexInicio, indexFim);

  // Função para ir para a página anterior
  const prevPage = () => setPaginaAtual((p) => Math.max(p - 1, 1));
  // Função para ir para a próxima página
  const nextPage = () => setPaginaAtual((p) => Math.min(p + 1, totalPaginas));

  return (
    <div className="app-container">
      {/* Cabeçalho da página */}
      <header className="header">
        <h1>Clientes</h1>
      </header>

      {/* Filtros para busca de clientes */}
      <div className="filtros">
        {/* Campo de busca por nome */}
        <input
          type="text"
          placeholder="Buscar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)} // Atualiza o estado de filtroNome
          aria-label="Buscar por nome"
        />
        {/* Campo de busca por CPF/CNPJ */}
        <input
          type="text"
          placeholder="Buscar por CPF/CNPJ"
          value={filtroCpf}
          onChange={(e) => setFiltroCpf(e.target.value)} // Atualiza o estado de filtroCpf
          aria-label="Buscar por CPF ou CNPJ"
        />
      </div>

      {/* Exibe a lista de clientes filtrados e paginados */}
      <div className="clientes-lista">
        {clientesPaginados.map((cliente) => (
          <div key={cliente.id} className="cliente-card" role="listitem">
            {/* Link para detalhes do cliente */}
            <h3>
              <Link to={`/cliente/${cliente.id}`} aria-label={`Ver detalhes do cliente ${cliente.nome}`}>
                {cliente.nome}
              </Link>
            </h3>
            {/* Exibe CPF/CNPJ e email do cliente */}
            <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
          </div>
        ))}
      </div>

      {/* Controle de paginação */}
      <div className="paginacao" aria-live="polite">
        {/* Botão para a página anterior */}
        <button onClick={prevPage} disabled={paginaAtual === 1} aria-label="Página anterior">
          Anterior
        </button>
        {/* Texto informando a página atual e total */}
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>
        {/* Botão para a próxima página */}
        <button onClick={nextPage} disabled={paginaAtual === totalPaginas} aria-label="Próxima página">
          Próxima
        </button>
      </div>

      {/* Botão para visualizar todos os clientes */}
      <div className="listar-todos-botao">
        <Link to="/todos-clientes" aria-label="Ver todos os clientes">
          <button>Listar Todos os Clientes</button>
        </Link>
      </div>
    </div>
  );
}
