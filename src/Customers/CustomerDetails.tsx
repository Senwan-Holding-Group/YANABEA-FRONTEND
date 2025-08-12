import DetailsLayout from "@/components/layouts/DetailsLayout";
import { useParams } from "react-router";

const CustomerDetails = () => {
  const { id } = useParams();

  return (
    <DetailsLayout title={`Customer Details: ${id}`}>Content</DetailsLayout>
  );
};

export default CustomerDetails;
