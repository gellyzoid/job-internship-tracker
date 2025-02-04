import { useState } from "react";

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data?.slice(startIndex, endIndex);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    currentData,
    onPageChange,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, data?.length),
  };
}

export default usePagination;
