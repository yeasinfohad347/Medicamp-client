import { Outlet } from "react-router";

import SideBar from "../pages/DashBoard/shared/SideBar";
import Topbar from "../pages/DashBoard/shared/Topbar";
import useRole from "../hooks/UseRole";
import Loading from "../pages/Loading";

const DashboardLayout = () => {
  const [role, isLoading] = useRole(); // Fetch role from backend

  if (isLoading) return <Loading />;

  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar with dynamic links based on role */}
      <SideBar role={role} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
