import { useAuth } from "@/api/Auth/useAuth";
import { getTransactionByCodeQueryOptions } from "@/api/query";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import { useFilterContext } from "@/contexts/Filter/useFilterContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const DocumentDetails = () => {
  const { filter,id} = useParams();
  const { user } = useAuth();
  const { activeTab } = useFilterContext();
  const {
    data: documentDetails,
    isFetching,
    isError,
    error,
  } = useQuery({
    ...getTransactionByCodeQueryOptions(filter!, id),
    enabled: !!id,
  });
  console.log(user.user_type);
  console.log(filter);
  console.log(activeTab);
  console.log(documentDetails);

  return <DetailsLayout title={id!}>Content</DetailsLayout>;
};

export default DocumentDetails;
