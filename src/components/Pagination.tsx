import React from "react";

// Define a interface das props que o componente Pagination deve receber
interface PaginationProps {
  currentPage: number;              // Página atual
  totalItems: number;              // Total de itens disponíveis para paginação
  itemsPerPage: number;            // Quantidade de itens por página
  onPageChange: (page: number) => void; // Função chamada ao mudar de página
}

// Componente funcional responsável pela navegação entre páginas
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  // Calcula o total de páginas baseado no total de itens e itens por página
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      {/* Botão para voltar à página anterior.
          É desabilitado se o usuário já estiver na primeira página */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {/* Exibe a página atual e o total de páginas disponíveis */}
      <span>
        Página {currentPage} de {totalPages}
      </span>

      {/* Botão para avançar para a próxima página.
          É desabilitado se o usuário já estiver na última página */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
};

// Exporta o componente para ser utilizado em outras partes do projeto
export default Pagination;
