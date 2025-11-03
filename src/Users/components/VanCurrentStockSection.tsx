import { getCurrentStockQueryOptions } from "@/api/query";
import { DataTable, type Column } from "@/components";
import type { VanCurrentStock } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";



const columns: Column<VanCurrentStock>[] = [
  {
    key: "item_name",
    header: "Item",
    className: "min-w-60 ",
  },
  {
    key: "item_code",
    header: "Code",
    className: "w-20 ",
  },
  {
    key: "onhand",
    header: "Qty",
    className: "w-20 ",
  },
  {
    key: "uom_code",
    header: "UOM",
    className: "w-24 ",
  },
];

const VanCurrentStockSection = () => {
  const {id}=useParams()
  const {
    data: currentStock,
    isFetching,
    isError,
    error,
  } = useQuery(
    getCurrentStockQueryOptions(id!)
  );

  const totalPieces = currentStock?.reduce((sum, item) => sum + item.piece_quantity, 0) || 0;
  const totalBoxes = currentStock?.reduce((sum, item) => sum + item.box_quantity, 0) || 0;
  return (
    <div className="space-y-4 border-b  border-b-Primary-50">
      <h1 className="text-lg font-semibold text-Primary-500 h-6">
        Van current stock
      </h1>
      <div className="space-y-2 mb-6">
        <DataTable
          data={currentStock || []}
          columns={columns}
          paging={false}
          isLoading={isFetching}
          isError={isError}
          error={error}
          emptyMessage="No stock items found"
        />
        <div className="flex justify-end items-center gap-x-2 h-6 text-Black">
          <span className="font-medium  text-base">Total:</span>
          <span className="font-semibold text-lg ">{totalBoxes} Box</span>
          <span className="font-semibold text-lg"> {totalPieces} Piece</span>
        </div>
      </div>
    </div>
  );
};

export default VanCurrentStockSection;
