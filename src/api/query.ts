import { queryOptions } from "@tanstack/react-query";
import { fetchAll, fetchById } from "./client";
import type {
  ActiveEmployee,
  ActiveEmployeeFinance,
  AdministrativeData,
  CurrentCash,
  HighestPurCustomer,
  HighestSalesEmployee,
  TCustomerDetails,
  TCustomersList,
  TopItemMovement,
  TopItemStocK,
  TopSellingItem,
  Transaction,
  TransactionDetails,
  TUserDetails,
  TUsersList,
  VanCurrentStock,
} from "@/lib/types";


export const getUsersQueryOptions = (
  searchTerm: string,
  userType: string,
  currentPage: number,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
) =>
  queryOptions({
    queryKey: ["usersList", { searchTerm, userType, currentPage }],
    queryFn: () => {
      const type =
        userType === "S"
          ? "sales_employee"
          : userType === "W"
          ? "warehouse_employee"
          : "finance_employee";
      return fetchAll<TUsersList>(
        `/employee/${type}${
          searchTerm ? "/" + searchTerm : ""
        }?page=${currentPage}&limit=10`,
        setTotalPages
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getSalesEmployeeQueryOptions = () =>
  queryOptions({
    queryKey: ["salesEmployee"],
    queryFn: () => {
      return fetchAll<TUsersList>(`/employee/sales_employee`);
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
export const getFinanceEmployeeQueryOptions = () =>
  queryOptions({
    queryKey: ["financeEmployee"],
    queryFn: () => {
      return fetchAll<TUsersList>(`/employee/finance_employee`);
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
export const getUserDetailsQueryOptions = (userType: string, code?: string) =>
  queryOptions({
    queryKey: ["userDetails", { userType, code }],
    queryFn: () => {
      const type =
        userType === "S"
          ? "sales_employee"
          : userType === "W"
          ? "warehouse_employee"
          : "finance_employee";
      return fetchById<TUserDetails>(`/employee/${type}/${code}`);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!code,
  });
export const getCutomersQueryOptions = (
  searchTerm: string,
  currentPage: number,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
) =>
  queryOptions({
    queryKey: ["customersList", { searchTerm, currentPage }],
    queryFn: () => {
      return fetchAll<TCustomersList>(
        `/customer/management_data?page=${currentPage}&limit=15${
          searchTerm ? "&customer_name=" + searchTerm : ""
        }`,
        setTotalPages
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getCurrentStockQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["currentStockList"],
    queryFn: () => {
      return fetchAll<VanCurrentStock>(`/van/current_stock/${id}`);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getTransactionQueryOptions = (
  searchTerm: string,
  filter: string,
  currentTanasction: boolean,
  navLabel: string,
  id?: string
) =>
  queryOptions({
    queryKey: [
      "transactionList",
      { searchTerm, filter, navLabel, id, currentTanasction },
    ],
    queryFn: () => {
      const url =
        navLabel != "Customers"
          ? `/document${filter === "" ? "" : "/" + filter}${
              searchTerm ? "/" + searchTerm : ""
            }?limit=50&page=1${
              currentTanasction ? "&current_transactions=1" : ""
            }${id ? `&slp=${id}` : ""}`
          : `/customer/transaction_history${
              filter === "" ? "" : "/" + filter
            }${`/${id}`}?limit=50&page=1`;
      return fetchAll<Transaction>(url);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
export const getDocumentQueryOptions = (
  searchTerm: string,
  filter: string,
  currentPage: number,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
) =>
  queryOptions({
    queryKey: ["documentList", { searchTerm, filter, currentPage }],
    queryFn: () => {
      return fetchAll<Transaction>(
        `/document${filter === "" ? "" : "/" + filter}${
          searchTerm ? "/" + searchTerm : ""
        }?limit=50&page=${currentPage}`,
        setTotalPages
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

export const getTransactionByCodeQueryOptions = (
  filter: string,
  code?: number | string
) =>
  queryOptions({
    queryKey: ["transactionDetails", { code, filter }],
    queryFn: () => {
      return fetchById<TransactionDetails>(`/document/${filter}/${code}`);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!code,
  });
export const getCustomerDetailsQueryOptions = (code?: string) =>
  queryOptions({
    queryKey: ["customerDetails", { code }],
    queryFn: () => {
      return fetchById<TCustomerDetails>(`/customer/management_data/${code}`);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!code,
  });
export const getAdministrativeDataQueryOptions = (
  type: string,
  code?: string
) =>
  queryOptions({
    queryKey: ["administrativeData", { code, type }],
    queryFn: () => {
      return fetchById<AdministrativeData>(
        `/${type}/administrative_data/${code}`
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!code,
  });
export const getTopSellItemQueryOptions = () =>
  queryOptions({
    queryKey: ["topSellingItem"],
    queryFn: () => {
      return fetchAll<TopSellingItem>("/item/top_selling");
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getHighestPurCustomerQueryOptions = () =>
  queryOptions({
    queryKey: ["highestPurchaseCustomer"],
    queryFn: () => {
      return fetchAll<HighestPurCustomer>(
        "/customer/highest_purchases_customer"
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getHighestSalesEmployeeQueryOptions = () =>
  queryOptions({
    queryKey: ["highestSalesEmployee"],
    queryFn: () => {
      return fetchAll<HighestSalesEmployee>("/employee/highest_sales_employee");
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getActiveEmployeeQueryOptions = () =>
  queryOptions({
    queryKey: ["activeEmployee"],
    queryFn: () => {
      return fetchAll<ActiveEmployee>(`/employee?page=1&limit=80`);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getActiveEmployeeFinanceQueryOptions = () =>
  queryOptions({
    queryKey: ["activeEmployeeFinance"],
    queryFn: () => {
      return fetchAll<ActiveEmployeeFinance>(
        `/finance/active_employees?page=1&limit=80`
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getTopItemStockQueryOptions = () =>
  queryOptions({
    queryKey: ["topItemStock"],
    queryFn: () => {
      return fetchAll<TopItemStocK>("/item/in_out_stock?page=1&limit=100");
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getTopItemMovementkQueryOptions = () =>
  queryOptions({
    queryKey: ["topItemMovement"],
    queryFn: () => {
      return fetchAll<TopItemMovement>(
        "/finance/item_movement?page=1&limit=100"
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getCustomerNewApprovalQueryOptions = () =>
  queryOptions({
    queryKey: ["newCustomers"],
    queryFn: () => {
      return fetchAll<TCustomersList>("/customer/new_customers");
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
export const getCurrentTreasuryQueryOptions = (code?: string) =>
  queryOptions({
    queryKey: ["currentTreasury", { code }],
    queryFn: () => {
      return fetchById<CurrentCash>(
        `/finance/current_cash${code ? `?spc=${code}` : ""}`
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
