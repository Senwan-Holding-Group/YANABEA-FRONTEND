import { Button } from "@/components/ui/button";
import CurrentTreasurySection from "./CurrentTreasurySection";
import { useParams } from "react-router";
import { useUserContext } from "@/contexts/User/useUserContext";
import { useQuery } from "@tanstack/react-query";
import {
  getAdministrativeDataQueryOptions,
  getUserDetailsQueryOptions,
} from "@/api/query";
import DataRenderer from "@/components/DataRenderer";

const EmployeeDataSection = () => {
  const { id } = useParams();
  const { userType } = useUserContext();
  const {
    data: userDetails,
    isFetching,
    isError,
    error,
  } = useQuery(getUserDetailsQueryOptions(userType, id));
  const administrativeData = useQuery(
    getAdministrativeDataQueryOptions("employee", id)
  );
  return (
    <div className="space-y-8">
      <DataRenderer isLoading={isFetching} isError={isError} error={error}>
        <div className=" space-y-4">
          <h3 className="text-lg font-semibold text-Primary-500 ">
            Employee data
          </h3>
          <div className="space-y-2 *:h-10 *:py-3 *:px-4 *:rounded-xl *:bg-Primary-25">
            <div className="flex items-center">
              <span className="text-Primary-500 font-medium">
                {userType === "S"
                  ? userDetails?.sales_person_code
                  : userType === "W"
                  ? userDetails?.warehouse_person_code
                  : userDetails?.finance_person_code}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-Primary-500 font-medium">
                {userType === "S"
                  ? userDetails?.sales_person_name
                  : userType === "W"
                  ? userDetails?.warehouse_person_name
                  : userDetails?.finance_person_name}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-Primary-500 font-medium">
                {userDetails?.status === true ? "Active" : "Inactive"}
              </span>
            </div>
            {userType === "S" && (
              <div className="flex items-center">
                <span className="text-Primary-500 font-medium">
                  {userDetails?.van}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <span className="text-Primary-500 font-medium">
                {userDetails?.phone_no}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-Primary-200 w-full text-Primary-500 hover:bg-Primary-50 rounded-xl">
          Edite employee data
        </Button>
        {userType === "F" && <CurrentTreasurySection />}
        <div className=" space-y-4 w-80">
          <h3 className="text-lg font-semibold text-Primary-500  ">
            Administrative data
          </h3>
          <div className="*:h-10 **:px-2 **:py-4">
            <div className="flex items-center ">
              <span className="text-Primary-500 font-medium w-24">
                Created by
              </span>
              <span className="text-Primary-500 ">
                {administrativeData.data?.created_by}
              </span>
            </div>
            <div className="flex items-center ">
              <span className="text-Primary-500 font-medium w-24">
                Created on
              </span>
              <span className="text-Primary-500">
                {administrativeData.data?.created_on?.split("T")[0]}
              </span>
            </div>
            <div className="flex items-center ">
              <span className="text-Primary-500 font-medium w-24">
                Edited by
              </span>
              <span className="text-Primary-500">
                {administrativeData.data?.edited_by}
              </span>
            </div>
            <div className="flex items-center ">
              <span className="text-Primary-500 font-medium w-24">
                Edited on
              </span>
              <span className="text-Primary-500">
                {administrativeData.data?.edited_on?.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </DataRenderer>
    </div>
  );
};

export default EmployeeDataSection;
