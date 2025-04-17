import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClientes } from "../hooks/useClientes"; 

// Componente responsável por exibir os detalhes completos de um cliente selecionado
const ClienteDetalhesPage: React.FC = () => {
  const { id } = useParams();  // Obtém o ID do cliente a partir dos parâmetros da URL
  const { clientes, contas, agencias } = useClientes(); // Hook personalizado para obter os dados

  const [clienteDetalhes, setClienteDetalhes] = useState<any>(null); // Estado local para armazenar os dados do cliente

  useEffect(() => {
    // Localiza o cliente com base no ID recebido da URL
    const clienteEncontrado = clientes.find(cliente => cliente.id === id);
    if (clienteEncontrado) {
      setClienteDetalhes(clienteEncontrado); // Atualiza o estado com os dados do cliente encontrado
    }
  }, [id, clientes]);

  // Exibe uma mensagem caso o cliente não seja encontrado
  if (!clienteDetalhes) {
    return <p>Cliente não encontrado</p>;
  }

  // Filtra as contas que pertencem ao cliente atual
  const clienteContas = contas.filter(conta => conta.clienteId === id);

  // Encontra a agência associada ao cliente, com base no código da agência
  const clienteAgencia = agencias.find(agencia => agencia.codigo === clienteDetalhes.codigoAgencia);

  return (
    <div>
      {/* Informações principais do cliente */}
      <h1>{clienteDetalhes.nome}</h1>
      <p>Email: {clienteDetalhes.email}</p>
      <p>CPF/CNPJ: {clienteDetalhes.cpfCnpj}</p>
      <p>Endereço: {clienteDetalhes.endereco}</p>
      <p>Renda Anual: R${clienteDetalhes.rendaAnual}</p>
      <p>Patrimônio: R${clienteDetalhes.patrimonio}</p>

      {/* Seção de contas bancárias associadas */}
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

      {/* Seção de agência associada ao cliente */}
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
