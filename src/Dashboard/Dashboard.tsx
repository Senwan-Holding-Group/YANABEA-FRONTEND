import { useAuth } from "@/api/Auth/useAuth";
import ActiveEmployeeList from "./components/ActiveEmployeeList";
import ItemStock from "./components/ItemStock";
import DashboradTop from "./components/DashboradTop";
import CustomerApproval from "./components/CustomerApproval";
import { getCurrentTreasuryQueryOptions } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import ItemMovement from "./components/ItemMovement";
import ActiveEmployeeFinanceList from "./components/ActiveEmployeeFinanceList";
import ActiveEmployeeFinanceSalesList from "./components/ActiveEmployeeFinanceSalesList";

const Dashboard = () => {
  const { user } = useAuth();
  const {
    data: currentTreasury,
    isFetching: isCurrentTreasuryFetching,
    isError: isCurrentTreasuryError,
  } = useQuery({...getCurrentTreasuryQueryOptions(),enabled:user.user_type ==="F"});
  const render = () => {
    switch (user.user_type) {
      case "A":
        return (
          <>
            <DashboradTop />
            <div className="flex xl:flex-row h-[36.5rem] xl:h-[calc(100dvh-18.25rem)]  flex-col gap-4 ">
              <ActiveEmployeeList className="xl:h-[calc(100dvh-18.25rem)] h-1/2" />
              <ItemStock className="xl:h-[calc(100dvh-18.25rem)] h-1/2" />
            </div>
          </>
        );
      case "S":
        return (
          <>
            <DashboradTop />
            <div className="flex xl:flex-row h-[60.75rem]  xl:h-[calc(100dvh-18.25rem)]  flex-col gap-4 ">
              <CustomerApproval />
              <ActiveEmployeeList className="xl:h-[calc(100dvh-18.25rem)] h-1/2" />
              <ItemStock className="xl:h-[calc(100dvh-18.25rem)] h-1/2" />
            </div>
          </>
        );
      case "W":
        return <ItemStock className="h-[calc(100dvh-10.875rem)]" />;
      case "F":
        return (
          <>
            <DashboradTop />
            <div className="flex xl:flex-row h-[45.5rem]  xl:h-[calc(100dvh-18.25rem)]  flex-col gap-4 ">
              <div className="h-1/2 space-y-4">
                <div className="space-y-4 xl:w-[24rem] h-[7.125rem]   bg-Secondary-50 rounded-xl border border-Primary-25 p-4">
                  <h1 className="font-bold text-2xl text-Primary-400">
                    Your current treasury amount
                  </h1>
                  {isCurrentTreasuryFetching ? (
                    <div className="flex gap-x-4">
                      <div className="font-bold text-2xl h-8 animate-pulse w-36 bg-Secondary-200 rounded"></div>
                      <div className="font-bold text-2xl h-8 animate-pulse w-12 bg-Secondary-200 rounded"></div>
                    </div>
                  ) : isCurrentTreasuryError ? (
                    <div className="h-8 flex items-center text-Error-500 text-sm">
                      Error loading data
                    </div>
                  ) : (
                    currentTreasury && (
                      <span className="font-bold text-2xl  text-Black">
                        {currentTreasury.current_cash_amount
                          ? currentTreasury.current_cash_amount
                          : 0}
                        <span className="font-semibold text-lg">&nbsp;LYD</span>
                      </span>
                    )
                  )}
                </div>
                <ActiveEmployeeFinanceSalesList className="xl:h-[calc(100dvh-26.375rem)] h-[64.5%] " />
              </div>
              <ItemMovement className="xl:h-[calc(100dvh-18.25rem)] h-1/2" />
            </div>
          </>
        );
      case "FS":
        return (
          <>
            <DashboradTop />
            <div className="flex xl:flex-row h-[60.75rem]  xl:h-[calc(100dvh-18.25rem)]  flex-col gap-4 ">
                <ActiveEmployeeFinanceList className="xl:h-[calc(100dvh-18.25rem)] h-1/2 " />
              <ItemMovement className="xl:h-[calc(100dvh-18.25rem)] h-1/2" />
            </div>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div className="bg-white rounded-xl overflow-y-scroll px-6 py-4 h-[calc(100dvh-8.875rem)] space-y-4">
      {render()}
    </div>
  );
};

export default Dashboard;
