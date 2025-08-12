import DetailsLayout from "@/components/layouts/DetailsLayout";
import {  useParams } from "react-router";

const UserDetails = () => {
  const { id } = useParams();

  return (
    <DetailsLayout title={`User Details: ${id}`} >
      Content
    </DetailsLayout>
  );
};

export default UserDetails;
