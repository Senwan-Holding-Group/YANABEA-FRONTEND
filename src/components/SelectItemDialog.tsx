import {  useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchAll } from "@/api/client";
import type { Item } from "@/lib/types";
import DataTable, { type Column } from "./DataTable";
import SearchInput from "./SearchInput";
import { useTable } from "@/hooks/useTable";

interface SelectItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedItems: Item[];
}
const columns: Column<Item>[] = [
  {
    key: "item_code",
    header: "Code",
    className: "w-20",
  },
  {
    key: "item_name",
    header: "Item",
    className: "w-24",
  },
];
const SelectItemDialog = ({
  open,
  onOpenChange,
  onSelect,
  selectedItems,
}: SelectItemDialogProps) => {
  const { searchTerm, setSearchTerm } = useTable();

  const {
    data: itemSelectList,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["itemSelectList", searchTerm],
    queryFn: () => {
      const searchParam = searchTerm
        ? `?item_code_or_barcode=${searchTerm}&page=1&limit=10`
        : `?page=1&limit=50`;
      return fetchAll<Item>(`/item/master_data${searchParam}`);
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const handleSelect = (item: Item) => {
    const existingItemIndex = selectedItems.findIndex(
      (value) => String(value.item_code) === item.item_code
    );
    if (existingItemIndex !== -1) {
      onSelect((prev) => {
        const newState = [...prev];
        newState[existingItemIndex] = {
          ...newState[existingItemIndex],
          quantity: newState[existingItemIndex].quantity + 1,
        };
        return newState;
      });
    } else {
      onSelect((prev) => [...prev, {
        item_code:item.item_code,
        item_name:item.item_name,
        price:item.price,
        uom_code:item.uom_code,
        quantity:1,
        uom_entry: item.uom_entry,
        img_url: item.img_url,
        line: Math.random()
      }]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md space-y-4 max-h-96">
        <DialogHeader>
          <DialogTitle>Select Item</DialogTitle>
        </DialogHeader>

        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search"
          enable={false}
        />

        <div className=" overflow-y-auto ">
          <DataTable
            className="h-[12.313rem]"
            data={itemSelectList || []}
            isLoading={isFetching}
            isError={isError}
            error={error}
            columns={columns}
            paging={false}
            onRowClick={handleSelect}
            emptyMessage="No items found"
            getRowClassName={(item) => 
              selectedItems.some(selected => selected.item_code === item.item_code) 
                ? "bg-Success-50" 
                : ""
            }
          />
          <DialogFooter className="mt-2 flex flex-row">
            <DialogClose asChild>
              <Button
                className="bg-white w-[11.25rem] border  hover:bg-transparent rounded-2xl cursor-pointer text-Primary-600 font-medium text-base"
                type="button">
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="bg-Primary-500 w-[11.25rem] hover:bg-Primary-400 cursor-pointer rounded-2xl font-medium text-base"
                type="button">
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectItemDialog;
