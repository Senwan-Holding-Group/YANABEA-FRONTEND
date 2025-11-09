import { getActiveEmployeeQueryOptions } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import EmployeeListSkeleton from "../../components/skeletons/EmployeeListSkeleton";
import type { ActiveEmployee } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/pro-regular-svg-icons";
type ActiveEmployeeListProps = {
  className: string;
};
const ActiveEmployeeFinanceSalesList = ({
  className,
}: ActiveEmployeeListProps) => {
  const {
    data: activeSalesEmployee,
    isFetching: isactiveSalesEmployeeFetching,
    isError: isactiveSalesEmployeeError,
  } = useQuery(getActiveEmployeeQueryOptions());
  console.log(activeSalesEmployee);
  
  return (
    <div
      className={`${className}  xl:w-[24rem] overflow-y-scroll space-y-4 rounded-xl p-4 bg-Primary-25 shadow-CS`}>
      <h1 className="h-8 font-bold text-2xl text-Primary-400 leading-[100%]">
        Active employee list
      </h1>
      {isactiveSalesEmployeeFetching ? (
        <EmployeeListSkeleton />
      ) : isactiveSalesEmployeeError ? (
        <div className="h-8 flex items-center text-Error-500 text-sm">
          Error loading data
        </div>
      ) : (
        activeSalesEmployee && (
          <div className="grid  gap-4">
            {activeSalesEmployee.map((activeSalesEmployee: ActiveEmployee) => (
              <div className="bg-white overflow-x-scroll text-nowrap space-y-2 rounded-xl pt-2 pr-4 pb-2 pl-4 border border-Primary-25 shadow-CS">
                <div className="flex items-center gap-x-2 ">
                  <span className="text-sm h-[1.188rem]  font-semibold text-Primary-500">
                    {activeSalesEmployee.sales_person_code}
                  </span>
                  <span className="text-Primary-500   h-[1.188rem] text-sm font-semibold">
                    {activeSalesEmployee.sales_person_name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs h-4 font-bold text-Gray-800 ">
                    Employee current cash amount
                  </div>
                  <Button
                    size={"icon"}
                    variant={"link"}
                    className="text-Primary-500 h-[30px] w-[30px] bg-Primary-25 rounded-full cursor-pointer hover:text-Primary-600">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Button>
                </div>
                <h1 className="font-semibold text-lg text-Black h-6">
                  {activeSalesEmployee.current_cash_amount}&nbsp;LYD
                </h1>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ActiveEmployeeFinanceSalesList;
