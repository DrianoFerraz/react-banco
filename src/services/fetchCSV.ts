// Função assíncrona para buscar um arquivo CSV a partir de uma URL fornecida
export async function fetchCSV(url: string): Promise<string> {
  // Realiza a requisição HTTP para a URL informada
  const response = await fetch(url);

  // Verifica se a resposta foi bem-sucedida (status HTTP 200-299)
  if (!response.ok) throw new Error("Erro ao buscar CSV");

  // Retorna o conteúdo do arquivo como texto
  return response.text();
}
