import DetailsLayout from "@/components/layouts/DetailsLayout";
import { useParams } from "react-router";
import EmployeeDataSection from "./components/EmployeeDataSection";
import VanCurrentStockSection from "./components/VanCurrentStockSection";
import TransactionsHistorySection from "./components/TransactionsHistorySection";
import { useUserContext } from "@/contexts/User/useUserContext";

const UserDetails = () => {
  const { id } = useParams();
  const { userType } = useUserContext();

  const render = () => {
    switch (userType) {
      case "S":
        return (
          <div className="flex lg:flex-row flex-col lg:h-full gap-6">
            <div className="border lg:w-1/5 overflow-y-scroll border-Primary-25 shadow-CS px-6 py-4 rounded-xl">
              <EmployeeDataSection />
            </div>
            <div className="lg:w-2/5 border  overflow-y-scroll  border-Primary-25 shadow-CS px-6 py-4 rounded-xl">
              <VanCurrentStockSection />
              <TransactionsHistorySection
                filterTypes={[
                  "",
                  "in_stock",
                  "out_stock",
                  "sales",
                  "return",
                  "withdraw",
                ]}
                currentTanasction={true}
              />
            </div>
            <div className="lg:w-2/5 border overflow-y-scroll  border-Primary-25 shadow-CS px-6 py-4 rounded-xl">
              <TransactionsHistorySection
                filterTypes={[
                  "",
                  "in_stock",
                  "out_stock",
                  "sales",
                  "return",
                  "withdraw",
                ]}
              />
            </div>
          </div>
        );

      case "W":
        return (
          <div className="flex lg:flex-row flex-col lg:h-full gap-6">
            <div className="border lg:w-1/3 overflow-y-scroll border-Primary-25 shadow-CS px-6 py-4 rounded-xl">
              <EmployeeDataSection />
            </div>
            <div className="border lg:w-2/3 overflow--scroll border-Primary-25 shadow-CS px-6 py-4 rounded-xl">
              <TransactionsHistorySection
                filterTypes={["", "in_stock", "out_stock"]}
              />
            </div>
          </div>
        );

      case "F":
        return (
          <div className="flex lg:flex-row flex-col lg:h-full gap-6">
            <div className="border lg:w-1/3 overflow-y-scroll border-Primary-25 shadow-CS px-6 py-4 rounded-xl">
              <EmployeeDataSection />
            </div>
            <div className="border lg:w-2/3 overflow-y-scroll border-Primary-25 shadow-CS px-6 py-4 rounded-xl">
              <TransactionsHistorySection filterTypes={["withdraw"]} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <DetailsLayout title={id!}>{render()}</DetailsLayout>;
};

export default UserDetails;
