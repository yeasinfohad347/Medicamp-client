// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// import Swal from "sweetalert2";
// import { useContext } from "react";
// import { AuthContext } from "../../../authentication/AuthContext";

// const ManageRegistredCamp = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);

//   const {
//     data: registered = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["registeredCamps", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/participant`);
//       return res.data;
//     },
//   });

//   const handleConfirm = async (id, paymentStatus) => {
//     if (paymentStatus !== "paid") {
//       return Swal.fire(
//         "Payment Required",
//         "Cannot confirm without payment.",
//         "warning"
//       );
//     }

//     try {
//       const res = await axiosSecure.put(`/participant/confirm/${id}`);
//       if (res.data.modifiedCount > 0) {
//         Swal.fire("Confirmed!", "The registration is confirmed.", "success");
//         refetch();
//       }
//     } catch {
//       Swal.fire("Error", "Could not confirm registration", "error");
//     }
//   };

//   const handleCancel = async (id, isPaid, isConfirmed) => {
//     if (isPaid && isConfirmed) return;

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will remove the registration!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, cancel it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const res = await axiosSecure.delete(`/participant/cancel/${id}`);
//         if (res.data.deleteResult?.deletedCount > 0) {
//           Swal.fire("Cancelled!", "Registration removed.", "success");
//           refetch();
//         }
//       } catch {
//         Swal.fire("Error", "Failed to cancel registration", "error");
//       }
//     }
//   };

//   if (isLoading) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-primary">
//         Manage Registered Camps
//       </h2>
//       {registered.length === 0 ? (
//         <p>No registrations found.</p>
//       ) : (
//         <div className="overflow-x-auto shadow-md rounded-lg">
//           <table className="table w-full">
//             <thead className="bg-base-200">
//               <tr>
//                 <th>#</th>
//                 <th>Camp Name</th>
//                 <th>Participant</th>
//                 <th>Fees</th>
//                 <th>Payment</th>
//                 <th>Confirmation</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {registered.map((item, idx) => (
//                 <tr key={item._id}>
//                   <td>{idx + 1}</td>
//                   <td>{item.campName}</td>
//                   <td>{item.participantName}</td>
//                   <td>${item.campFee}</td>
//                   <td>{item.paymentStatus}</td>
//                   <td>
//                     {item.confirmationStatus === "pending" ? (
//                       <button
//                         onClick={() =>
//                           handleConfirm(item._id, item.paymentStatus)
//                         }
//                         className="btn btn-xs btn-warning"
//                         disabled={item.paymentStatus !== "paid"}
//                       >
//                         Pending
//                       </button>
//                     ) : (
//                       <span className="text-green-600 font-medium">
//                         Confirmed
//                       </span>
//                     )}
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-xs btn-error"
//                       disabled={
//                         item.paymentStatus === "paid" &&
//                         item.confirmationStatus === "confirmed"
//                       }
//                       onClick={() =>
//                         handleCancel(
//                           item._id,
//                           item.paymentStatus === "paid",
//                           item.confirmationStatus === "confirmed"
//                         )
//                       }
//                     >
//                       Cancel
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageRegistredCamp;
