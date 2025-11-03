import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router/Router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./api/Auth/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={new QueryClient()}>
        <ReactQueryDevtools position="top" initialIsOpen={false} />
        <Router />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
