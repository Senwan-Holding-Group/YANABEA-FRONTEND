import { getHighestPurCustomerQueryOptions, getHighestSalesEmployeeQueryOptions, getTopSellItemQueryOptions } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import DashboardCardSkeleton from "../../components/skeletons/DashboardCardSkeleton";

const DashboradTop = () => {
     const {
    data: topSellingItem,
    isFetching: isTopItemFetching,
    isError: isTopItemError,
  } = useQuery(getTopSellItemQueryOptions());
  const {
    data: higestSalesEmployee,
    isFetching: isEmployeeFetching,
    isError: isEmployeeError,
  } = useQuery(getHighestSalesEmployeeQueryOptions());
  const {
    data: highestPurCustomer,
    isFetching: isCustomerFetching,
    isError: isCustomerError,
  } = useQuery(getHighestPurCustomerQueryOptions());
  return (
 <div className=" gap-4 grid lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:h-[6.375rem] h-[8rem] flex-1 text-nowrap overflow-x-scroll  py-2 pr-6 pl-4 space-y-4 border border-Primary-25 shadow-CS rounded-xl">
          <h1 className="text-lg h-6 flex items-center font-semibold text-Primary-500 leading-[100%]">
            Top selling item
          </h1>
          {isTopItemFetching ? (
            <DashboardCardSkeleton />
          ) : isTopItemError ? (
            <div className="h-8 flex items-center text-Error-500 text-sm">
              Error loading data
            </div>
          ) : (
            topSellingItem && (
              <div className="h-8  flex justify-between xl:flex-row flex-col gap-4">
                <div className="flex items-center  gap-x-2">
                  <span className="h-[1.188rem] flex items-center font-semibold text-sm leading-[100%] text-Black">
                    {topSellingItem[0].item_code}
                  </span>
                  <h1 className="h-[1.313rem] flex items-end font-medium text-base leading-[100%] text-Black">
                    {topSellingItem[0].item_name}
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="font-bold text-2xl leading-[100%]  text-Black">
                    {topSellingItem[0].total_sales}
                    <span className="font-medium text-sm leading-[100%]">
                      PCS
                    </span>
                  </span>
                  <span className="rounded-[0.875rem] flex items-center bg-Success-50 px-2 py-0.5 text-Success-600 text-base font-normal leading-[100%] h-[1.563rem]">
                    Top item
                  </span>
                </div>
              </div>
            )
          )}
        </div>
        <div className="xl:h-[6.375rem] h-[8rem] flex-1 text-nowrap overflow-x-scroll  py-2 pr-6 pl-4 space-y-4 border border-Primary-25 shadow-CS rounded-xl">
          <h1 className="text-lg h-6 flex items-center font-semibold text-Primary-500 leading-[100%]">
            Highest sales (Employee)
          </h1>
          {isEmployeeFetching ? (
            <DashboardCardSkeleton />
          ) : isEmployeeError ? (
            <div className="h-8 flex items-center text-Error-500 text-sm">
              Error loading data
            </div>
          ) : (
            higestSalesEmployee && (
              <div className="h-8  flex  justify-between xl:flex-row flex-col gap-4">
                <div className="flex items-center  gap-x-2">
                  <span className="h-[1.188rem] flex items-center font-semibold text-sm leading-[100%] text-Black">
                    {higestSalesEmployee[0].sales_person_code}
                  </span>
                  <h1 className="h-[1.313rem] flex items-center font-medium text-base leading-[100%] text-Black">
                    {higestSalesEmployee[0].sales_person_name}
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="font-bold text-2xl leading-[100%]  text-Black">
                    {higestSalesEmployee[0].total_sales.toFixed(2)}
                    <span className="font-medium text-sm leading-[100%]">
                      Item
                    </span>
                  </span>
                  <span className="rounded-[0.875rem] flex items-center bg-Success-50 px-2 py-0.5 text-Success-600 text-base font-normal leading-[100%] h-[1.563rem]">
                    Top employee
                  </span>
                </div>
              </div>
            )
          )}
        </div>
        <div className="xl:h-[6.375rem] h-[8rem] flex-1 text-nowrap overflow-x-scroll  py-2 pr-6 pl-4 space-y-4 border border-Primary-25 shadow-CS rounded-xl">
          <h1 className="text-lg h-6 flex items-center font-semibold text-Primary-500 leading-[100%]">
            Highest purchases (Customer)
          </h1>
          {isCustomerFetching ? (
            <DashboardCardSkeleton />
          ) : isCustomerError ? (
            <div className="h-8 flex items-center text-Error-500 text-sm">
              Error loading data
            </div>
          ) : (
            highestPurCustomer && (
              <div className="h-8  flex   justify-between xl:flex-row flex-col gap-4">
                <div className="flex items-center  gap-x-2">
                  <span className="h-[1.188rem] flex items-center font-semibold text-sm leading-[100%] text-Black">
                    {highestPurCustomer[0].customer_code}
                  </span>
                  <h1 className="h-[1.313rem] flex items-center font-medium text-base leading-[100%] text-Black">
                    {highestPurCustomer[0].customer_name}
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="font-bold text-2xl leading-[100%]  text-Black">
                    {highestPurCustomer[0].total_purchases}
                    <span className="font-medium text-sm leading-[100%]">
                      Item
                    </span>
                  </span>
                  <span className="rounded-[0.875rem] flex items-center bg-Success-50 px-2 py-0.5 text-Success-600 text-base font-normal leading-[100%] h-[1.563rem]">
                    Top customer
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>  )
}

export default DashboradTop