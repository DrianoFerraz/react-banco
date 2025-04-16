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

export const useClientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch(
                    "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes"
                );
                const csvText = await response.text();
                Papa.parse(csvText, {
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
                        setLoading(false);
                    },
                });
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setLoading(false);
            }
        };

        fetchClientes();
    }, []);

    return { clientes, loading };
};
