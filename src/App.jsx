import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./layout/Layout";
import { Home } from "./pages/Home";
import { UsingRQ } from "./pages/UsingRQ";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UsingRqIndv } from "./pages/UsingRQIndv";

const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/usingrq",
          element: <UsingRQ />,
        },
        {
          path: "/usingrq/:id",
          element: <UsingRqIndv />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
