import { Link, NavLink } from "react-router";
import { FaHome, FaUser, FaCampground, FaClipboardList, FaPlus, FaMoneyCheckAlt, FaChartBar } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import logo from "../../../assets/logo.png"; // your logo path

const SideBar = ({ role }) => {
  return (
    <div className="w-64 min-h-screen bg-primary text-white flex flex-col">
      <div className="flex items-center justify-center py-6 border-b border-white/30">
        <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
        <h2 className="text-xl font-bold">MediCamp</h2>
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        <NavLink to="/dashboard" className="btn btn-ghost justify-start">
          <FaHome /> Dashboard
        </NavLink>

        {role === "admin" && (
          <>
            <NavLink to="/dashboard/admin-profile" className="btn btn-ghost justify-start">
              <FaUser /> Organizer Profile
            </NavLink>
            <NavLink to="/dashboard/admin/add-camp" className="btn btn-ghost justify-start">
              <FaPlus /> Add A Camp
            </NavLink>
            <NavLink to="/dashboard/admin/manage-camps" className="btn btn-ghost justify-start">
              <MdManageAccounts /> Manage Camps
            </NavLink>
            <NavLink to="/dashboard/admin/manage-registered" className="btn btn-ghost justify-start">
              <FaClipboardList /> Manage Registered Camps
            </NavLink>
          </>
        )}

        {role === "user" && (
          <>
            <NavLink to="/dashboard/user/analytics" className="btn btn-ghost justify-start">
              <FaChartBar /> Analytics
            </NavLink>
            <NavLink to="/dashboard/user/profile" className="btn btn-ghost justify-start">
              <FaUser /> Participant Profile
            </NavLink>
            <NavLink to="/dashboard/user/manage-camps" className="btn btn-ghost justify-start">
              <FaCampground /> Registered Camps
            </NavLink>
            <NavLink to="/dashboard/user/payment-history" className="btn btn-ghost justify-start">
              <FaMoneyCheckAlt /> Payment History
            </NavLink>
          </>
        )}

        <div className="mt-auto">
          <NavLink to="/" className="btn btn-outline w-full mt-6">
            Back to Home
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
