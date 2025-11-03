import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
}: ConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md px-4 pt-6 pb-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-Primary-500">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <p className="text-Primary-400">{message}</p>
        </div>

        <div className="flex gap-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 border-Primary-200 text-Primary-500 hover:bg-Primary-50 rounded-xl disabled:opacity-50">
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-Primary-500 hover:bg-Primary-600 text-white rounded-xl disabled:opacity-50">
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;