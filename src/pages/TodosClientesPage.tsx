import { useClientes } from "../hooks/useClientes";
import { Link } from "react-router-dom";
import "../TodosClientes.css";

export default function TodosClientes() {
  const { clientes } = useClientes();

  return (
    <div className="todos-clientes-container">
      <header className="header">
        <h1>Todos os Clientes</h1>
      </header>

      <div className="clientes-lista">
        {clientes.map((cliente) => (
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
    </div>
  );
}
