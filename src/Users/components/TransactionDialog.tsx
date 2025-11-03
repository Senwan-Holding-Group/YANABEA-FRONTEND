import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faPrint,
} from "@fortawesome/pro-light-svg-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getTransactionByCodeQueryOptions } from "@/api/query";
import { useState } from "react";
import { DataTable, TypeBadge, type Column } from "@/components";
import DataRenderer from "@/components/DataRenderer";
import { format } from "date-fns";
import { formatTimeTo12Hour } from "@/lib/utils";
import type { TransactionDetails } from "@/lib/types";
import { filterTypes } from "@/lib/constants";

type TransactionDialogProps = {
  code: number | undefined;
  filter: string;
  type: string | undefined;
};
const columns: Column<TransactionDetails["doc_lines"][0]>[] = [
  {
    key: "code",
    header: "Code",
    className: "w-20",
  },
  {
    key: "description",
    header: "Item",
    className: "w-24",
  },
  {
    key: "quantity",
    header: "Qty",
    className: "w-24",
  },
  {
    key: "price",
    header: "Price",
    className: "w-32",
  },
  {
    key: "line_total",
    header: "Line total",
    className: "w-32",
  },
];

const TransactionDialog = ({ code, filter, type }: TransactionDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const actualFilter = filter === "" ? filterTypes[type!] : filter;

  const {
    data: transactionDetails,
    isFetching,
    isError,
    error,
  } = useQuery({
    ...getTransactionByCodeQueryOptions(actualFilter, code),
    enabled: isOpen && !!code,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"link"}
          className="text-Primary-500 size-4 cursor-pointer hover:text-Primary-600">
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="size-" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-4xl   rounded-xl ">
        <DialogHeader className="h-10 bg-Primary-50 rounded-t-xl py-2 px-4">
          <DialogTitle className="h-full flex items-center text-Primary-500 text-lg leading-[100%] font-semibold ">
            {code}
          </DialogTitle>
        </DialogHeader>
        <DataRenderer isError={isError} isLoading={isFetching} error={error}>
          {transactionDetails && (
            <div className="  px-4 pt-4 pb-6 space-y-4">
              <div className="flex justify-between items-center">
                <span>
                  <TypeBadge type={transactionDetails?.doc_type} />
                </span>
                <span>
                  {formatTimeTo12Hour(
                    transactionDetails?.time || transactionDetails?.doc_time
                  )}
                </span>
                <span>
                  {format(
                    new Date(
                      transactionDetails.date?.split("T")[0] ||
                        transactionDetails.doc_date?.split("T")[0]
                    ),
                    "dd/MM/yyyy"
                  )}
                </span>
                <span className="border border-Primary-50 shadow-CS bg-Primary-25 h-[1.875rem] w-8 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faPrint} />
                </span>
              </div>
              <div className="flex flex-col gap-y-4 leading-[100%] font-medium text-base *:h-[1.313rem] ">
                {transactionDetails.doc_type === "sales" ||
                transactionDetails.doc_type === "return" ? (
                  <>
                    <span>
                      Customer Code: {transactionDetails.custployee_code}
                    </span>
                    <span>
                      Customer Name: {transactionDetails.custployee_name}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      Sales Employee Code:{" "}
                      {transactionDetails.custployee_code ||
                        transactionDetails.sales_person_code}
                    </span>
                    <span>
                      Sales Employee Name:{" "}
                      {transactionDetails.custployee_name ||
                        transactionDetails.sales_person_name}
                    </span>
                  </>
                )}
              </div>
              {type != "Withdraw" ? (
                <>
                  <DataTable
                    className="h-[calc(24.125rem-12.75rem)]"
                    columns={columns}
                    data={transactionDetails.doc_lines || []}
                    paging={false}
                    isLoading={false}
                    error={null}
                    isError={false}
                  />
                  <div className="flex justify-end h-6 items-center gap-x-4">
                    <span className="text-Gray-900 text-sm font-medium leading-[100%]">
                      Document total: {transactionDetails?.doc_total} LYD
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col *:h-10 ">
                  <span className="bg-Primary-50 px-4 py-2.5 rounded-t-xl text-base font-semibold leading-[100%] text-Primary-500 ">
                    Cash withdraw amount
                  </span>
                  <div className="border-b border-Primary-25 px-4 py-2 flex items-center">
                    <span className="w-1/3  text-sm font-semibold leading-[100%] text-Black">
                      {transactionDetails?.cash_withdraw_amount}
                    </span>
                    <span className=" w-2/3 text-sm font-semibold leading-[100%] text-Black">
                      {transactionDetails?.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </DataRenderer>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
