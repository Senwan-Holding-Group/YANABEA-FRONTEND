import DetailsLayout from "@/components/layouts/DetailsLayout";
import CustomerDataSection from "@/Users/components/CustomerDataSection";
import TransactionsHistorySection from "@/Users/components/TransactionsHistorySection";
import { useParams } from "react-router";

const CustomerDetails = () => {
  const { id } = useParams();

  return (
    <DetailsLayout title={id!}>
      <div className="flex lg:flex-row flex-col lg:h-full gap-6">
        <div className="border lg:w-2/3 overflow-y-scroll border-Primary-25 shadow-CS px-6 py-4 rounded-xl">
          <CustomerDataSection />
        </div>
        <div className="border lg:w-1/3 overflow-y-scroll border-Primary-25 shadow-CS px-6 py-4 rounded-xl">
          <TransactionsHistorySection filterTypes={["", "sales", "refund"]} />
        </div>
      </div>
    </DetailsLayout>
  );
};

export default CustomerDetails;
