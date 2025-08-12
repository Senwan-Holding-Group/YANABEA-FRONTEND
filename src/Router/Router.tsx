import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import App from "../App";
import NotFound from "@/components/Notfound";
import Dashboard from "@/Dashboard/Dashboard";

import UserDetails from "@/Users/UserDetails";
import UsersList from "@/Users/UsersList";
import CustomersList from "@/Customers/CustomersList";
import CustomerDetails from "@/Customers/CustomerDetails";
import DocumentsList from "@/Documents/DocumentsList";
import DocumentDetails from "@/Documents/DocumentDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/yanabea/dashboard" replace />,
    errorElement: <NotFound />,
  },
  {
    path: "/yanabea",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/yanabea/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <UsersList />,
      },
      {
        path: "users/details/:id",
        element: <UserDetails />,
      },
      {
        path: "customers",
        element: <CustomersList   />,
      },
      {
        path: "customers/details/:id",
        element: <CustomerDetails />,
      },
      {
        path: "documents",
        element: <DocumentsList   />,
      },
      {
        path: "documents/details/:id",  
        element: <DocumentDetails />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
