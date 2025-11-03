import { queryOptions } from "@tanstack/react-query";
import { fetchAll, fetchById } from "./client";
import type {
  AdministrativeData,
  TCustomerDetails,
  TCustomersList,
  Transaction,
  TransactionDetails,
  TUserDetails,
  TUsersList,
  VanCurrentStock,
} from "@/lib/types";

// // Item Queries
// /********************************************* */
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
// export const getItemDetailsQueryOptions = (id?: string) =>
//   queryOptions({
//     queryKey: ["itemDetails", { id }],
//     queryFn: () => fetchById<Item>(`/item/${id}`),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: id != undefined,
//   });

// //PO Queries
// //********************************************* */
// export const getPOQueryOptions = (
//   search: TSearch,
//   currentPage: number,
//   setTotalPage: React.Dispatch<React.SetStateAction<number>>
// ) =>
//   queryOptions({
//     queryKey: ["poList", search.searchValue, currentPage],
//     queryFn: () => {
//       const searchParam = search.searchValue
//         ? `${search.searchKey}=${search.searchValue}&`
//         : "";
//       return fetchAll<PO>(
//         `/purchase_order?${searchParam}limit=15&page=${
//           searchParam ? "1" : currentPage
//         }`,
//         setTotalPage
//       );
//     },
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//   });
// export const getPODetailsQueryOptions = (id?: string) =>
//   queryOptions({
//     queryKey: ["poDetails", { id }],
//     queryFn: () => fetchById<PO>(`/purchase_order/${id}`),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: id != undefined,
//   });

// //Transfer request Queries
// //********************************************* */
// export const getTransferQueryOptions = (
//   search: TSearch,
//   currentPage: number,
//   setTotalPage: React.Dispatch<React.SetStateAction<number>>,
//   type: "SITE" | "WHS"
// ) =>
//   queryOptions({
//     queryKey: [
//       `${type == "SITE" ? "siteTransferList" : "transferList"}`,
//       search.searchValue,
//       currentPage,
//     ],
//     queryFn: () => {
//       const searchParam = search.searchValue
//         ? `${search.searchKey}=${search.searchValue}&`
//         : "";
//       return fetchAll<WhsTransfer>(
//         `${
//           type == "SITE" ? "site_transfer_request" : "transfer"
//         }?${searchParam}limit=15&page=${searchParam ? "1" : currentPage}`,
//         setTotalPage
//       );
//     },
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//   });
// export const getTransferDetailsQueryOptions = (
//   type: "SITE" | "WHS",
//   id?: string
// ) =>
//   queryOptions({
//     queryKey: [
//       `${type == "SITE" ? "siteTransferDetails" : "WhtransferDetails"}`,
//       { id },
//     ],
//     queryFn: () =>
//       fetchById<WhsTransfer>(
//         `/${type == "SITE" ? "site_transfer_request" : "transfer"}/${id}`
//       ),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: id != undefined,
//   });

// //Return request Queries
// //********************************************* */
// export const getReturnQueryOptions = (
//   search: TSearch,
//   currentPage: number,
//   setTotalPage: React.Dispatch<React.SetStateAction<number>>
// ) =>
//   queryOptions({
//     queryKey: ["returnList", search.searchValue, currentPage],
//     queryFn: () => {
//       const searchParam = search.searchValue
//         ? `${search.searchKey}=${search.searchValue}&`
//         : "";
//       return fetchAll<Return>(
//         `/return_request?${searchParam}limit=15&page=${
//           searchParam ? "1" : currentPage
//         }`,
//         setTotalPage
//       );
//     },
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//   });
// export const getReturnDetailsQueryOptions = (id?: string) =>
//   queryOptions({
//     queryKey: ["returnDetails", { id }],
//     queryFn: () => fetchById<Return>(`/return_request/${id}`),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: id != undefined,
//   });

// //Waste Queries
// //********************************************* */
// export const getWasteQueryOptions = (
//   search: TSearch,
//   currentPage: number,
//   setTotalPage: React.Dispatch<React.SetStateAction<number>>
// ) =>
//   queryOptions({
//     queryKey: ["wasteList", search.searchValue, currentPage],
//     queryFn: () => {
//       const searchParam = search.searchValue
//         ? `${search.searchKey}=${search.searchValue}&`
//         : "";
//       return fetchAll<Waste>(
//         `/waste?${searchParam}limit=15&page=${searchParam ? "1" : currentPage}`,
//         setTotalPage
//       );
//     },
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//   });
// export const getWasteDetailsQueryOptions = (id?: string) =>
//   queryOptions({
//     queryKey: ["wasteDetails", { id }],
//     queryFn: () => fetchById<Waste>(`/waste/${id}`),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: id != undefined,
//   });

// //GRPO Queries
// //********************************************* */
// export const getGRPOueryOptions = (
//   search: TSearch,
//   currentPage: number,
//   setTotalPage: React.Dispatch<React.SetStateAction<number>>
// ) =>
//   queryOptions({
//     queryKey: ["grpoList", search.searchValue, currentPage],
//     queryFn: () => {
//       const searchParam = search.searchValue
//         ? `${search.searchKey}=${search.searchValue}&`
//         : "";
//       return fetchAll<PO>(
//         `/GRPO?${searchParam}limit=15&page=${searchParam ? "1" : currentPage}`,
//         setTotalPage
//       );
//     },
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//   });
// export const getGRPODetailsQueryOptions = (id?: string) =>
//   queryOptions({
//     queryKey: ["grpoDetails", { id }],
//     queryFn: () => fetchById<PO>(`/GRPO/${id}`),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: id != undefined,
//   });

// //Transfer Final Queries
// //********************************************* */
// export const getTransferFLQueryOptions = (
//   search: TSearch,
//   currentPage: number,
//   setTotalPage: React.Dispatch<React.SetStateAction<number>>,
//   type: "SITE" | "WHS"
// ) =>
//   queryOptions({
//     queryKey: [
//       `${type == "SITE" ? "siteTransferListFL" : "transferListFL"}`,
//       search.searchValue,
//       currentPage,
//     ],
//     queryFn: () => {
//       const searchParam = search.searchValue
//         ? `${search.searchKey}=${search.searchValue}&`
//         : "";
//       return fetchAll<WhsTransfer>(
//         `${
//           type == "SITE" ? "site_transfer" : "transfer_handheld"
//         }?${searchParam}limit=15&page=${searchParam ? "1" : currentPage}`,
//         setTotalPage
//       );
//     },
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//   });
// export const getTransferDetailsFLQueryOptions = (
//   type: "SITE" | "WHS",
//   id?: string
// ) =>
//   queryOptions({
//     queryKey: [
//       `${type == "SITE" ? "siteTransferDetailsFL" : "transferDetailsFL"}`,
//       { id },
//     ],
//     queryFn: () =>
//       fetchById<WhsTransfer>(
//         `/${type == "SITE" ? "site_transfer" : "transfer_handheld"}/${id}`
//       ),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: id != undefined,
//   });

// //Return Final Queries
// //********************************************* */
// export const getReturnFLQueryOptions = (
//   search: TSearch,
//   currentPage: number,
//   setTotalPage: React.Dispatch<React.SetStateAction<number>>
// ) =>
//   queryOptions({
//     queryKey: ["returnListFL", search.searchValue, currentPage],
//     queryFn: () => {
//       const searchParam = search.searchValue
//         ? `${search.searchKey}=${search.searchValue}&`
//         : "";
//       return fetchAll<Return>(
//         `/return?${searchParam}limit=15&page=${
//           searchParam ? "1" : currentPage
//         }`,
//         setTotalPage
//       );
//     },
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//   });
// export const getReturnFLDetailsQueryOptions = (id?: string) =>
//   queryOptions({
//     queryKey: ["returnDetailsFL", { id }],
//     queryFn: () => fetchById<Return>(`/return/${id}`),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: id != undefined,
//   });

// //Vendors Queries
// //********************************************* */
// export const getVendorsQueryOptions = (
//   search: TSearch,
//   currentPage: number,
//   setTotalPage: React.Dispatch<React.SetStateAction<number>>
// ) =>
//   queryOptions({
//     queryKey: ["vendorList", search.searchValue, currentPage],
//     queryFn: () => {
//       const searchParam = search.searchValue
//         ? `${search.searchKey}=${search.searchValue}&`
//         : "";
//       return fetchAll<Vendor>(
//         `/vendor?${searchParam}limit=15&page=${
//           searchParam ? "1" : currentPage
//         }`,
//         setTotalPage
//       );
//     },
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//   });
// export const getVendorDetailsQueryOptions = (id?: string) =>
//   queryOptions({
//     queryKey: ["vendorDetails", { id }],
//     queryFn: () => fetchById<Vendor>(`/vendor?vendorCode=${id}`),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: id != undefined,
//   });

// //Stock Queries
// //********************************************* */
// export const getStockCountQueryOptions = (
//   search: TSearch,
//   currentPage: number,
//   setTotalPage: React.Dispatch<React.SetStateAction<number>>
// ) =>
//   queryOptions({
//     queryKey: ["stockCountList", search.searchValue, currentPage],
//     queryFn: () => {
//       const searchParam = search.searchValue
//         ? `${search.searchKey}=${search.searchValue}&`
//         : "";
//       return fetchAll<StockCount>(
//         `/inventory_count?${searchParam}limit=15&page=${
//           searchParam ? "1" : currentPage
//         }`,
//         setTotalPage
//       );
//     },
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//   });
// export const getStockCountDetailsQueryOptions = (id?: string) =>
//   queryOptions({
//     queryKey: ["stockCountDetails", { id }],
//     queryFn: () => fetchById<StockCount>(`/inventory_count/${id}`),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: id != undefined,
//   });

// //Zone Queries
// //********************************************* */
// export const getZoneItemsQueryOptions = (
//   zoneId: string | undefined,
//   search: string
// ) =>
//   queryOptions({
//     queryKey: ["zoneItems", zoneId || search],
//     queryFn: () => fetchAll<ZoneItem>(`/mobile/zone/${zoneId || search}`),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     enabled: !!(zoneId || search),
//   });
// export const getZoneDashboardQueryOptions = () =>
//   queryOptions({
//     queryKey: ["zoneDashBoard"],
//     queryFn: () => fetchById<ZoneDashboard>(`/zone/dashboard`),
//     refetchOnWindowFocus: false,
//     refetchOnMount: true,
//   });
