import {
  Dialog,
  DialogContent,

} from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/pro-regular-svg-icons";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string|undefined;
  type: "Success" | "Error";
}

const SuccessModal = ({
  isOpen,
  onClose,
  type,
  message,
}: SuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[34.25rem] h-[15.688rem] flex items-end  px-4 pt-4 pb-12 rounded-xl">
        <div className="flex flex-col items-center w-full mt-4 h-[9.188rem] gap-4">

        {type === "Success" ? (
          <FontAwesomeIcon size="5x" icon={faCircleCheck} className="text-Success-100" />
        ) : (
          <FontAwesomeIcon size="5x" icon={faCircleXmark} className="text-Error-100" />
        )}
        <p className="text-Black font-semibold  text-lg overflow-scroll ">{message}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
