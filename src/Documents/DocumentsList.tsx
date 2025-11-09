import ListsLayout from "@/components/layouts/ListsLayout";
import {
  DataTable,
  TypeBadge,
  useTable,
  type Column,
  type FilterTab,
} from "@/components";
import { useNavigate } from "react-router";
import type { Transaction } from "@/lib/types";
import { format } from "date-fns";
import { formatTimeTo12Hour } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getDocumentQueryOptions } from "@/api/query";
import { useFilterContext } from "@/contexts/Filter/useFilterContext";
import { filterTypes } from "@/lib/constants";
import { useAuth } from "@/api/Auth/useAuth";
import { useState } from "react";
import CreateTransferDialog from "./components/CreateTransferDialog";
import CreateWithdrawSalesDialog from "./components/CreateWithdrawSalesDialog";
import CreateWithdrawFinance from "./components/CreateWithdrawFinance";

const columns: Column<Transaction>[] = [
  {
    key: "code",
    header: "Code",
    className: "w-20",
  },
  {
    key: "doc_time",
    header: "Time",
    render: (value: number) => formatTimeTo12Hour(value),
    className: "w-24",
  },
  {
    key: "doc_date",
    header: "Date",
    render: (value: string) => format(new Date(value?.split("T")[0]), "dd/MM"),
    className: "w-24",
  },
  {
    key: "doc_type",
    header: "Type",
    render: (value: string) => <TypeBadge type={value} />,
    className: "w-32",
  },
];
const DocumentsList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activeTab, setActiveTab } = useFilterContext();
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isWithdrawSalesDialogOpen, setIsWithdrawSalesDialogOpen] =
    useState(false);
  const [isWithdrawFinanceDialogOpen, setIsWithdrawFinanceDialogOpen] =
    useState(false);
  const {
    currentPage,
    setTotalPages,
    totalPages,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
  } = useTable();
  const handleFilterTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    setCurrentPage(1);
  };

  const {
    data: documentsList,
    isFetching,
    isError,
    error,
  } = useQuery(
    getDocumentQueryOptions(
      searchTerm,
      user.user_type === "FS" || user.user_type === "F"
        ? "withdraw"
        : activeTab,
      currentPage,
      setTotalPages
    )
  );

  const getFilterTabs = (): FilterTab[] => {
    if (user.user_type === "FS" || user.user_type === "F") {
      return [];
    }

    if (user.user_type === "W") {
      return [
        { key: "", label: "All", isActive: activeTab === "" },
        {
          key: "in_stock",
          label: "In stock",
          isActive: activeTab === "in_stock",
        },
        {
          key: "out_stock",
          label: "Out stock",
          isActive: activeTab === "out_stock",
        },
      ];
    }

    return [
      { key: "", label: "All", isActive: activeTab === "" },
      {
        key: "in_stock",
        label: "In stock",
        isActive: activeTab === "in_stock",
      },
      {
        key: "out_stock",
        label: "Out stock",
        isActive: activeTab === "out_stock",
      },
      { key: "sales", label: "Sales", isActive: activeTab === "sales" },
      { key: "return", label: "Returns", isActive: activeTab === "return" },
      {
        key: "withdraw",
        label: "Withdraw cash",
        isActive: activeTab === "withdraw",
      },
    ];
  };

  const handleRowClick = (document: Transaction) => {
    navigate(
      `/yanabea/documents/details/${
        activeTab === "" ? filterTypes[document.doc_type] : activeTab
      }/${document.code}`
    );
  };

  const handleCreateNew = () => {
    if (user.user_type === "W") {
      setIsTransferDialogOpen(true);
    } else if (user.user_type === "F") {
      setIsWithdrawSalesDialogOpen(true);
    } else if (user.user_type === "FS") {
      setIsWithdrawFinanceDialogOpen(true);
    }
  };

  const getCreateButtonLabel = () => {
    if (user.user_type === "W") return "Create Transfer";
    if (user.user_type === "F" || user.user_type === "FS")
      return "Create Withdraw";
    return undefined;
  };

  const getOnCreateNew = () => {
    if (
      user.user_type === "W" ||
      user.user_type === "F" ||
      user.user_type === "FS"
    ) {
      return handleCreateNew;
    }
    return undefined;
  };

  return (
    <>
      <ListsLayout
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search documents"
        filterTabs={getFilterTabs()}
        onFilterTabChange={handleFilterTabChange}
        createButtonLabel={getCreateButtonLabel()}
        onCreateNew={getOnCreateNew()}>
        <DataTable
          className="h-[calc(100dvh-16.625rem)]"
          data={documentsList || []}
          isLoading={isFetching}
          isError={isError}
          error={error}
          columns={columns}
          paging
          onRowClick={handleRowClick}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          emptyMessage="No documents found"
        />
      </ListsLayout>
      <CreateTransferDialog
        open={isTransferDialogOpen}
        onOpenChange={setIsTransferDialogOpen}
      />
      <CreateWithdrawSalesDialog
        open={isWithdrawSalesDialogOpen}
        onOpenChange={setIsWithdrawSalesDialogOpen}
      />
      <CreateWithdrawFinance
        open={isWithdrawFinanceDialogOpen}
        onOpenChange={setIsWithdrawFinanceDialogOpen}
      />
    </>
  );
};

export default DocumentsList;
