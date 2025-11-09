import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImageCirclePlus } from '@fortawesome/pro-light-svg-icons';
import ConfirmationModal from "@/components/ConfirmationModal";
import SuccessModal from "@/components/SuccessModal";
interface StorePictureModalProps {
  isOpen: boolean;
  isEdit: boolean;
  onClose: () => void;
  onSave: (file: File, onProgress?: (progress: number) => void) => Promise<void>;
  currentImageUrl: string;
}

const StorePictureModal = ({
  isOpen,
  isEdit,
  onClose,
  onSave,
  currentImageUrl,
}: StorePictureModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    if (isOpen && currentImageUrl) {
      setPreviewUrl(currentImageUrl);
    }
  }, [isOpen, currentImageUrl]); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl("");
  }
  const handleSave = () => {
    if (selectedFile && !isUploading) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmUpload = async () => {
    setShowConfirmation(false);
    setIsUploading(true);
    setUploadProgress(0);
    try {
      await onSave(selectedFile!, setUploadProgress);
      setShowSuccess(true);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md px-4 pt-6 pb-8 ">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-Primary-500">
            Store's picture
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4 border-2 border-dashed border-Primary-100 rounded-xl">
          {previewUrl ? (
            <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Store"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          ) : (
            <div className="h-80 bg-Gray-500  rounded-lg flex flex-col items-center justify-center text-Primary-400">
              <label
                htmlFor="file-input"
                className="flex flex-col items-center justify-center hover:text-Primary-500 transition-colors cursor-pointer">
                <FontAwesomeIcon size="3x" icon={faImageCirclePlus} className="size-12 mb-3" />
                <span className="text-sm font-medium">Press the button to take the picture</span>
              </label>
            </div>
          )}
        </div>

        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />


        {isUploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-Primary-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-Primary-500 mt-2">Uploading... {uploadProgress}%</p>
          </div>
        )}

        <div className="flex gap-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isUploading || !isEdit}
            className="flex-1 border-Primary-200 text-Primary-500 hover:bg-Primary-50 rounded-xl disabled:opacity-50">
            Reset
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!selectedFile || isUploading || !!previewUrl && !selectedFile || !isEdit}
            className="flex-1 bg-Primary-500 hover:bg-Primary-600 text-white rounded-xl disabled:opacity-50">
            {isUploading ? 'Uploading...' : 'Save'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <ConfirmationModal
      isOpen={showConfirmation}
      onClose={() => setShowConfirmation(false)}
      onConfirm={handleConfirmUpload}
      title="Upload Image"
      message="Are you sure you want to upload this image?"
      confirmText="Upload"
      isLoading={isUploading}
    />

    <SuccessModal
      isOpen={showSuccess}
      onClose={handleSuccessClose}
      message="Image uploaded successfully!"
      type="Success"
    />
  </>)
};

export default StorePictureModal;