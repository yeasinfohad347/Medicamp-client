// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaCalendarCheck, FaMoneyCheckAlt } from "react-icons/fa";

// const UserDashboard = () => {
//   const axiosSecure = useAxiosSecure();
//   const [userStats, setUserStats] = useState({});

//   useEffect(() => {
//     axiosSecure.get("/user-dashboard-stats").then((res) => {
//       setUserStats(res.data);
//     });
//   }, [axiosSecure]);

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Your Dashboard Overview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-blue-500">
//           <h3 className="text-lg font-semibold flex items-center gap-2">
//             <FaCalendarCheck /> Registered Camps
//           </h3>
//           <p className="text-3xl font-bold mt-2">{userStats.totalRegistered || 0}</p>
//         </div>
//         <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-yellow-500">
//           <h3 className="text-lg font-semibold flex items-center gap-2">
//             <FaMoneyCheckAlt /> Total Payments
//           </h3>
//           <p className="text-3xl font-bold mt-2">${userStats.totalPayments || 0}</p>
//         </div>
//         <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-green-500">
//           <h3 className="text-lg font-semibold">Upcoming Camp</h3>
//           <p className="text-md mt-2">{userStats.upcomingCamp || "No upcoming camp"}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
