import { DataTable, type Column } from "@/components";
import SelectItemDialog from "@/components/SelectItemDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  CreateTransferSchema,
  type CreateTransferRequest,
} from "@/lib/formsValidation";
import type { CreateTransferPayload, Item } from "@/lib/types";
import { faGrid2Plus, faSpinner } from "@fortawesome/pro-regular-svg-icons";
import { faTrashCan } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { getSalesEmployeeQueryOptions } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTransfer } from "@/api/mutations";
import SuccessModal from "@/components/SuccessModal";
import { getApiError } from "@/lib/utils";

interface CreateTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateTransferDialog = ({
  open,
  onOpenChange,
}: CreateTransferDialogProps) => {
  const [isItemDialogueOpen, setIsItemDialogueOpen] = useState(false);
  const [transferLines, setTransferLines] = useState<Item[]>([]);
  const { data: salesEmployeeList } = useQuery(getSalesEmployeeQueryOptions());
  const [showSuccess, setShowSuccess] = useState(false);

  const updateLineQuantity = (
    line: number | undefined,
    newQuantity: string
  ) => {
    const quantity = parseFloat(newQuantity);
    if (isNaN(quantity)) return;
    setTransferLines(
      transferLines.map((value) => {
        if (value.line !== line) {
          return value;
        }
        return {
          ...value,
          quantity: Math.abs(quantity),
        };
      })
    );
  };
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
    {
      key: "quantity",
      header: "Qnt",
      render: (_, item) => (
        <Input
          type="number"
          value={item?.quantity || 0}
          onChange={(e) => updateLineQuantity(item?.line, e.target.value)}
          className="w-16 h-8 text-center"
          min="0"
        />
      ),
      className: "w-20",
    },
    {
      key: "item_code",
      header: "Action",
      render: (_, item) => (
        <Button
          onClick={() => {
            setTransferLines((prev: Item[]) =>
              prev.filter((value) => {
                if (prev.length === 1) return value;
                else return value.line !== item?.line;
              })
            );
          }}
          type="button"
          size={"icon"}
          className="flex p-0 items-center hover:bg-Primary-25 justify-center bg-white cursor-pointer">
          <FontAwesomeIcon className="text-Error-500" icon={faTrashCan} />
        </Button>
      ),
      className: "w-20",
    },
  ];
  const form = useForm<CreateTransferRequest>({
    resolver: zodResolver(CreateTransferSchema),
    defaultValues: {
      TransferType: undefined,
      SalesPersonCode: -1,
      StockTransferLines: [],
    },
  });
  const salesPersonCode = form.watch("SalesPersonCode");
  const transferType = form.watch("TransferType");
  const {
    mutate: createTransfer,
    isPending,
    isError: isCreateError,
    error: createError
  } = useCreateTransfer();
  const handleSuccessClose = () => {
    setShowSuccess(false);
  };
  const onSubmit = (values: CreateTransferRequest) => {
    const newValues: CreateTransferPayload = {
      FromWarehouse: transferType === "inStock" ? "DC" : "VANS",
      ToWarehouse: transferType === "inStock" ? "VANS" : "DC",
      SalesPersonCode: values.SalesPersonCode,
      StockTransferLines: transferLines.map((value) => ({
        ItemCode: value.item_code,
        ItemDescription: value.item_name,
        Quantity: value.quantity,
        FromWarehouseCode: transferType === "inStock" ? "DC" : "VANS",
        WarehouseCode: transferType === "inStock" ? "VANS" : "DC",
        UnitPrice: value.price,
        UoMEntry: value.uom_entry,
        UoMCode: value.uom_code,
        StockTransferLinesBinAllocations: [
          {
            BinAbsEntry: salesEmployeeList?.find(
              (selected) => selected.sales_person_code === salesPersonCode
            )?.abs_entry,
            Quantity: value.quantity,
            BinActionType:
              transferType === "inStock"
                ? "batToWarehouse"
                : "batFromWarehouse",
          },
        ],
      })),
    };
    createTransfer(newValues, {
      onSuccess: () => {
        form.reset();
        setTransferLines([]);
      },
      onSettled: () => {
        setShowSuccess(true);
      },
    });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="p-4   sm:max-w-[80rem]  w-[90%]"
          onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="font-semibold text-sm text-Primary-500">
              Create new transfer
            </DialogTitle>
          </DialogHeader>
          <h1 className="font-normal text-sm text-Gray-900 mt-1">
            Please fill the below information
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="SalesPersonCode"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value ? Number(value) : 0)
                        }
                        value={
                          field.value === -1 ? "" : field.value?.toString()
                        }
                        disabled={isPending}>
                        <SelectTrigger
                          className={`border bg-Primary-25 w-[20rem] inline-flex disabled:opacity-100 font-medium text-base leading-[100%] rounded-xl ${
                            fieldState.error
                              ? "border-destructive"
                              : "border-Primary-25"
                          }`}>
                          <SelectValue placeholder="Employee Name" />
                        </SelectTrigger>
                        <SelectContent>
                          {salesEmployeeList &&
                            salesEmployeeList.map((employee) => (
                              <SelectItem
                                key={employee.sales_person_code}
                                value={employee.sales_person_code!.toString()}>
                                {employee.sales_person_name}
                              </SelectItem>
                            ))}
                          <FormMessage />
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="TransferType"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isPending}>
                        <SelectTrigger
                          className={`border bg-Primary-25 w-[20rem] inline-flex disabled:opacity-100 font-medium text-base leading-[100%] rounded-xl ${
                            fieldState.error
                              ? "border-destructive"
                              : "border-Primary-25"
                          }`}>
                          <SelectValue placeholder="Transfer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="inStock" value="inStock">
                            In Stock
                          </SelectItem>
                          <SelectItem key="outStock" value="outStock">
                            Out Stock
                          </SelectItem>
                          <FormMessage />
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                size={"icon"}
                type="button"
                onClick={() => setIsItemDialogueOpen(true)}
                className="w-fit h-[19px]   bg-white cursor-pointer  hover:bg-transparent">
                <FontAwesomeIcon
                  className="text-Primary-500"
                  icon={faGrid2Plus}
                />
                <span className="text-Primary-500 font-semibold  text-sm ">
                  Select Items
                </span>
              </Button>
              <DataTable
                className="h-[12.313rem]"
                data={transferLines || []}
                isLoading={false}
                isError={false}
                error={null}
                columns={columns}
                paging={false}
                emptyMessage="Select Item"
              />
              <DialogFooter className="mt-6 flex flex-row">
                <DialogClose asChild>
                  <Button
                    className="bg-white w-[11.25rem] border  hover:bg-transparent rounded-2xl cursor-pointer text-Primary-600 font-medium text-base"
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      setTransferLines([]);
                      form.reset();
                    }}>
                    Close
                  </Button>
                </DialogClose>
                <Button
                  className="bg-Primary-500 w-[11.25rem] hover:bg-Primary-400  cursor-pointer rounded-2xl font-medium text-base disabled:opacity-50"
                  type="submit"
                  disabled={transferLines.length === 0 || isPending}>
                  {isPending && <FontAwesomeIcon icon={faSpinner} spin />}
                  Confirm
                </Button>
              </DialogFooter>
            </form>
          </Form>
          <SelectItemDialog
            open={isItemDialogueOpen}
            onOpenChange={setIsItemDialogueOpen}
            onSelect={setTransferLines}
            selectedItems={transferLines}
          />
        </DialogContent>
      </Dialog>
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        message={
          isCreateError
            ? getApiError(createError)
            : "The transaction is successfully created "
        }
        type={isCreateError ? "Error" : "Success"}
      />
    </>
  );
};

export default CreateTransferDialog;
