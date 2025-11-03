import { useState } from "react";

export type UseTableReturn = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeTab: string;
  setActiveTab: (tabKey: string) => void;
};

export function useTable(): UseTableReturn {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("");

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const handleFilterTabChange = (tabKey: string) => {
    setActiveTab((prev) => (prev === tabKey ? "" : tabKey));
  };
  return {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    searchTerm,
    setSearchTerm: handleSearchChange,
    activeTab,
    setActiveTab: handleFilterTabChange,
  };
}
