import { useEffect, useState } from "react";
import { fetchCSV } from "../services/fetchCSV";
import Papa from "papaparse";

interface Agencia {
  id: string;
  codigo: number;
  nome: string;
  endereco: string;
}

export function useAgencias() {
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgencias() {
      try {
        const csv = await fetchCSV(
          "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias"
        );
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true }).data;
        const data: Agencia[] = (parsed as any[]).map((row) => ({
          id: row.id,
          codigo: parseInt(row.codigo),
          nome: row.nome,
          endereco: row.endereco,
        }));
        setAgencias(data);
      } catch (error) {
        console.error("Erro ao carregar agências:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAgencias();
  }, []);

  return { agencias, loading };
}
