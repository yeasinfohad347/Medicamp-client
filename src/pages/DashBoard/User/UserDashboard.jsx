import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarCheck, FaMoneyCheckAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../authentication/AuthContext";
import Loading from "../../Loading";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: userStats = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userDashboardStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-dashboard-stats?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) {
    console.error("Error loading dashboard stats:", error);
    return <p className="text-center text-red-500">Failed to load dashboard data.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Registered Camps */}
        <div className="shadow-md p-6 rounded-lg border-l-4 border-blue-500 bg-base-100">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaCalendarCheck /> Registered Camps
          </h3>
          <p className="text-3xl font-bold mt-2">
            {userStats.totalRegistered || 0}
          </p>
        </div>

        {/* Total Payments */}
        <div className="shadow-md p-6 rounded-lg border-l-4 border-yellow-500 bg-base-100">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaMoneyCheckAlt /> Total Payments
          </h3>
          <p className="text-3xl font-bold mt-2">
            ${userStats.totalPayments || 0}
          </p>
        </div>

        {/* Upcoming Camp */}
        <div className="shadow-md p-6 rounded-lg border-l-4 border-green-500 bg-base-100">
          <h3 className="text-lg font-semibold">Upcoming Camp</h3>
          <p className="text-md mt-2">
            {userStats.upcomingCamp || "No upcoming camp"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
