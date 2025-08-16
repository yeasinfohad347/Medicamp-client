import { useState, useContext } from "react";
import {
  FaHome,
  FaCampground,
  FaSignInAlt,
  FaTachometerAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { AuthContext } from "../authentication/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, logOut } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("access-token");
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const { data: dbUser = {}, isLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="px-4 lg:px-8 max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span className="text-primary">MEDICAMP</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `btn text-base flex items-center gap-2 ${
                isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/available-camps"
            className={({ isActive }) =>
              `btn text-base flex items-center gap-2 ${
                isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            <FaCampground /> Available Camps
          </NavLink>

          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `btn text-base flex items-center gap-2 ${
                isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            <FaInfoCircle /> About Us
          </NavLink>

          {/* Dashboard button */}
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `btn text-base flex items-center gap-2 ${
                  isActive ? "btn-primary" : "btn-ghost"
                }`
              }
            >
              <FaTachometerAlt /> Dashboard
            </NavLink>
          )}

          {/* Logout button */}
          {user && (
            <button
              onClick={handleLogout}
              className="btn btn-ghost flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}

          {/* Profile avatar */}
          {user && (
            <div className="dropdown dropdown-end relative">
              <button
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "/user.png"} alt="User Profile" />
                </div>
              </button>

              {isDropdownOpen && (
                <ul className="absolute right-0 mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li className="text-center font-semibold">
                    {isLoading
                      ? "Loading..."
                      : dbUser?.name || user?.displayName || "User"}
                  </li>
                  
                </ul>
              )}
            </div>
          )}

          {/* Join/Login button for guests */}
          {!user && (
            <Link
              to="/login"
              className="btn btn-primary btn-sm flex items-center gap-2"
            >
              <FaSignInAlt /> Join Us
            </Link>
          )}

          {/* Theme Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <MdLightMode />
            <input
              type="checkbox"
              value="dark"
              className="toggle theme-controller"
            />
            <MdDarkMode />
          </label>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="btn btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-base-100 z-20 flex flex-col items-center gap-2 p-4 shadow-md lg:hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `btn text-base flex items-center gap-2 ${
                  isActive ? "btn-primary" : "btn-ghost"
                }`
              }
            >
              <FaHome /> Home
            </NavLink>

            <NavLink
              to="/available-camps"
              className={({ isActive }) =>
                `btn text-base flex items-center gap-2 ${
                  isActive ? "btn-primary" : "btn-ghost"
                }`
              }
            >
              <FaCampground /> Available Camps
            </NavLink>

            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `btn text-base flex items-center gap-2 ${
                  isActive ? "btn-primary" : "btn-ghost"
                }`
              }
            >
              <FaInfoCircle /> About Us
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `btn text-base flex items-center gap-2 ${
                      isActive ? "btn-primary" : "btn-ghost"
                    } w-full`
                  }
                >
                  <FaTachometerAlt /> Dashboard
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `btn text-base flex items-center gap-2 ${
                      isActive ? "btn-primary" : "btn-ghost"
                    } w-full`
                  }
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="btn btn-ghost w-full flex justify-start gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            )}

            {!user && (
              <Link
                to="/login"
                className="btn btn-primary w-full flex justify-start gap-2"
              >
                <FaSignInAlt /> Join Us
              </Link>
            )}

            {/* Theme Toggle (Mobile) */}
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <MdLightMode />
              <input
                type="checkbox"
                value="dark"
                className="toggle theme-controller"
              />
              <MdDarkMode />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
