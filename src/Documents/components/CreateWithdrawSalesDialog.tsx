
import { useCreateWithdraw } from "@/api/mutations";
import { getSalesEmployeeQueryOptions } from "@/api/query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateWithdrawSchema,
  type CreateWithdrawRequest,
} from "@/lib/formsValidation";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SuccessModal from "@/components/SuccessModal";
import { getApiError } from "@/lib/utils";

interface CreateWithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateWithdrawSalesDialog = ({
  open,
  onOpenChange,
}: CreateWithdrawDialogProps) => {
  const [step, setStep] = useState(1);
  const { data: salesEmployeeList } = useQuery(getSalesEmployeeQueryOptions());
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<CreateWithdrawRequest>({
    resolver: zodResolver(CreateWithdrawSchema),
    defaultValues: {
      current_cash_amount: 0,
      code: 0,
    },
  });
  const selectedCode = form.watch("code");
  const currentCash = form.watch("current_cash_amount");
  const selectedEmployee = salesEmployeeList?.find(
    (emp) => emp.sales_person_code === selectedCode
  );
  const systemAmount = selectedEmployee?.current_cash || 0;

  const difference = currentCash - systemAmount;
  const { mutate: createWithdraw, isPending,isError:isCreateError,error:createError } = useCreateWithdraw();

  
  const getStatusColor = () => {
    if (currentCash === 0 && systemAmount === 0) return "text-gray-500";
    if (Math.abs(difference) < 0.01) return "text-Success-600";
    if (difference > 0) return "text-Error-600";
    return "text-Error-600";
  };

  const getStatusText = () => {
    if (currentCash === 0 && systemAmount === 0) return "No amounts to compare";
    if (Math.abs(difference) < 0.01) return "Cash amount is matched";
    if (difference > 0) return `Cash amount is over by ${difference.toFixed(2)} LYD`;
    return `Cash amount is short by ${Math.abs(difference).toFixed(2)} LYD`;
  };

  const onNext = () => {
    if (form.formState.isValid) {
      setStep(2);
    }
  };

  const onBack = () => {
    setStep(1);
  };
  const handleSuccessClose = () => {
    setShowSuccess(false);
  };
  const onSubmit = (values: CreateWithdrawRequest) => {
    createWithdraw(values, {
      onSuccess: () => {
        form.reset();
        setStep(1);
      },
       onSettled: () => {
        setShowSuccess(true);
      },
    });
  };
  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-4   w-[25.313rem]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="font-semibold text-sm text-Primary-500">
            {step === 1 ? "Create new withdraw" : "Finalising withdraw"}
          </DialogTitle>
        </DialogHeader>
        <h1 className="font-normal text-sm text-Gray-900 mt-1">
          {step === 1 ? "Please fill the below information" : ""}
        </h1>
        {step === 1 ? (
          <Form {...form}>
            <form className="space-y-4 mt-4 w-[23.313rem]" onSubmit={(e) => {
              e.preventDefault();
              onNext();
            }}>
              <FormField
                control={form.control}
                name="code"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value ? Number(value) : 0)}
                        value={field.value === 0 ? "" : field.value?.toString()}
                        disabled={isPending}>
                        <SelectTrigger
                          className={`border bg-Primary-25 w-full inline-flex disabled:opacity-100 font-medium text-base leading-[100%] rounded-xl ${
                            fieldState.error
                              ? "border-destructive"
                              : "border-Primary-25"
                          }`}>
                          <SelectValue placeholder="Employee ID" />
                        </SelectTrigger>
                        <SelectContent>
                          {salesEmployeeList &&
                            salesEmployeeList
                              .map((employee) => (
                                <SelectItem
                                  key={employee.sales_person_code}
                                  value={employee.sales_person_code!.toString()}>
                                  {employee.sales_person_name}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="current_cash_amount"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="font-semibold text-sm text-Primary-500">Withdraw amount</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Cash amount"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="border bg-Primary-25  w-full inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    onOpenChange(false);
                  }}
                  disabled={isPending}
                  className="border-Primary-100 w-[11.406rem] text-Primary-500 hover:bg-Primary-50 rounded-xl cursor-pointer font-semibold leading-[100%]">
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={onNext}
                  disabled={
                    !form.formState.isValid ||
                    !currentCash ||
                    !selectedCode ||
                    selectedCode === 0
                  }
                  className="bg-Primary-500 w-[11.406rem] hover:bg-Primary-400 rounded-xl cursor-pointer text-white">
                  Next
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-6 mt-4 w-[23.313rem]">
            <div className="space-y-2 *:h-10">
              <p className="text-sm font-semibold flex items-center text-Gray-900">
                System withdraw amount :
                <span className="font-semibold text-base text-Black">&nbsp;{systemAmount.toFixed(2)}&nbsp;LYD</span> 
              </p>
              <p className="text-sm font-semibold flex items-center text-Gray-900">
                Written withdraw amount :
                <span className="font-semibold text-base text-Black ">&nbsp;{currentCash.toFixed(2)}&nbsp;LYD</span>
              </p>
            </div>
            <p className={`text-sm font-semibold ${getStatusColor()}`}>
              {getStatusText()}
            </p>
            <div className="flex gap-x-2">
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={onBack}
                className="border-Primary-100 w-[11.406rem] text-Primary-500 hover:bg-Primary-50 rounded-xl cursor-pointer font-semibold leading-[100%]">
                Back
              </Button>
              <Button
                onClick={() => onSubmit(form.getValues())}
                disabled={isPending}
                className="bg-Primary-500 w-[11.406rem] hover:bg-Primary-400 rounded-xl cursor-pointer text-white">
                {isPending && <FontAwesomeIcon icon={faSpinner} spin />}
                Confirm
              </Button>
            </div>
          </div>
        )}
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

export default CreateWithdrawSalesDialog;


