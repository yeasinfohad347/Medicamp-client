// import { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../../../authentication/AuthContext";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// import Swal from "sweetalert2";
// import Loading from "../../Loading";

// const PaymentHistory = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: paymentHistory = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["paymentHistory", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/registrations/${user.email}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <Loading />;

//   if (isError) {
//     Swal.fire("Error", error?.message || "Failed to load data", "error");
//     return null;
//   }

//   const paidCamps = paymentHistory.filter((item) => item.paymentStatus === "paid");

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold text-center mb-4">Payment History</h2>
//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Camp Name</th>
//               <th>Fees</th>
//               <th>Transaction ID</th>
//               <th>Payment Status</th>
//               <th>Confirmation</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paidCamps.map((camp, index) => (
//               <tr key={camp._id}>
//                 <td>{index + 1}</td>
//                 <td>{camp.campName}</td>
//                 <td>${camp.campFee}</td>
//                 <td className="text-sm break-all">
//                   {camp.transactionId || <span className="text-red-500">Missing</span>}
//                 </td>
//                 <td className="text-green-600 font-semibold">Paid</td>
//                 <td>
//                   {camp.confirmationStatus ? (
//                     <span className="text-blue-600">Confirmed</span>
//                   ) : (
//                     <span className="text-gray-500">Pending</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {paidCamps.length === 0 && (
//           <p className="text-center mt-4 text-gray-500">
//             You have no completed payments yet.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentHistory;
