import { getTopItemStockQueryOptions } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import ItemStockSkeleton from "../../components/skeletons/ItemStockSkeleton";
import type { TopItemStocK } from "@/lib/types";
import { useAuth } from "@/api/Auth/useAuth";
type ItemStockProps = {
  className: string;
};
const ItemStock = ({className}:ItemStockProps) => {
  const {user}=useAuth()
      const {
    data: topItemStock,
    isFetching: isItemStockFetching,
    isError: isItemStockError,
  } = useQuery(getTopItemStockQueryOptions());
  return (
     <div className={`${className}  flex-1 overflow-y-scroll rounded-xl p-4 bg-Primary-25 shadow-CS`}>
          <h1 className="h-8 font-bold text-2xl text-Primary-400 leading-[100%] mb-4">
            Items (In/Out stock)
          </h1>
          {isItemStockFetching ? (
            <ItemStockSkeleton />
          ) : isItemStockError ? (
            <div className="h-8 flex items-center text-Error-500 text-sm">
              Error loading data
            </div>
          ) : (
            topItemStock && (
              <div className={`grid ${user.user_type==="S"?" 3xl:grid-cols-2":"lg:grid-cols-2 xl:grid-cols-3"} gap-4`}>
                {topItemStock.map((topItemStock: TopItemStocK) => (
                  <div className="bg-white overflow-x-scroll text-nowrap space-y-2 rounded-xl pt-2 pr-6 pb-4 pl-4 border border-Primary-25 shadow-CS">
                    <div className="flex items-center gap-x-2 ">
                      <span className="text-sm h-[1.188rem]  font-semibold text-Primary-500">
                        {topItemStock.item_code}
                      </span>
                      <span className="text-Primary-500   h-[1.313rem] text-base font-medium">
                        {topItemStock.item_name}
                      </span>
                    </div>
                    <div className="text-xs h-4 font-bold text-Gray-800 ">
                      Item transactions
                    </div>
                    <div className="flex justify-between h-[1.563rem]">
                      <div className="flex items-center gap-x-2">
                        <span className="text-lg font-semibold  text-Black">
                          {topItemStock.in_quantity}
                        </span>
                        <span className="bg-Success-50 h-[1.563rem] flex items-center text-Success-600 px-2 py-1 rounded-[14px] text-base font-normal">
                          In
                        </span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span className="text-lg font-semibold text-Black">
                          {topItemStock.out_quantity}
                        </span>
                        <span className="bg-Error-50  h-[1.563rem] text-Error-500 flex items-center px-2 rounded-[14px] py-1  text-base font-normal">
                          Out
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
  )
}

export default ItemStock