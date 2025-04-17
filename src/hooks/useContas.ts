import { useEffect, useState } from "react"; // Importa hooks do React: useEffect (para efeitos colaterais) e useState (para armazenar estados)
import { fetchCSV } from "../services/fetchCSV"; // Importa a função que vai buscar o arquivo CSV
import Papa from "papaparse"; // Importa a biblioteca PapaParse para parsear o CSV

// Define a interface para os dados de uma Conta
interface Conta {
    id: string; // Identificador único da conta
    cpfCnpjCliente: string; // CPF ou CNPJ do cliente associado à conta
    tipo: "corrente" | "poupanca"; // Tipo de conta: Corrente ou Poupança
    saldo: number; // Saldo atual da conta
    limiteCredito: number; // Limite de crédito da conta
    creditoDisponivel: number; // Crédito disponível na conta
}

// Define o hook customizado `useContas` que retorna dados de contas bancárias
export function useContas() {
    // Cria o estado para armazenar as contas e o estado de carregamento (loading)
    const [contas, setContas] = useState<Conta[]>([]); // Inicializa um array vazio para as contas
    const [loading, setLoading] = useState(true); // Inicializa o estado de carregamento como verdadeiro

    // O useEffect executa a função `loadContas` ao montar o componente
    useEffect(() => {
        // Função assíncrona para carregar as contas
        async function loadContas() {
            try {
                // Realiza a requisição para pegar o CSV com as contas usando a função fetchCSV
                const csv = await fetchCSV(
                    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas"
                );

                // Faz o parsing do CSV para um formato utilizável, ignorando linhas vazias e usando o cabeçalho
                const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true }).data;

                // Mapeia os dados do CSV para o formato da interface Conta
                const data: Conta[] = (parsed as any[]).map((row) => ({
                    id: row.id, // ID da conta
                    cpfCnpjCliente: row.cpfCnpjCliente, // CPF ou CNPJ do cliente
                    tipo: row.tipo, // Tipo de conta: "corrente" ou "poupanca"
                    saldo: parseFloat(row.saldo), // Converte o saldo para número
                    limiteCredito: parseFloat(row.limiteCredito), // Converte o limite de crédito para número
                    creditoDisponivel: parseFloat(row.creditoDisponivel), // Converte o crédito disponível para número
                }));

                // Atualiza o estado `contas` com os dados parseados
                setContas(data);
            } catch (error) {
                // Caso ocorra um erro na requisição ou parsing, loga o erro no console
                console.error("Erro ao carregar contas:", error);
            } finally {
                // Após a execução (com ou sem erro), seta o estado de carregamento para false
                setLoading(false);
            }
        }

        // Chama a função `loadContas` para carregar os dados quando o componente for montado
        loadContas();
    }, []); // O array vazio de dependências garante que a função seja executada apenas uma vez, na montagem inicial do componente

    // Retorna os dados de contas e o estado de carregamento para o componente que usar este hook
    return { contas, loading };
}
