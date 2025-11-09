import { getCurrentTreasuryQueryOptions } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const CurrentTreasurySection = () => {
  const { id } = useParams();
  const {
    data: currentTreasury,
    isFetching: isCurrentTreasuryFetching,
    isError: isCurrentTreasuryError,
  } = useQuery({ ...getCurrentTreasuryQueryOptions(id), enabled: !!id });
  return (
    <div className="border w-80 border-Primary-25 p-4 rounded-xl space-y-4">
      <h3 className="text-sm font-semibold text-Primary-600 ">
        Current treasury amount
      </h3>

      {isCurrentTreasuryFetching ? (
        <div className="flex gap-x-4">
          <div className="font-bold text-2xl h-8 animate-pulse w-36 bg-Primary-25 rounded"></div>
          <div className="font-bold text-2xl h-8 animate-pulse w-12 bg-Primary-25 rounded"></div>
        </div>
      ) : isCurrentTreasuryError ? (
        <div className="h-6 flex items-center text-Error-500 text-sm">
          Error loading data
        </div>
      ) : (
        currentTreasury && (
          <span className="text-Primary-500 h-6 font-semibold flex items-center gap-x-1 text-lg">
            {currentTreasury.current_cash_amount}<span className="font-semibold text-sm text-Black">LYD</span> 
          </span>
        )
      )}
    </div>
  );
};

export default CurrentTreasurySection;
