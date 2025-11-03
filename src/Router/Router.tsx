import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import App from "../App";
import NotFound from "@/components/Notfound";
import Dashboard from "@/Dashboard/Dashboard";

import UserDetails from "@/Users/UserDetails";
import UsersList from "@/Users/UsersList";
import CustomersList from "@/Customers/CustomersList";
import CustomerDetails from "@/Customers/CustomerDetails";
import DocumentsList from "@/Documents/DocumentsList";
import DocumentDetails from "@/Documents/DocumentDetails";
import LoginPage from "@/Login/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import FilterProvider from "@/contexts/Filter/FilterProvider";
import UserProvider from "@/contexts/User/UserProvider";

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
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <UserProvider>
              <UsersList />
            </UserProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: "users/details/:id",
        element: (
          <ProtectedRoute>
            <UserProvider>
              <UserDetails />
            </UserProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: "customers",
        element: (
          <ProtectedRoute>
            <CustomersList />
          </ProtectedRoute>
        ),
      },
      {
        path: "customers/details/:id",
        element: (
          <ProtectedRoute>
            <CustomerDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "documents",
        element: (
          <ProtectedRoute>
            <FilterProvider>
              <DocumentsList />
            </FilterProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: "documents/details/:filter/:id",
        element: (
          <ProtectedRoute>
            <FilterProvider>
              <DocumentDetails />
            </FilterProvider>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    errorElement: <NotFound />,
    element: <LoginPage />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
