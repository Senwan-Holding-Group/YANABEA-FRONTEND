import {
  DataTable,
  SearchInput,
  TypeBadge,
  useTable,
  type Column,
  type FilterTab,
} from "@/components";
import { useState } from "react";
import TransactionDialog from "./TransactionDialog";
import CFilterTab from "@/components/FilterTab";
import type { Transaction } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getTransactionQueryOptions } from "@/api/query";
import { format } from "date-fns";
import { formatTimeTo12Hour } from "@/lib/utils";
import { useParams } from "react-router";
import { useCurrentNavItem } from "@/hooks/useCurrentNavItem";

type TransactionsHistorySectionProps = {
  filterTypes: string[];
  currentTanasction?: boolean;
};

const TransactionsHistorySection = ({
  filterTypes,
  currentTanasction = false,
}: TransactionsHistorySectionProps) => {
  const [filterTab, setFilterTab] = useState(filterTypes[0] || "");
  const { searchTerm, setSearchTerm } = useTable();
  const { navLabel } = useCurrentNavItem();
  const { id } = useParams();
  const {
    data: transactions,
    isFetching,
    isError,
    error,
  } = useQuery(
    getTransactionQueryOptions(
      searchTerm,
      filterTab,
      currentTanasction,
      navLabel,
      id
    )
  );

  const createFilterTabs = (): FilterTab[] => {
    const tabMap: Record<string, string> = {
      "": "All",
      sales: "Sales",
      return: "Returns",
      refund: "Returns",
      withdraw: "Withdraw cash",
      in_stock: "In stock",
      out_stock: "Out stock",
    };

    return filterTypes.map((type) => ({
      key: type,
      label: tabMap[type],
      isActive: filterTab === type,
    }));
  };

  const filterTabs = createFilterTabs();

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
      render: (value: string) =>
        format(new Date(value?.split("T")[0]), "dd/MM"),
      className: "w-24",
    },
    {
      key: "doc_type",
      header: "Type",
      render: (value: string) => <TypeBadge type={value} />,
      className: "w-32",
    },
    {
      key: "code",
      header: "View",
      render: (_, transaction) => (
        <TransactionDialog
          code={transaction?.code}
          type={transaction?.doc_type}
          filter={filterTab}
        />
      ),
      className: "w-[3.938rem] ",
    },
  ];

  return (
    <div className={`${currentTanasction ? "mt-2" : ""} space-y-2`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-Primary-500 ">
          {currentTanasction ? "Current transactions" : "Transactions history"}
        </h3>
        {!currentTanasction && (
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search transactions"
          />
        )}
        <CFilterTab filterTabs={filterTabs} onFilterTabChange={setFilterTab} />
      </div>

      <div className="h-[15.5rem]  lg:h-[29rem]  overflow-auto ">
        <DataTable
          data={transactions || []}
          className="h-full"
          isLoading={isFetching}
          isError={isError}
          error={error}
          columns={columns}
          paging={false}
          emptyMessage="No transactions found"
        />
      </div>
    </div>
  );
};

export default TransactionsHistorySection;
