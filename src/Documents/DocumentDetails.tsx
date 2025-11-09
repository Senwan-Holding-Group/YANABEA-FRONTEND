import {
  getAdministrativeDataQueryOptions,
  getTransactionByCodeQueryOptions,
} from "@/api/query";
import { DataTable, type Column } from "@/components";
import DataRenderer from "@/components/DataRenderer";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import AdministrativeDataSkeleton from "@/components/skeletons/AdministrativeDataSkeleton";
import { Button } from "@/components/ui/button";
import type { TransactionDetails } from "@/lib/types";
import { formatTimeTo12Hour } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "react-router";
const getColumns = (
  docType: string | undefined
): Column<TransactionDetails["doc_lines"][0]>[] => {
  const baseColumns: Column<TransactionDetails["doc_lines"][0]>[] = [
    {
      key: "code" as const,
      header: "Code",
      className: "w-20",
    },
    {
      key: "description" as const,
      header: "Item",
      className: "w-24",
    },
    {
      key: "quantity" as const,
      header: "Qty",
      className: "w-24",
    },
  ];

  if (docType === "Sales" || docType === "Return") {
    baseColumns.push(
      {
        key: "price" as const,
        header: "Price",
        className: "w-32",
      },
      {
        key: "line_total" as const,
        header: "Line total",
        className: "w-32",
      }
    );
  }

  return baseColumns;
};
const DocumentDetails = () => {
  const { filter, id } = useParams();
  const {
    data: documentDetails,
    isFetching,
    isError,
    error,
  } = useQuery({
    ...getTransactionByCodeQueryOptions(filter!, id),
    enabled: !!id,
  });

  const administrativeData = useQuery(
    getAdministrativeDataQueryOptions("document", id)
  );
  return (
    <DetailsLayout title={id!}>
      <DataRenderer isLoading={isFetching} isError={isError} error={error}>
        <div className="space-y-8">
          <div className="flex gap-x-4  min-w-[80rem]">
            <div className="space-y-4 100 w-2/3">
              <h1 className="text-Primary-500 font-semibold text-lg leading-[100%]">
                Transaction data
              </h1>
              <div className="flex gap-x-4 ">
                <div className="flex flex-col gap-y-6 w-full">
                  <span className="px-3  py-2.5 bg-Primary-25  border  h-10 inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl">
                    {documentDetails?.code}
                  </span>
                  <span className="px-3 py-2.5 bg-Primary-25  border  h-10 inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl">
                    {documentDetails?.doc_type}
                  </span>
                </div>
                <div className="flex flex-col gap-y-6 w-full">
                  <span className="px-3 py-2.5 bg-Primary-25  border  h-10 inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl">
                    {formatTimeTo12Hour(
                      documentDetails?.doc_time || documentDetails?.time
                    )}
                  </span>
                  <span className="px-3 py-2.5 bg-Primary-25  border  h-10 inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl">
                    {documentDetails &&
                      format(
                        new Date(
                          documentDetails.doc_date?.split("T")[0] ||
                            documentDetails.date?.split("T")[0]
                        ),
                        "dd/MM/yyyy"
                      )}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4 w-1/3 ">
              <h1 className="text-Primary-500 font-semibold text-lg leading-[100%]">
                Customer data
              </h1>
              <div className="flex flex-col gap-y-6">
                <span className="px-3  py-2.5 bg-Primary-25  border  h-10 inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl">
                  {documentDetails?.custployee_code}
                </span>
                <span className="px-3 py-2.5 bg-Primary-25  border  h-10 inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl">
                  {documentDetails?.custployee_name}
                </span>
              </div>
            </div>
            <div className="space-y-4 w-1/3 ">
              <h1 className="text-Primary-500 font-semibold text-lg leading-[100%]">
                Sales employee data
              </h1>
              <div className="flex flex-col gap-y-6">
                <span className="px-3  py-2.5 bg-Primary-25  border  h-10 inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl">
                  {documentDetails?.sales_person_code}
                </span>
                <span className="px-3 py-2.5 bg-Primary-25  border  h-10 inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl">
                  {documentDetails?.sales_person_name}
                </span>
              </div>
            </div>
          </div>
          <div className="min-w-[80rem] space-y-4">
            <h1 className="text-Primary-500 font-semibold text-lg leading-[100%]">
              Invoice summary
            </h1>
            <div>
              {documentDetails?.doc_type != "Withdraw" ? (
                <DataTable
                  className="h-[9.813rem]"
                  columns={getColumns(documentDetails?.doc_type)}
                  data={documentDetails?.doc_lines || []}
                  paging={false}
                  isLoading={false}
                  error={null}
                  isError={false}
                />
              ) : (
                <div className="flex flex-col *:h-10 w-[calc(50%-1rem)]">
                  <span className="bg-Primary-50 px-4 py-2.5 rounded-t-xl text-base font-semibold leading-[100%] text-Primary-500 ">
                    Cash withdraw amount
                  </span>
                  <div className="border rounded-b-xl border-Primary-25 px-4 py-2 flex items-center">
                    <span className="w-1/3  text-sm font-semibold leading-[100%] text-Black">
                      {documentDetails?.cash_withdraw_amount}
                    </span>
                    <span className={`w-2/3 text-sm font-semibold leading-[100%] ${
                      documentDetails?.status?.includes('Over') || documentDetails?.status?.includes('Short') 
                        ? 'text-Error-500' 
                        : documentDetails?.status?.includes('Match') 
                        ? 'text-Success-500' 
                        : 'text-Black'
                    }`}>
                      {documentDetails?.status}
                    </span>
                  </div>
                </div>
              )}
              {documentDetails?.doc_type === "Sales" && (
                <div className="flex justify-end mt-2 items-end  gap-x-4">
                  <span className="text-Gray-900 flex items-end h-[1.188rem] text-sm font-medium leading-[100%]">
                    Document total:
                  </span>
                  <span className="h-8 text-Black  flex items-center text-2xl font-bold leading-[100%]">
                    {documentDetails?.doc_total}
                    <span className="font-semibold text-lg">LYD</span>
                  </span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant={"outline"}
            className="border w-[19.25rem] border-Primary-100 rounded-xl text-Primary-500 text-lg">
            Print Invoice
          </Button>

          {administrativeData.isFetching ? (
            <AdministrativeDataSkeleton />
          ) : (
            <div className="space-y-4  w-80">
              <h3 className="text-lg font-semibold text-Primary-500">
                Administrative data
              </h3>
              <div className="*:h-10 **:px-2 **:py-4">
                <div className="flex items-center gap-x-8">
                  <span className="text-Primary-500 font-medium  w-24">
                    Created by
                  </span>
                  <span className="text-Primary-500"> {administrativeData.data?.created_by}</span>
                </div>
                <div className="flex items-center gap-x-8">
                  <span className="text-Primary-500 font-medium w-24">
                    Created on
                  </span>
                  <span className="text-Primary-500"> {administrativeData.data?.created_on?.split("T")[0]}</span>
                </div>
                <div className="flex items-center gap-x-8">
                  <span className="text-Primary-500 font-medium w-24">
                    Edited by
                  </span>
                  <span className="text-Primary-500">{administrativeData.data?.edited_by}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DataRenderer>
    </DetailsLayout>
  );
};

export default DocumentDetails;
