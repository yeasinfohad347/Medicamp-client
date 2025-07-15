import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import CampDetails from "../pages/CampDetails";
import AvailableCamp from "../pages/AvailableCamp";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

import AdminDashboard from "../pages/DashBoard/Admin/AdminDashboard";
import UserDashboard from "../pages/DashBoard/User/UserDashboard";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardEntry from "../pages/DashBoard/shared/DashBoardEntry";
import OrganizerProfile from "../pages/DashBoard/Admin/OrganizerProfile";
import AddCamp from "../pages/DashBoard/Admin/AddCamp";
import ManageCamps from "../pages/DashBoard/Admin/ManageCamps";
import UpdateCamp from "../pages/DashBoard/Admin/UpdateCamp";
import ManageRegisteredCamps from "../pages/DashBoard/Admin/ManageRegistredCamp";
import ParticipantAnalytics from "../pages/DashBoard/User/ParticipantAnalytics";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardEntry />, // decides which one to show
      },
      {
        path: "admin-profile",
        element: <OrganizerProfile />,
      },
      {
        path: "admin/add-camp",
        element: <AddCamp />,
      },
      {
        path: "admin/manage-camps",
        element: <ManageCamps />,
      },
      {
        path: "admin/update-camp/:campId",
        element: (
          <PrivateRoute>
            <UpdateCamp />
          </PrivateRoute>
        ),
      },
      {
         path: "admin/manage-registered",
       element: <ManageRegisteredCamps />,
      },
      {
        path: "user/analytics",
        element: <ParticipantAnalytics />,
      },
      

      // {
      //   path: "admin/add-camp",
      //   element: <AddCamp />,
      // },
      // {
      //   path: "admin/manage-camps",
      //   element: <ManageCamps />,
      // },
      // {
      //   path: "admin/manage-registered",
      //   element: <ManageRegisteredCamps />,
      // },

      // // User Routes
      // {
      //   path: "user/analytics",
      //   element: <Analytics />,
      // },
      // {
      //   path: "user/profile",
      //   element: <ParticipantProfile />,
      // },
      // {
      //   path: "user/registered",
      //   element: <RegisteredCamps />,
      // },
      // {
      //   path: "user/payments",
      //   element: <PaymentHistory />,
      // },
    ],
  },
]);
