import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResource, updateResource } from "./client";
import type {
  CreateWithdrawRequest,
  EditCustomerRequest,
} from "@/lib/formsValidation";
import type { CreateTransferPayload } from "@/lib/types";

export const useUpdateCustomer = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editCustomer", { id }],
    mutationFn: (data: EditCustomerRequest) =>
      updateResource<EditCustomerRequest>(`/customer/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customerDetails", { code: id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["administrativeData", { code: id, type: "customer" }],
      });
    },
  });
};

export const useApproveCustomer = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["approveCustomer", { code: id }],
    mutationFn: () =>
      updateResource(`/customer/${id}`, { U_Approval_status: "Approved" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customerDetails", { code: id }],
      });
        queryClient.invalidateQueries({
        queryKey: ["newCustomers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["administrativeData", { code: id, type: "customer" }],
      });
    },
  });
};

export const useRejectCustomer = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rejectCustomer", { id }],
    mutationFn: () =>
      updateResource(`/customer/${id}`, { U_Approval_status: "Rejected" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customerDetails", { code: id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["newCustomers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["administrativeData", { code: id, type: "customer" }],
      });
    },
  });
};
export const useCreateWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createWithdraw"],
    mutationFn: (data: CreateWithdrawRequest) =>
      createResource(`/finance/withdraw/${data.code}`, {
        current_cash_amount: data.current_cash_amount,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documentList"],
      });
    },
  });
};
export const useCreateTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTransfer"],
    mutationFn: (data:CreateTransferPayload) =>
      createResource(`/transfer`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documentList"],
      });
    },
  });
};
