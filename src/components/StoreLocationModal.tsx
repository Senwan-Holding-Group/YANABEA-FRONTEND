import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface StoreLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (location: { lat: number; lng: number }) => void;
  location?: string | null;
}

const StoreLocationModal = ({
  isOpen,
  onClose,
  onSave,
  location,
}: StoreLocationModalProps) => {
  const defaultLocation = { lat: 32.09519971952656, lng: 20.082130993652353 };
  const parseLocation = (locationStr: string | null | undefined) => {
    if (!locationStr) return defaultLocation;
    const [lat, lng] = locationStr.split(',').map(coord => parseFloat(coord.trim()));
    return isNaN(lat) || isNaN(lng) ? defaultLocation : { lat, lng };
  };

  const [selectedLocation, setSelectedLocation] = useState(parseLocation(location));

  useEffect(() => {
    setSelectedLocation(parseLocation(location));
  }, [location]);


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD4uqK2TmyvGOK00uHB2T8Ka47q9S8C-p0",
  });

  const handleReset = () => {
    setSelectedLocation(parseLocation(location));
  };

  const handleSave = () => {
    onSave(selectedLocation);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md px-4 pt-6 pb-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-Primary-500 h-5 text-base leading-[100%] font-semibold">
            Store's location
          </DialogTitle>
        </DialogHeader>

        <div className="border-2 border-dashed rounded-xl  border-Primary-100 mb-4">
          <div className="h-80  bg-gray-100 rounded-xl overflow-hidden">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={selectedLocation}
                zoom={15}>
                <Marker
                  position={selectedLocation}
                  draggable={true}
                  onDragEnd={(e) => {
                    if (e.latLng) {
                      setSelectedLocation({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                      });
                    }
                  }}
                />
              </GoogleMap>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading map...
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-x-3 ">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex-1 border-Primary-200 text-Primary-500 hover:bg-Primary-50 rounded-xl">
            Reset
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-Primary-500 hover:bg-Primary-600 text-white rounded-xl">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoreLocationModal;
