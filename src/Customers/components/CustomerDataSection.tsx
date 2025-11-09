import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faMapMarkerAlt } from "@fortawesome/pro-light-svg-icons";
import { useForm } from "react-hook-form";
import {
  EditCustomerSchema,
  type EditCustomerRequest,
} from "@/lib/formsValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getAdministrativeDataQueryOptions,
  getCustomerDetailsQueryOptions,
} from "@/api/query";
import { useEffect, useState } from "react";
import { useUpdateCustomer } from "@/api/mutations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import DataRenderer from "@/components/DataRenderer";
import { Input } from "@/components/ui/input";
import StoreLocationModal from "@/components/StoreLocationModal";
import StorePictureModal from "@/components/StorePictureModal";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";
import { imageUpload } from "@/api/imageUpload";
import { baseURL } from "@/api";
import AdministrativeDataSkeleton from "@/components/skeletons/AdministrativeDataSkeleton";
import SuccessModal from "@/components/SuccessModal";
import { getApiError } from "@/lib/utils";

const CustomerDataSection = () => {
  const { id } = useParams();
  const [isEdit, setisEdit] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<EditCustomerRequest>({
    resolver: zodResolver(EditCustomerSchema),
    defaultValues: {
      Address: "",
      CardForeignName: "",
      CardName: "",
      Cellular: "",
      U_Location: "",
      U_img_url: "",
    },
  });
  const {
    data: customerDetails,
    isFetching,
    isError,
    error,
  } = useQuery(getCustomerDetailsQueryOptions(id));
  const administrativeData = useQuery(
    getAdministrativeDataQueryOptions("customer", id)
  );
  useEffect(() => {
    if (customerDetails) {
      form.reset({
        Address: customerDetails.address,
        CardForeignName: customerDetails.customer_eng_name,
        CardName: customerDetails.customer_name,
        Cellular: customerDetails.phone_no,
        U_Location: customerDetails.location || "",
        U_img_url: customerDetails.img_url || "",
      });
    }
  }, [form, customerDetails]);
  const {
    mutate: editCustomer,
    isPending,
    isError: isEditError,
    error: editError,
  } = useUpdateCustomer(id);
  const onSubmit = async (values: EditCustomerRequest) => {
    editCustomer(values, {
      onSettled: () => {
        setShowSuccess(true);
      },
    });
  };
  const handleSuccessClose = () => {
    setShowSuccess(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DataRenderer isLoading={isFetching} isError={isError} error={error}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-Primary-500">
              Customer data
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              <FormField
                control={form.control}
                name="CardForeignName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending || !isEdit}
                        placeholder="Eng name"
                        {...field}
                        className="border bg-Primary-25  w-full inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="CardName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending || !isEdit}
                        placeholder="AR name"
                        {...field}
                        className="border bg-Primary-25 w-full inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending || !isEdit}
                        placeholder="address"
                        {...field}
                        className="border bg-Primary-25 w-full inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Cellular"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending || !isEdit}
                        placeholder="Phone no."
                        {...field}
                        className="border bg-Primary-25 w-full inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <span className="px-3 py-2.5 bg-Primary-25  border w-full h-10 inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl">
                {customerDetails?.aproval_status}
              </span>
              <span className="px-3 py-2.5 bg-Primary-25  border w-full h-10 inline-flex disabled:opacity-100 border-Primary-25 font-medium text-base leading-[100%] rounded-xl">
                {customerDetails?.status ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="space-y-2">
              <div
                onClick={() => setIsPictureModalOpen(true)}
                className="flex flex-col  gap-2 text-Primary-500 cursor-pointer w-[20rem] hover:text-Primary-600">
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faCamera} className="size-4" />
                  <span className="font-medium">View store's picture</span>
                </div>
                <FormField
                  control={form.control}
                  name="U_img_url"
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                onClick={() => setIsLocationModalOpen(true)}
                className="flex flex-col w-[20rem] gap-2 text-Primary-500 cursor-pointer ">
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="size-4" />
                  <span className="font-medium">View store's location</span>
                </div>
                <FormField
                  control={form.control}
                  name="U_Location"
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {!isEdit ? (
              <Button
                variant="outline"
                disabled={isFetching}
                onClick={(e) => {
                  if (!isEdit) {
                    e.preventDefault();
                    setisEdit(true);
                  }
                }}
                className="border-Primary-100 w-80 text-Primary-500 hover:bg-Primary-50 rounded-xl font-semibold leading-[100%]">
                Edit Customer data
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setisEdit(false);
                  }}
                  disabled={isPending}
                  className="border-Primary-100 w-[10rem] text-Primary-500 hover:bg-Primary-50 rounded-xl cursor-pointer font-semibold leading-[100%]">
                  Cancel
                </Button>
                <Button
                  disabled={isPending}
                  type="submit"
                  className="bg-Primary-500 w-[10rem] hover:bg-Primary-400 rounded-xl cursor-pointer text-white ">
                  {isPending && (
                    <FontAwesomeIcon className="" icon={faSpinner} spin />
                  )}
                  Save
                </Button>
              </div>
            )}
          </div>
          {administrativeData.isFetching ? (
            <AdministrativeDataSkeleton />
          ) : (
            <div className="space-y-4  w-80">
              <h3 className="text-lg font-semibold text-Primary-500">
                Administrative data
              </h3>
              <div className="*:h-10 **:px-2 **:py-4">
                <div className="flex items-center gap-x-8">
                  <span className="text-Primary-500 font-medium w-24">
                    Created by
                  </span>
                  <span className="text-Primary-500">
                    {administrativeData.data?.created_by}
                  </span>
                </div>
                <div className="flex items-center gap-x-8">
                  <span className="text-Primary-500 font-medium w-24">
                    Created on
                  </span>
                  <span className="text-Primary-500">
                    {administrativeData.data?.created_on?.split("T")[0]}
                  </span>
                </div>
                <div className="flex items-center gap-x-8">
                  <span className="text-Primary-500 font-medium w-24">
                    Edited by
                  </span>
                  <span className="text-Primary-500">
                    {administrativeData.data?.edited_by}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DataRenderer>

        <StoreLocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          onSave={(location) => {
            form.setValue("U_Location", `${location.lat},${location.lng}`);
          }}
          location={form.getValues("U_Location")}
        />
        <StorePictureModal
          isOpen={isPictureModalOpen}
          isEdit={isEdit}
          onClose={() => setIsPictureModalOpen(false)}
          onSave={async (file, onProgress) => {
            const img_url = await imageUpload(file, onProgress);
            form.setValue("U_img_url", baseURL + img_url);
          }}
          currentImageUrl={form.getValues("U_img_url")}
        />
        <SuccessModal
          isOpen={showSuccess}
          onClose={handleSuccessClose}
          message={
            isEditError
              ? getApiError(editError)
              : "The customer is successfully Updated"
          }
          type={isEditError ? "Error" : "Success"}
        />
      </form>
    </Form>
  );
};

export default CustomerDataSection;
