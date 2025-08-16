// import { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaCalendarCheck, FaMoneyCheckAlt } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { AuthContext } from "../../../authentication/AuthContext";
// import Loading from "../../Loading";
// import { Link } from "react-router";

// const UserDashboard = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);

//   const {
//     data: registrations = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["userRegistrations", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/participant/registered/${user.email}`
//       );
//       return res.data; // this returns all registration documents for this user
//     },
//   });

//   if (isLoading) return <Loading />;
//   if (isError)
//     return <p className="text-center text-red-500">Failed to load data.</p>;

//   const totalRegistered = registrations.length;
//   const totalPayments = registrations
//     .filter((r) => r.paymentStatus === "paid")
//     .reduce((sum, r) => sum + r.campFee, 0);
//   const upcomingCamp = registrations[0]?.campName || "No upcoming camp";

//   const recentActivities = registrations
//     .slice(-5) // last 5 registrations
//     .map((r) => `${r.campName} (${r.confirmationStatus})`);

//   const achievements = [
//     `${totalRegistered} Camps Joined`,
//     `${
//       registrations.filter((r) => r.paymentStatus === "paid").length
//     } Payments Completed`,
//   ];

//   return (
//     <div className="space-y-10 px-4 md:px-8 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center text-primary">
//         Your Dashboard Overview
//       </h2>

//       {/* Top Row Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="shadow-md p-6 rounded-lg border-l-4 border-blue-500 bg-base-100">
//           <h3 className="text-lg font-semibold flex items-center gap-2">
//             <FaCalendarCheck /> Registered Camps
//           </h3>
//           <p className="text-3xl font-bold mt-2">{totalRegistered}</p>
//         </div>

//         <div className="shadow-md p-6 rounded-lg border-l-4 border-yellow-500 bg-base-100">
//           <h3 className="text-lg font-semibold flex items-center gap-2">
//             <FaMoneyCheckAlt /> Total Payments
//           </h3>
//           <p className="text-3xl font-bold mt-2">${totalPayments}</p>
//         </div>

//         <div className="shadow-md p-6 rounded-lg border-l-4 border-green-500 bg-base-100">
//           <h3 className="text-lg font-semibold">Upcoming Camp</h3>
//           <p className="text-md mt-2">{upcomingCamp}</p>
//         </div>
//       </div>

//       {/* Middle Row */}
//       {/* Recent Activities */}
//       <div className="shadow-md p-6 rounded-lg bg-base-100">
//         <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>

//         {recentActivities.length > 0 ? (
//           <ul className="space-y-4">
//             {recentActivities.map((activity, idx) => (
//               <li
//                 key={idx}
//                 className="flex items-start gap-3 p-2 rounded-md hover:bg-primary hover:text-white transition"
//               >
//                 {/* Optional Icon */}
//                 <span className="text-blue-500 mt-1">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 </span>

//                 <p className="text-sm">{activity}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No recent activities</p>
//         )}
//       </div>

//       {/* Bottom Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Achievements */}
//         <div className="shadow-md p-6 rounded-lg bg-base-100">
//           <h3 className="text-lg font-semibold mb-3">Achievements</h3>
//           <div className="flex flex-wrap gap-2">
//             {achievements.map((ach, idx) => (
//               <span
//                 key={idx}
//                 className="px-3 py-1 bg-yellow-200 rounded-full text-sm font-medium"
//               >
//                 {ach}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Next Camp Countdown */}
//         <div className="shadow-md p-6 rounded-lg bg-base-100 text-center">
//           <h3 className="text-lg font-semibold">Next Camp Starts In</h3>
//           <p className="text-3xl font-bold text-primary mt-2">
//             {registrations[0]?.daysToCamp || "N/A"} Days
//           </p>
//         </div>

//         {/* Quick Actions */}
//         <div className="shadow-md p-6 rounded-lg bg-base-100 flex flex-col gap-3 items-center">
//           <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
//           <Link to="/available-camps"><button className="btn btn-primary w-full">Register New Camp</button></Link>
//          <Link to="user/payment-history"> <button className="btn btn-outline w-full">View Payments</button></Link>
//           <Link to="user/profile"><button className="btn btn-outline w-full">Edit Profile</button></Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
