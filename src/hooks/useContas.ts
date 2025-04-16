import { useEffect, useState } from "react";
import { fetchCSV } from "../services/fetchCSV";
import Papa from "papaparse";

interface Conta {
  id: string;
  cpfCnpjCliente: string;
  tipo: "corrente" | "poupanca";
  saldo: number;
  limiteCredito: number;
  creditoDisponivel: number;
}

export function useContas() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContas() {
      try {
        const csv = await fetchCSV(
          "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas"
        );
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true }).data;
        const data: Conta[] = (parsed as any[]).map((row) => ({
          id: row.id,
          cpfCnpjCliente: row.cpfCnpjCliente,
          tipo: row.tipo,
          saldo: parseFloat(row.saldo),
          limiteCredito: parseFloat(row.limiteCredito),
          creditoDisponivel: parseFloat(row.creditoDisponivel),
        }));
        setContas(data);
      } catch (error) {
        console.error("Erro ao carregar contas:", error);
      } finally {
        setLoading(false);
      }
    }

    loadContas();
  }, []);

  return { contas, loading };
}
