import React from "react";
// Importa o tipo Cliente da hook personalizada para garantir tipagem estática e segurança no uso dos dados
import { Cliente } from "../hooks/useClientes";

// Define a interface das props esperadas pelo componente ClienteCard
interface ClienteCardProps {
  cliente: Cliente; // Espera receber um objeto do tipo Cliente como prop
}

// Componente funcional ClienteCard, que exibe informações básicas de um cliente
const ClienteCard: React.FC<ClienteCardProps> = ({ cliente }) => {
  return (
    // Container principal do card do cliente
    <div className="cliente-card">
      {/* Nome do cliente */}
      <h3>{cliente.nome}</h3>

      {/* Documento de identificação do cliente (CPF ou CNPJ) */}
      <p>CPF/CNPJ: {cliente.cpfCnpj}</p>

      {/* Email de contato do cliente */}
      <p>Email: {cliente.email}</p>

      {/* Código da agência associada ao cliente */}
      <p>Agência: {cliente.codigoAgencia}</p>
    </div>
  );
};

// Exporta o componente para uso em outras partes da aplicação
export default ClienteCard;
