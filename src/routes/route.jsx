import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import CampDetails from "../pages/CampDetails";
import AvailableCamp from "../pages/AvailableCamp";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/camp-details/:id",
        element: <CampDetails />,
      },
      {
        path: "/available-camps",
        element: <AvailableCamp />,
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      }
    ],
  },
]);
