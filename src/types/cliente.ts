// Define a estrutura (interface) dos dados de um cliente bancário
export interface Cliente {
  id: string;                    // Identificador único do cliente
  cpfCnpj: string;               // Número do CPF ou CNPJ do cliente
  rg?: string;                   // Número do RG (opcional, pois nem todo cliente pode ter esse dado cadastrado)
  dataNascimento: Date;          // Data de nascimento do cliente
  nome: string;                  // Nome completo do cliente
  nomeSocial?: string;           // Nome social (opcional), para clientes que utilizam um nome diferente do registro civil
  email: string;                 // Endereço de e-mail do cliente
  endereco: string;              // Endereço físico do cliente
  rendaAnual: number;            // Renda anual declarada pelo cliente
  patrimonio: number;            // Patrimônio total estimado do cliente
  estadoCivil:                  // Estado civil do cliente, limitado a valores específicos
    "Solteiro" |
    "Casado" |
    "Viúvo" |
    "Divorciado";
  codigoAgencia: number;         // Código da agência à qual o cliente está vinculado
}
