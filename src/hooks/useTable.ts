import { useState } from "react";

export type UseTableReturn = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (page: number) => void;

  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export function useTable(): UseTableReturn {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,

    searchTerm,
    setSearchTerm: handleSearchChange,
  };
}
