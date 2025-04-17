import { useEffect, useState } from "react";
import { fetchCSV } from "../services/fetchCSV"; // Função para buscar o arquivo CSV
import Papa from "papaparse"; // Biblioteca para parsear o CSV

// Definindo a interface para a estrutura dos dados de Agência
interface Agencia {
  id: string; // ID da agência
  codigo: number; // Código da agência
  nome: string; // Nome da agência
  endereco: string; // Endereço da agência
}

export function useAgencias() {
  // Definindo o estado para armazenar as agências e o estado de loading
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [loading, setLoading] = useState(true); // Inicializa o loading como verdadeiro

  useEffect(() => {
    // Função assíncrona para carregar as agências
    async function loadAgencias() {
      try {
        // Busca o CSV usando a função fetchCSV
        const csv = await fetchCSV(
          "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias"
        );

        // Parseia o CSV usando o PapaParse, definindo que a primeira linha é o cabeçalho
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true }).data;

        // Mapeia os dados para o formato esperado pela interface Agencia
        const data: Agencia[] = (parsed as any[]).map((row) => ({
          id: row.id,
          codigo: parseInt(row.codigo), // Converte o código para número
          nome: row.nome,
          endereco: row.endereco,
        }));

        // Atualiza o estado com os dados das agências
        setAgencias(data);
      } catch (error) {
        console.error("Erro ao carregar agências:", error); // Em caso de erro, loga o erro
      } finally {
        setLoading(false); // Quando terminar, define o loading como false
      }
    }

    loadAgencias(); // Chama a função para carregar as agências
  }, []); // O efeito roda apenas uma vez após o componente ser montado

  // Retorna as agências e o estado de loading
  return { agencias, loading };
}
