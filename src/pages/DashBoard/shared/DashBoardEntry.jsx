import useRole from "../../../hooks/UseRole";
import Loading from "../../Loading";
import AdminDashboard from "../Admin/AdminDashboard";
import UserDashboard from "../User/UserDashboard";

const DashboardEntry = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <Loading />;

  if (role === "admin") return <AdminDashboard />;
  if (role === "user") return <UserDashboard />;

  return (
    <div className="text-center mt-10 text-red-500">Unauthorized access.</div>
  );
};

export default DashboardEntry;
