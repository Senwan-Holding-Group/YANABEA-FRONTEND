import { useApproveCustomer, useRejectCustomer } from "@/api/mutations";
import SuccessModal from "@/components/SuccessModal";
import { Button } from "@/components/ui/button";
import { getApiError } from "@/lib/utils";
import { useState } from "react";
import { useParams } from "react-router";
type ApprovalProps = {
  customer_code?: string;
};
const ApprovalButtons = ({ customer_code }: ApprovalProps) => {
  const { id } = useParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState<string|undefined>("");
  const [modalType, setModalType] = useState<"Success" | "Error">("Success");

  const handleSuccessClose = () => {
    setShowSuccess(false);
  };
  const approveMutation = useApproveCustomer(id || customer_code);
  const rejectMutation = useRejectCustomer(id || customer_code);

  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          rejectMutation.mutate(undefined, {
            onSuccess: () => {
              setModalMessage("The Customer is successfully Rejected");
              setModalType("Success");
              setShowSuccess(true);
            },
            onError: (error) => {
              setModalMessage(getApiError(error));
              setModalType("Error");
              setShowSuccess(true);
            },
          })
        }
        disabled={approveMutation.isPending || rejectMutation.isPending}
        variant="destructive"
        className="flex-1 text-lg h-8 font-semibold leading-[100%] bg-transparent text-Error-600 border border-Error-50 cursor-pointer hover:bg-Error-50   rounded-xl">
        {rejectMutation.isPending ? "Rejecting..." : "Reject"}
      </Button>
      <Button
        onClick={() =>
          approveMutation.mutate(undefined, {
            onSuccess: () => {
              setModalMessage("The Customer is successfully Approved");
              setModalType("Success");
              setShowSuccess(true);
            },
            onError: (error) => {
              setModalMessage(getApiError(error));
              setModalType("Error");
              setShowSuccess(true);
            },

          })
        }
        disabled={approveMutation.isPending || rejectMutation.isPending}
        className="flex-1 text-lg h-8 font-semibold leading-[100%]  bg-transparent text-Success-600 border border-Success-50 cursor-pointer hover:bg-Success-50   rounded-xl">
        {approveMutation.isPending ? "Approving..." : "Approve"}
      </Button>
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};
export default ApprovalButtons;
