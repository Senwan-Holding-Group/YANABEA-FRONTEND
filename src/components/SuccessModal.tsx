import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  title = "Success",
  message,
}: SuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md px-4 pt-6 pb-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-Primary-500 flex items-center gap-2">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <p className="text-Primary-400">{message}</p>
        </div>

        <Button
          type="button"
          onClick={onClose}
          className="w-full bg-Primary-500 hover:bg-Primary-600 text-white rounded-xl">
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;