import { useEffect, useState } from "react";
import { Cliente } from "../types/cliente";
import { fetchCSV } from "../services/fetchCSV";
import Papa from "papaparse";

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClientes() {
      try {
        const csv = await fetchCSV("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes");
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true }).data as any[];

        const data: Cliente[] = parsed.map((row) => ({
          ...row,
          dataNascimento: new Date(row.dataNascimento),
          rendaAnual: parseFloat(row.rendaAnual),
          patrimonio: parseFloat(row.patrimonio),
          codigoAgencia: parseInt(row.codigoAgencia),
        }));

        setClientes(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadClientes();
  }, []);

  return { clientes, loading };
}
