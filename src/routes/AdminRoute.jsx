// components/AdminRoute.jsx
import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/UseRole";


const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const location = useLocation();

  if (isLoading) return <span>Loading...</span>;

  if (role !== "admin") return <Navigate to="/" state={{ from: location }} replace />;
  return children;
};

export default AdminRoute;
