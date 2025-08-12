import ListsLayout from "@/components/layouts/ListsLayout";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  DataTable,
  StatusBadge,
  useTable,
  type Column,
  type FilterTab
} from "@/components";

type User = {
  id: string;
  username: string;
  currentCashBalance: string;
  currentVanStock: string;
  status: "Active" | "Inactive";
};

const users: User[] = [
  {
    id: "6754",
    username: "Malik Alassawi",
    currentCashBalance: "0 LYD",
    currentVanStock: "600 Piece, 250 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Abdelrahman Abdry",
    currentCashBalance: "5,000 LYD",
    currentVanStock: "450 Piece, 160 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Lina Orfi",
    currentCashBalance: "160 LYD",
    currentVanStock: "600 Piece, 250 Box",
    status: "Inactive",
  },
  {
    id: "6754",
    username: "Haneen Elshagasbi",
    currentCashBalance: "12,000 LYD",
    currentVanStock: "450 Piece, 160 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Malik Alassawi",
    currentCashBalance: "0 LYD",
    currentVanStock: "600 Piece, 250 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Abdelrahman Abdry",
    currentCashBalance: "5,000 LYD",
    currentVanStock: "450 Piece, 160 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Lina Orfi",
    currentCashBalance: "160 LYD",
    currentVanStock: "600 Piece, 250 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Haneen Elshagasbi",
    currentCashBalance: "12,000 LYD",
    currentVanStock: "450 Piece, 160 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Malik Alassawi",
    currentCashBalance: "0 LYD",
    currentVanStock: "600 Piece, 250 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Abdelrahman Abdry",
    currentCashBalance: "5,000 LYD",
    currentVanStock: "450 Piece, 160 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Lina Orfi",
    currentCashBalance: "160 LYD",
    currentVanStock: "600 Piece, 250 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Haneen Elshagasbi",
    currentCashBalance: "12,000 LYD",
    currentVanStock: "450 Piece, 160 Box",
    status: "Active",
  },
  {
    id: "6754",
    username: "Abdelrahman Abdry",
    currentCashBalance: "5,000 LYD",
    currentVanStock: "450 Piece, 160 Box",
    status: "Inactive",
  },
  {
    id: "6754",
    username: "Lina Orfi",
    currentCashBalance: "160 LYD",
    currentVanStock: "600 Piece, 250 Box",
    status: "Active",
  },
];
  const columns: Column<User>[] = [
    {
      key: "id",
      header: "User ID",
      className: "w-20",
    },
    {
      key: "username",
      header: "Username",
      className: "min-w-40",
    },
    {
      key: "currentCashBalance",
      header: "Current cash balance",
      className: "min-w-32",
    },
    {
      key: "currentVanStock",
      header: "Current van stock",
      className: "min-w-40",
    },
    {
      key: "status",
      header: "Status",
      render: (value) => <StatusBadge status={value} />,
      className: "w-24",
    },
  ];
const UsersList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sales");


    const {
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
  } = useTable();



  const filterTabs: FilterTab[] = [
    { key: "sales", label: "Sales employee", isActive: activeTab === "sales" },
    {
      key: "warehouse",
      label: "Warehouse employee",
      isActive: activeTab === "warehouse",
    },
    {
      key: "finance",
      label: "Finance employee",
      isActive: activeTab === "finance",
    },
  ];

  const handleCreateUser = () => {
    navigate("/yanabea/users/create");
  };
  const handleRowClick = (user: User) => {
    navigate(`/yanabea/users/details/${user.id}`);
  };


  return (
    <ListsLayout
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search"
      filterTabs={filterTabs}
      onFilterTabChange={setActiveTab}
      onCreateNew={handleCreateUser}
      createButtonLabel="Create user">
      <DataTable
        className="h-[calc(100dvh-16.625rem)]"
        data={users}
        columns={columns}
        onRowClick={handleRowClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyMessage="No users found"
      />
    </ListsLayout>
  );
};

export default UsersList;
