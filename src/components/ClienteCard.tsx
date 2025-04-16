import React from "react";
import { Cliente } from "../hooks/useClientes";

interface ClienteCardProps {
  cliente: Cliente;
}

const ClienteCard: React.FC<ClienteCardProps> = ({ cliente }) => {
  return (
    <div className="cliente-card">
      <h3>{cliente.nome}</h3>
      <p>CPF/CNPJ: {cliente.cpfCnpj}</p>
      <p>Email: {cliente.email}</p>
      <p>Agência: {cliente.codigoAgencia}</p>
    </div>
  );
};

export default ClienteCard;
