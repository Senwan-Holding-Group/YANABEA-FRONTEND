import { useApproveCustomer, useRejectCustomer } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";

const ApprovalButtons = () => {
  const { id } = useParams();
  const approveMutation = useApproveCustomer(id);
  const rejectMutation = useRejectCustomer(id);

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => rejectMutation.mutate()}
        disabled={approveMutation.isPending || rejectMutation.isPending}
        variant="destructive"
        className="flex-1 text-lg font-semibold leading-[100%] bg-transparent text-Error-600 border border-Error-50 cursor-pointer hover:bg-Error-50   rounded-xl">
        {rejectMutation.isPending ? "Rejecting..." : "Reject"}
      </Button>
      <Button
        onClick={() => approveMutation.mutate()}
        disabled={approveMutation.isPending || rejectMutation.isPending}
        className="flex-1 text-lg font-semibold leading-[100%]  bg-transparent text-Success-600 border border-Success-50 cursor-pointer hover:bg-Success-50   rounded-xl">
        {approveMutation.isPending ? "Approving..." : "Approve"}
      </Button>
    </div>
  );
};
export default ApprovalButtons;