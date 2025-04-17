import { useClientes } from "../hooks/useClientes";
import { Link } from "react-router-dom";
import "../TodosClientes.css";

// Componente responsável por exibir a lista completa de todos os clientes
export default function TodosClientes() {
  const { clientes } = useClientes(); // Hook personalizado que retorna os dados dos clientes

  return (
    <div className="todos-clientes-container">
      {/* Cabeçalho da página */}
      <header className="header">
        <h1>Todos os Clientes</h1>
      </header>

      {/* Lista de clientes */}
      <div className="clientes-lista">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="cliente-card" role="listitem">
            {/* Nome do cliente como link para a página de detalhes */}
            <h3>
              <Link
                to={`/cliente/${cliente.id}`}
                aria-label={`Ver detalhes do cliente ${cliente.nome}`} // Acessibilidade: descrição do link para leitores de tela
              >
                {cliente.nome}
              </Link>
            </h3>

            {/* Exibição dos dados essenciais do cliente */}
            <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
