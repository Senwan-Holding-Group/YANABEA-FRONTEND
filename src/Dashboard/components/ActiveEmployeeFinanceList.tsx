import { getActiveEmployeeFinanceQueryOptions } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import EmployeeListSkeleton from "../../components/skeletons/EmployeeListSkeleton";
import type { ActiveEmployeeFinance } from "@/lib/types";
type ActiveEmployeeListProps = {
  className: string;
};
const ActiveEmployeeFinanceList = ({ className }: ActiveEmployeeListProps) => {
  const {
    data: activeEmployee,
    isFetching: isactiveEmployeeFetching,
    isError: isactiveEmployeeError,
  } = useQuery(getActiveEmployeeFinanceQueryOptions());
  return (
    <div
      className={`${className}  xl:w-[24rem] overflow-y-scroll space-y-4 rounded-xl p-4 bg-Primary-25 shadow-CS`}>
      <h1 className="h-8 font-bold text-2xl text-Primary-400 leading-[100%]">
        Employee’s treasury amount
      </h1>
      {isactiveEmployeeFetching ? (
        <EmployeeListSkeleton />
      ) : isactiveEmployeeError ? (
        <div className="h-8 flex items-center text-Error-500 text-sm">
          Error loading data
        </div>
      ) : (
        activeEmployee && (
          <div className="grid  gap-4">
            {activeEmployee.map((activeEmployee: ActiveEmployeeFinance) => (
              <div className="bg-white overflow-x-scroll text-nowrap space-y-2 rounded-xl pt-2 pr-4 pb-2 pl-4 border border-Primary-25 shadow-CS">
                <div className="flex items-center gap-x-2 ">
                  <span className="text-sm h-[1.188rem]  font-semibold text-Primary-500">
                    {activeEmployee.finance_person_code}
                  </span>
                  <span className="text-Primary-500   h-[1.188rem] text-sm font-semibold">
                    {activeEmployee.finance_person_name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs h-4 font-bold text-Gray-800 ">
                    Employee treasury
                  </div>

                  <h1 className="font-semibold text-lg text-Black h-6">
                    {activeEmployee.current_cash_ammount}&nbsp;LYD
                  </h1>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ActiveEmployeeFinanceList;
