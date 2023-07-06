import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routers.tsx";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  </React.StrictMode>
);
