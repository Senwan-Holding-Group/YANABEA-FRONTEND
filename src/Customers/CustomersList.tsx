import ListsLayout from "@/components/layouts/ListsLayout";
import { useNavigate } from "react-router";
import {
  DataTable,
  StatusBadge,
  ApprovalStatusBadge,
  useTable,
  type Column,
} from "@/components";

type Customer = {
  id: string;
  approvalStatus: "New" | "Approved" | "Rejected";
  nameEnglish: string;
  nameArabic: string;
  status: "Active" | "Inactive";
};

const CustomersList = () => {
  const navigate = useNavigate();

  const customers: Customer[] = [
    {
      id: "6754",
      approvalStatus: "New",
      nameEnglish: "Malik Alassawi",
      nameArabic: "مالك الأساوي",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "New",
      nameEnglish: "Abdelrahman Abdry",
      nameArabic: "عبد الرحمن البدري",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "Approved",
      nameEnglish: "Lina Orfi",
      nameArabic: "لينة العرفي",
      status: "Inactive",
    },
    {
      id: "6754",
      approvalStatus: "New",
      nameEnglish: "Haneen Elshagasbi",
      nameArabic: "حنين الشقاصبي",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "New",
      nameEnglish: "Malik Alassawi",
      nameArabic: "مالك الأساوي",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "New",
      nameEnglish: "Abdelrahman Abdry",
      nameArabic: "عبد الرحمن البدري",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "Approved",
      nameEnglish: "Lina Orfi",
      nameArabic: "لينة العرفي",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "Approved",
      nameEnglish: "Haneen Elshagasbi",
      nameArabic: "حنين الشقاصبي",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "Approved",
      nameEnglish: "Malik Alassawi",
      nameArabic: "مالك الأساوي",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "Rejected",
      nameEnglish: "Abdelrahman Abdry",
      nameArabic: "عبد الرحمن البدري",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "Approved",
      nameEnglish: "Lina Orfi",
      nameArabic: "لينة العرفي",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "Approved",
      nameEnglish: "Haneen Elshagasbi",
      nameArabic: "حنين الشقاصبي",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "Approved",
      nameEnglish: "Abdelrahman Abdry",
      nameArabic: "مالك الأساوي",
      status: "Inactive",
    },
    {
      id: "6754",
      approvalStatus: "Approved",
      nameEnglish: "Lina Orfi",
      nameArabic: "عبد الرحمن البدري",
      status: "Active",
    },
    {
      id: "6754",
      approvalStatus: "Rejected",
      nameEnglish: "Haneen Elshagasbi",
      nameArabic: "لينة العرفي",
      status: "Active",
    },
  ];

  const {
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
  } = useTable();

  const columns: Column<Customer>[] = [
    {
      key: "id",
      header: "Customer ID",
      className: "w-20",
    },
    {
      key: "approvalStatus",
      header: "Approval status",
      render: (value) => <ApprovalStatusBadge status={value} />,
      className: "w-20",
    },
    {
      key: "nameEnglish",
      header: "Name (English)",
      className: "w-20",
    },
    {
      key: "nameArabic",
      header: "Name (Arabic)",
      className: "w-20 text-right",
    },
    {
      key: "status",
      header: "Status",
      render: (value) => <StatusBadge status={value} />,
      className: "w-24 ",
    },
  ];

  const handleCreateCustomer = () => {
    navigate("/yanabea/customers/create");
  };

  const handleRowClick = (customer: Customer) => {
    navigate(`/yanabea/customers/details/${customer.id}`);
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
        data={customers}
        columns={columns}
        onRowClick={handleRowClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        emptyMessage="No customers found"
      />
    </ListsLayout>
  );
};

export default CustomersList;
