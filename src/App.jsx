import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layout";
import Landing from "./pages/landing";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Link from "./pages/link";
import Redirect from "./pages/redirect";
import UrlProvider from "./context/context";
import AuthRequired from "./components/AuthRequired";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: (
          <AuthRequired>
            <Dashboard />
          </AuthRequired>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <AuthRequired>
            <Link />
          </AuthRequired>
        ),
      },
      {
        path: "/:id",
        element: <Redirect />,
      },
    ],
  },
]);
function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
