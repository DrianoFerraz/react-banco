import { useState, useEffect } from "react"; // Hooks do React
import Papa from "papaparse"; // Biblioteca para parsear arquivos CSV

// Definição das interfaces para os dados das entidades Cliente, Conta e Agencia
export interface Cliente {
    id: string;
    cpfCnpj: string;
    rg?: string;
    dataNascimento: Date;
    nome: string;
    nomeSocial?: string;
    email: string;
    endereco: string;
    rendaAnual: number;
    patrimonio: number;
    estadoCivil: "Solteiro" | "Casado" | "Viúvo" | "Divorciado";
    codigoAgencia: number;
}

export interface Conta {
    id: string;
    clienteId: string;
    tipoConta: "Corrente" | "Poupança" | "Outro";
    saldo: number;
    dataAbertura: Date;
}

export interface Agencia {
    codigo: number;
    nome: string;
    endereco: string;
}

export const useClientes = () => {
    // Hooks de estado para armazenar os dados das entidades e o estado de carregamento
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [contas, setContas] = useState<Conta[]>([]);
    const [agencias, setAgencias] = useState<Agencia[]>([]);
    const [loading, setLoading] = useState(true); // Inicializa o loading como true

    useEffect(() => {
        // Função assíncrona que busca os dados dos clientes, contas e agências
        const fetchData = async () => {
            try {
                // Busca os dados dos clientes a partir de um CSV armazenado no Google Sheets
                const responseClientes = await fetch(
                    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes"
                );
                const csvTextClientes = await responseClientes.text();
                Papa.parse(csvTextClientes, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        // Converte os dados recebidos, tratando tipos e datas
                        const clientesData = result.data.map((cliente: any) => ({
                            ...cliente,
                            dataNascimento: new Date(cliente.dataNascimento), // Converte para objeto Date
                            rendaAnual: parseFloat(cliente.rendaAnual), // Converte para número
                            patrimonio: parseFloat(cliente.patrimonio), // Converte para número
                        }));
                        setClientes(clientesData); // Atualiza o estado com os clientes processados
                    },
                });

                // Busca os dados das contas de clientes no Google Sheets
                const responseContas = await fetch(
                    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas"
                );
                const csvTextContas = await responseContas.text();
                Papa.parse(csvTextContas, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        // Converte os dados de contas, tratando datas e valores
                        const contasData = result.data.map((conta: any) => ({
                            ...conta,
                            dataAbertura: new Date(conta.dataAbertura), // Converte para objeto Date
                            saldo: parseFloat(conta.saldo), // Converte para número
                        }));
                        setContas(contasData); // Atualiza o estado com as contas processadas
                    },
                });

                // Busca os dados das agências no Google Sheets
                const responseAgencias = await fetch(
                    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias"
                );
                const csvTextAgencias = await responseAgencias.text();
                Papa.parse(csvTextAgencias, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        // Converte os dados das agências, tratando o código
                        const agenciasData = result.data.map((agencia: any) => ({
                            ...agencia,
                            codigo: parseInt(agencia.codigo, 10), // Converte para número
                        }));
                        setAgencias(agenciasData); // Atualiza o estado com as agências processadas
                    },
                });

                // Após buscar todos os dados, define loading como false
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar dados:", error); // Loga qualquer erro
                setLoading(false); // Define loading como false mesmo após erro
            }
        };

        fetchData(); // Chama a função para buscar os dados
    }, []); // O efeito roda apenas uma vez, após o componente ser montado

    // Retorna as informações dos clientes, contas, agências e o estado de carregamento
    return { clientes, contas, agencias, loading };
};
