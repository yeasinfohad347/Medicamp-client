import { useState } from "react";
import { Outlet } from "react-router";
import SideBar from "../pages/DashBoard/shared/SideBar";
import Topbar from "../pages/DashBoard/shared/Topbar";
import useRole from "../hooks/UseRole";
import Loading from "../pages/Loading";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, isLoading] = useRole();

  if (isLoading) return <Loading />;

  return (
    <div className="flex h-screen bg-base-200 overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <SideBar role={role} />
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-base-100 overflow-y-auto transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar role={role} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full h-full overflow-hidden">
        {/* Topbar */}
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
