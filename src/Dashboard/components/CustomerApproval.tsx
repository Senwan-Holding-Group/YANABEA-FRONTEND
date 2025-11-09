import { getCustomerNewApprovalQueryOptions } from "@/api/query";
import { Button } from "@/components/ui/button";
import ApprovalButtons from "@/Customers/components/ApprovalButtons";
import type { TCustomersList } from "@/lib/types";
import { faArrowUpRightFromSquare } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import CustomerApprovalSkeleton from "@/components/skeletons/CustomerApprovalSkeleton";

const CustomerApproval = () => {
  const navigate = useNavigate();
  const {
    data: customerApproval,
    isFetching: isCustomerApprovalFetching,
    isError: isCustomerApprovalError,
  } = useQuery(getCustomerNewApprovalQueryOptions());
  return (
    <div
      className={` flex-1 overflow-y-scroll space-y-4 rounded-xl p-4 bg-Primary-25 shadow-CS`}>
      <h1 className="h-8 font-bold text-2xl text-Primary-400 leading-[100%]">
        New customers approval
      </h1>
      {isCustomerApprovalFetching ? (
        <CustomerApprovalSkeleton />
      ) : isCustomerApprovalError ? (
        <div className="h-8 flex items-center text-Error-500 text-sm">
          Error loading data
        </div>
      ) : (
        customerApproval && (
          <div className="h-[calc(100dvh-23.25rem)] overflow-y-scroll w-full bg-white rounded-xl px-4 py-2 space-y-2 shadow-CS">
            {customerApproval.map((customerApproval: TCustomersList, index) => (
              <div
                key={index}
                className="h-12 py-2 flex items-center justify-between pr-3 border-b border-e-Primary-25">
                <div className="flex items-center gap-x-2 h-[1.188rem] font-semibold text-sm text-Primary-500">
                  <span>{customerApproval.customer_code}</span>
                  <span>{customerApproval.customer_name}</span>
                </div>
                <div className="flex items-center gap-x-4 h-8">
                  <ApprovalButtons
                    customer_code={customerApproval.customer_code}
                  />
                  <Button
                    size={"icon"}
                    variant={"link"}
                    onClick={() => {
                      navigate(
                        `/yanabea/customers/details/${customerApproval.customer_code}`
                      );
                    }}
                    className="text-Primary-500 size-4 rounded-full cursor-pointer hover:text-Primary-600">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default CustomerApproval;
