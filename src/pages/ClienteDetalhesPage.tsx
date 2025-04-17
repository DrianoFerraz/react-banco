import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClientes } from "../hooks/useClientes"; 

const ClienteDetalhesPage: React.FC = () => {
  const { id } = useParams();  // Pegando o id do cliente da URL
  const { clientes, contas, agencias } = useClientes();
  
  const [clienteDetalhes, setClienteDetalhes] = useState<any>(null);
  
  useEffect(() => {
    // Encontrar o cliente pelo id
    const clienteEncontrado = clientes.find(cliente => cliente.id === id);
    if (clienteEncontrado) {
      setClienteDetalhes(clienteEncontrado);
    }
  }, [id, clientes]);

  if (!clienteDetalhes) {
    return <p>Cliente não encontrado</p>;
  }

  const clienteContas = contas.filter(conta => conta.clienteId === id);
  const clienteAgencia = agencias.find(agencia => agencia.codigo === clienteDetalhes.codigoAgencia);

  return (
    <div>
      <h1>{clienteDetalhes.nome}</h1>
      <p>Email: {clienteDetalhes.email}</p>
      <p>CPF/CNPJ: {clienteDetalhes.cpfCnpj}</p>
      <p>Endereço: {clienteDetalhes.endereco}</p>
      <p>Renda Anual: R${clienteDetalhes.rendaAnual}</p>
      <p>Patrimônio: R${clienteDetalhes.patrimonio}</p>

      <h2>Contas Bancárias</h2>
      {clienteContas.length > 0 ? (
        clienteContas.map((conta) => (
          <div key={conta.id}>
            <p>Tipo: {conta.tipoConta}</p>
            <p>Saldo: R${conta.saldo}</p>
            <p>Data de Abertura: {conta.dataAbertura.toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>Este cliente não possui contas bancárias.</p>
      )}

      <h2>Agência</h2>
      {clienteAgencia ? (
        <div>
          <p>Nome: {clienteAgencia.nome}</p>
          <p>Endereço: {clienteAgencia.endereco}</p>
        </div>
      ) : (
        <p>Este cliente não possui uma agência associada.</p>
      )}
    </div>
  );
};

export default ClienteDetalhesPage;
