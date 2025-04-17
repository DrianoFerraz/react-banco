// Define a estrutura (interface) dos dados de uma agência bancária
export interface Agencia {
  id: string;         // Identificador único da agência (pode ser UUID ou outro formato)
  codigo: number;     // Código numérico da agência, usado para identificação interna
  nome: string;       // Nome da agência
  endereco: string;   // Endereço físico da agência
}
