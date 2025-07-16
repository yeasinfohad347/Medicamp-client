import { useContext, useEffect, useState } from "react";
import { FaMoon, FaSun, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../authentication/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Topbar = ({ onToggleSidebar }) => {
  const { user, logOut } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("access-token");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✅ Get user info from your MongoDB
  const { data: dbUser = {}, isLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Hamburger menu for mobile */}
      <div className="flex-none md:hidden">
        <button
          onClick={onToggleSidebar}
          className="btn btn-ghost btn-square"
          aria-label="Open sidebar"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Title */}
      <div className="flex-1">
        <h1 className="text-xl font-bold text-primary truncate">Dashboard</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-sm btn-ghost"
          title="Toggle Theme"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {/* User Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user?.photoURL || "/user.png"} alt="User" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li className="text-center font-semibold truncate">
              {isLoading ? "Loading..." : dbUser?.name || "Unknown User"}
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center gap-2">
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
