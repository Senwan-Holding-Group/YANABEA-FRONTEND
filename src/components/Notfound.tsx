import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router";
import { Button } from "./ui/button";

const NotFound = () => {
  const nav = useNavigate();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            onClick={() => {
              nav(-1);
            }}
            className="px-4 py-2 bg-Primary-500 cursor-pointer h-10 text-white rounded-lg hover:bg-Primary-600"
          >
            Go Back
          </Button>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-gray-600 mb-4">
        Something went wrong. Please try again later.
      </p>
      <Button
        onClick={() => {
          nav(-1);
        }}
        className="px-4 py-2 rounded-lg bg-Primary-500 text-white cursor-pointer h-10   hover:bg-Primary-600"
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
