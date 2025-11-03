import ListsLayout from "@/components/layouts/ListsLayout";
import { useNavigate } from "react-router";
import {
  DataTable,
  StatusBadge,
  useTable,
  type Column,
  type FilterTab,
} from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getUsersQueryOptions } from "@/api/query";
import type { TUsersList } from "@/lib/types";
import { useUserContext } from "@/contexts/User/useUserContext";

const getColumns = (userType: string): Column<TUsersList>[] => {
  const baseColumns: Column<TUsersList>[] = [
    {
      key:
        userType === "S"
          ? "sales_person_code"
          : userType === "W"
          ? "warehouse_person_code"
          : "finance_person_code",
      header: "User ID",
      className: "w-20",
    },
    {
      key:
        userType === "S"
          ? "sales_person_name"
          : userType === "W"
          ? "warehouse_person_name"
          : "finance_person_name",
      header: "Username",
      className: "w-20",
    },
  ];

  if (userType === "S") {
    baseColumns.push(
      {
        key: "current_cash",
        header: "Current cash balance",
        className: "w-32",
      },
      {
        key: "current_stock",
        header: "Current van stock",
        className: "w-32",
      }
    );
  }

  if (userType === "W") {
    baseColumns.push({
      key: "phone_no",
      header: "Phone Number",
      className: "w-32",
    });
  }

  baseColumns.push({
    key: "status",
    header: "Status",
    render: (value: boolean) => <StatusBadge status={value} />,
    className: "w-24",
  });

  return baseColumns;
};
const UsersList = () => {
  const navigate = useNavigate();
  const { userType,setUserType,isAdmin } = useUserContext()
  const columns = getColumns(userType);

  const handleFilterTabChange = (tabKey: string) => {
    setUserType(tabKey);
  };

  const {
    currentPage,
    totalPages,
    setTotalPages,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
  } = useTable();
  const {
    data: usersList,
    isFetching,
    isError,
    error,
  } = useQuery(
    getUsersQueryOptions(searchTerm, userType, currentPage, setTotalPages)
  );
  const filterTabs: FilterTab[] = [
    {
      key: "S",
      label: "Sales employee",
      isActive: userType === "S",
    },
    {
      key: "W",
      label: "Warehouse employee",
      isActive: userType === "W",
    },
    {
      key: "F",
      label: "Finance employee",
      isActive: userType === "F",
    },
  ];
  const handleCreateUser = () => {};
  const handleRowClick = (user: TUsersList) => {
    const userCode =
      userType === "S"
        ? user.sales_person_code
        : userType === "W"
        ? user.warehouse_person_code
        : user.finance_person_code;
    navigate(`/yanabea/users/details/${userCode}`);
  };

  return (
    <ListsLayout
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search user"
      filterTabs={isAdmin? filterTabs : undefined}
      onFilterTabChange={isAdmin ? handleFilterTabChange : undefined}
      onCreateNew={handleCreateUser}
      createButtonLabel="Create user">
      <DataTable
        className="h-[calc(100dvh-16.8rem)]"
        data={usersList || []}
        columns={columns}
        onRowClick={handleRowClick}
        paging
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isFetching}
        isError={isError}
        error={error}
        onPageChange={setCurrentPage}
        emptyMessage="No users found"
      />
    </ListsLayout>
  );
};

export default UsersList;
