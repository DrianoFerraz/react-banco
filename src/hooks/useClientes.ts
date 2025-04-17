import { useState, useEffect } from "react";
import Papa from "papaparse";

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
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [contas, setContas] = useState<Conta[]>([]);
    const [agencias, setAgencias] = useState<Agencia[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseClientes = await fetch(
                    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes"
                );
                const csvTextClientes = await responseClientes.text();
                Papa.parse(csvTextClientes, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const clientesData = result.data.map((cliente: any) => ({
                            ...cliente,
                            dataNascimento: new Date(cliente.dataNascimento),
                            rendaAnual: parseFloat(cliente.rendaAnual),
                            patrimonio: parseFloat(cliente.patrimonio),
                        }));
                        setClientes(clientesData);
                    },
                });

                const responseContas = await fetch(
                    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas"
                );
                const csvTextContas = await responseContas.text();
                Papa.parse(csvTextContas, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const contasData = result.data.map((conta: any) => ({
                            ...conta,
                            dataAbertura: new Date(conta.dataAbertura),
                            saldo: parseFloat(conta.saldo),
                        }));
                        setContas(contasData);
                    },
                });

                const responseAgencias = await fetch(
                    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias"
                );
                const csvTextAgencias = await responseAgencias.text();
                Papa.parse(csvTextAgencias, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const agenciasData = result.data.map((agencia: any) => ({
                            ...agencia,
                            codigo: parseInt(agencia.codigo, 10),
                        }));
                        setAgencias(agenciasData);
                    },
                });

                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { clientes, contas, agencias, loading };
};
