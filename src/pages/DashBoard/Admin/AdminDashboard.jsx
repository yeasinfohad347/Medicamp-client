import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaCalendarPlus, FaMoneyBillWave } from "react-icons/fa";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});

  useEffect(() => {
    axiosSecure.get("/admin-dashboard-stats").then((res) => {
      setStats(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Organizer Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaCalendarPlus /> Camps Created
          </h3>
          <p className="text-3xl font-bold mt-2">{stats.totalCamps || 0}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-green-500">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaUsers /> Total Participants
          </h3>
          <p className="text-3xl font-bold mt-2">{stats.totalParticipants || 0}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaMoneyBillWave /> Total Revenue
          </h3>
          <p className="text-3xl font-bold mt-2">${stats.totalRevenue || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
