import DetailsLayout from "@/components/layouts/DetailsLayout";
import { useParams } from "react-router";

const DocumentDetails = () => {
  const { id } = useParams();
  return (
    <DetailsLayout title={`Document Details: ${id}`}>Content</DetailsLayout>
  );
};

export default DocumentDetails;
