import ListsLayout from "@/components/layouts/ListsLayout";
import { useNavigate } from "react-router";
import {
  DataTable,
  StatusBadge,
  ApprovalStatusBadge,
  useTable,
  type Column,
} from "@/components";
import type { TCustomersList } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getCutomersQueryOptions } from "@/api/query";



const columns: Column<TCustomersList>[] = [
  {
    key: "customer_code",
    header: "Customer ID",
    className: "w-20",
  },
  {
    key: "aproval_status",
    header: "Approval status",
    render: (value) => <ApprovalStatusBadge status={value} />,
    className: "w-20",
  },
  {
    key: "customer_eng_name",
    header: "Name (English)",
    className: "w-20",
  },
  {
    key: "customer_name",
    header: "Name (Arabic)",
    className: "w-20",
  },
  {
    key: "status",
    header: "Status",
    render: (value) => <StatusBadge status={value} />,
    className: "w-24 ",
  },
];
const CustomersList = () => {
  const navigate = useNavigate();
  const {
    currentPage,
    totalPages,
    setTotalPages,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
  } = useTable();
  const {
    data: customersList,
    isFetching,
    isError,
    error,
  } = useQuery(
    getCutomersQueryOptions(searchTerm, currentPage, setTotalPages)
  );

  const handleCreateCustomer = () => {
  };

  const handleRowClick = (customer: TCustomersList) => {
    navigate(`/yanabea/customers/details/${customer.customer_code}`);
  };

  return (
    <ListsLayout
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search customers"
      onCreateNew={handleCreateCustomer}
      createButtonLabel="Create customer">
      <DataTable
        className="h-[calc(100dvh-13.625rem)]"
        data={customersList || []}
        isLoading={isFetching}
        isError={isError}
        error={error}
        columns={columns}
        onRowClick={handleRowClick}
        paging
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyMessage="No customers found"
      />
    </ListsLayout>
  );
};

export default CustomersList;
