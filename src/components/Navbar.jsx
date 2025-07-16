import { useState, useEffect, useContext } from "react";
import {
  FaHome,
  FaCampground,
  FaSignInAlt,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { AuthContext } from "../authentication/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("access-token");
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="pt-5">
      <div className="navbar shadow-md px-4 lg:px-8 max-w-7xl rounded-2xl mx-auto border-b-2 border-blue-600">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span className="text-primary">MEDICAMP</span>
          </Link>
        </div>

        <div className="hidden lg:flex gap-4 items-center">
          <Link
            to="/"
            className="btn btn-ghost text-base flex items-center gap-2"
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/available-camps"
            className="btn btn-ghost text-base flex items-center gap-2"
          >
            <FaCampground /> Available Camps
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="btn btn-primary btn-sm flex items-center gap-2"
            >
              <FaSignInAlt /> Join Us
            </Link>
          ) : (
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
                    {user.displayName || "User"}
                  </li>
                  <li>
                    <Link to="/dashboard">
                      <FaTachometerAlt /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}

          <button
            className="btn btn-sm btn-ghost rounded-full"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <MdDarkMode size={20} />
            ) : (
              <MdLightMode size={20} />
            )}
          </button>
        </div>

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
            <Link
              to="/"
              className="btn btn-ghost w-full flex justify-start gap-2"
            >
              <FaHome /> Home
            </Link>
            <Link
              to="/available-camps"
              className="btn btn-ghost w-full flex justify-start gap-2"
            >
              <FaCampground /> Available Camps
            </Link>
            {!user ? (
              <Link
                to="/login"
                className="btn btn-primary w-full flex justify-start gap-2"
              >
                <FaSignInAlt /> Join Us
              </Link>
            ) : (
              <>
                <span className="text-lg font-semibold">
                  {user.displayName}
                </span>
                <Link
                  to="/dashboard"
                  className="btn btn-ghost w-full flex justify-start gap-2"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost w-full flex justify-start gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
