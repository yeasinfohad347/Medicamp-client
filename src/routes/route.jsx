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
import ParticipantProfile from "../pages/DashBoard/User/ParticipantProfile";
import RegisteredCamps from "../pages/DashBoard/User/RegisteredCamps";
import Payment from "../pages/DashBoard/User/payment/Payment";
import PaymentHistory from "../pages/DashBoard/User/PaymentHistory";
import ErrorPage from "../pages/ErrorPage";
import AboutUs from "../pages/AboutUs";

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
        element: <PrivateRoute><CampDetails /></PrivateRoute>,
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
      {
        path:"/about-us",
        element:<AboutUs/>
      }
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
        element: (
          <AdminRoute>
            <OrganizerProfile />
          </AdminRoute>
        ),
      },
      {
        path: "admin/add-camp",
        element: (
          <AdminRoute>
            <AddCamp />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-camps",
        element: (
          <AdminRoute>
            <ManageCamps />
          </AdminRoute>
        ),
      },
      {
        path: "admin/update-camp/:campId",
        element: (
          <AdminRoute>
            <UpdateCamp />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-registered",
        element: (
          <AdminRoute>
            <ManageRegisteredCamps />
          </AdminRoute>
        ),
      },
      {
        path: "user/analytics",
        element: <ParticipantAnalytics />,
      },
      {
        path: "user/profile",
        element: <ParticipantProfile />,
      },
      {
        path: "user/manage-camps",
        element: <RegisteredCamps />,
      },
      {
        path: "user/payment/:id",
        element: <Payment />,
      },
      {
        path: "user/payment-history",
        element: <PaymentHistory />,
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
  {
    path:"*",
    element:<ErrorPage/>
  }
]);
