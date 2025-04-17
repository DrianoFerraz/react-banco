// Define a estrutura dos dados de uma conta bancária
export interface Conta {
  id: string;                     // Identificador único da conta
  cpfCnpjCliente: string;         // CPF ou CNPJ do cliente titular da conta
  tipo: "corrente" | "poupanca";  // Tipo da conta, que pode ser corrente ou poupança
  saldo: number;                  // Valor atual disponível na conta
  limiteCredito: number;         // Limite de crédito aprovado para a conta
  creditoDisponivel: number;     // Quantidade de crédito disponível para uso
}
