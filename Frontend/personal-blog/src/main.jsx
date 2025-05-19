import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider,  } from "@tanstack/react-query";

import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter.jsx";
import { Authprovider } from "./context/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Authprovider>
          <RouterProvider router={AppRouter} />
          <Toaster></Toaster>
        </Authprovider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
