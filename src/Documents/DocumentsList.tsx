import ListsLayout from "@/components/layouts/ListsLayout";
import { useState } from "react";
import {
  DataTable,
  TypeBadge,
  useTable,
  type Column,
  type FilterTab,
} from "@/components";
import { useNavigate } from "react-router";

type Document = {
  code: string;
  time: string;
  date: string;
  type: "Out stock" | "Withdraw" | "Sales" | "Return" | "In stock";
};

const documents: Document[] = [
  { code: "6754", time: "06:00PM", date: "29/05", type: "Out stock" },
  { code: "6754", time: "05:55PM", date: "29/05", type: "Withdraw" },
  { code: "6754", time: "04:50PM", date: "29/05", type: "Sales" },
  { code: "6754", time: "04:25PM", date: "29/05", type: "Return" },
  { code: "6754", time: "02:01PM", date: "29/05", type: "Sales" },
  { code: "6754", time: "01:40PM", date: "29/05", type: "Return" },
  { code: "6754", time: "11:00AM", date: "29/05", type: "Sales" },
  { code: "6754", time: "10:12AM", date: "29/05", type: "Sales" },
  { code: "6754", time: "10:12AM", date: "29/05", type: "Sales" },
  { code: "6754", time: "09:20AM", date: "29/05", type: "In stock" },
  { code: "6754", time: "10:12AM", date: "29/05", type: "Sales" },
  { code: "6754", time: "02:01PM", date: "29/05", type: "Sales" },
  { code: "6754", time: "01:40PM", date: "29/05", type: "Return" },
  { code: "6754", time: "10:12AM", date: "29/05", type: "Sales" },
];
const DocumentsList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const {
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
  } = useTable();

  const columns: Column<Document>[] = [
    {
      key: "code",
      header: "Code",
      className: "w-20",
    },
    {
      key: "time",
      header: "Time",
      className: "w-24",
    },
    {
      key: "date",
      header: "Date",
      className: "w-24",
    },
    {
      key: "type",
      header: "Type",
      render: (value) => <TypeBadge type={value} />,
      className: "w-32",
    },
  ];

  const filterTabs: FilterTab[] = [
    { key: "all", label: "All", isActive: activeTab === "all" },
    { key: "stock", label: "In/Out stock", isActive: activeTab === "stock" },
    { key: "sales", label: "Sales", isActive: activeTab === "sales" },
    { key: "returns", label: "Returns", isActive: activeTab === "returns" },
    {
      key: "withdraw",
      label: "Withdraw cash",
      isActive: activeTab === "withdraw",
    },
  ];


  const handleRowClick = (document: Document) => {
    navigate(`/yanabea/documents/details/${document.code}`);
  };

  return (
    <ListsLayout
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search documents"
      filterTabs={filterTabs}
      onFilterTabChange={setActiveTab}>
      <DataTable
        className="h-[calc(100dvh-16.625rem)]"
        data={documents}
        columns={columns}
        onRowClick={handleRowClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyMessage="No documents found"
      />
    </ListsLayout>
  );
};

export default DocumentsList;
