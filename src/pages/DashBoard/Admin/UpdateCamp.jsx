// // src/pages/Dashboard/Organizer/UpdateCamp.jsx
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Loading from "../../Loading";

// const UpdateCamp = () => {
//   const { campId } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   const [loading, setLoading] = useState(true);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   useEffect(() => {
//     const fetchCamp = async () => {
//       try {
//         const res = await axiosSecure.get(`/camps/${campId}`);
//         reset(res.data);
//       } catch (error) {
//         console.error("Failed to fetch camp:", error);
//         Swal.fire("Error", "Failed to load camp data", "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCamp();
//   }, [campId, axiosSecure, reset]);

//   const onSubmit = async (data) => {
//     try {
//       // Prevent updating immutable _id field
//       delete data._id;

//       const res = await axiosSecure.put(`/update-camp/${campId}`, data);

//       if (res.data.modifiedCount > 0) {
//         Swal.fire("Updated!", "Camp updated successfully", "success");
//         navigate("/dashboard");
//       } else {
//         Swal.fire("No Change", "Nothing was updated", "info");
//       }
//     } catch (error) {
//       console.error("Update failed", error);
//       Swal.fire("Error", "Something went wrong during update", "error");
//     }
//   };

//   if (loading || isSubmitting) return <Loading />;

//   return (
//     <div className="max-w-3xl mx-auto bg-base-100 p-6 rounded-md shadow-md">
//       <h2 className="text-2xl font-semibold mb-6 text-primary">Update Camp</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="label">Camp Name</label>
//           <input
//             {...register("name", { required: true })}
//             className="input input-bordered w-full"
//           />
//           {errors.name && (
//             <span className="text-red-500">Camp name is required</span>
//           )}
//         </div>

//         <div>
//           <label className="label">Image URL</label>
//           <input
//             {...register("image", { required: true })}
//             className="input input-bordered w-full"
//           />
//           {errors.image && (
//             <span className="text-red-500">Image URL is required</span>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="label">Camp Fees</label>
//             <input
//               type="number"
//               step="0.01"
//               {...register("fees", { required: true })}
//               className="input input-bordered w-full"
//             />
//             {errors.fees && <span className="text-red-500">Fees required</span>}
//           </div>
//           <div>
//             <label className="label">Date</label>
//             <input
//               type="date"
//               {...register("date", { required: true })}
//               className="input input-bordered w-full"
//             />
//             {errors.date && (
//               <span className="text-red-500">Date is required</span>
//             )}
//           </div>
//           <div>
//             <label className="label">Time</label>
//             <input
//               type="time"
//               {...register("time", { required: true })}
//               className="input input-bordered w-full"
//             />
//             {errors.time && (
//               <span className="text-red-500">Time is required</span>
//             )}
//           </div>
//           <div>
//             <label className="label">Location</label>
//             <input
//               {...register("location", { required: true })}
//               className="input input-bordered w-full"
//             />
//             {errors.location && (
//               <span className="text-red-500">Location required</span>
//             )}
//           </div>
//         </div>

//         <div>
//           <label className="label">Doctor Name</label>
//           <input
//             {...register("healthcareProfessional", { required: true })}
//             className="input input-bordered w-full"
//           />
//           {errors.healthcareProfessional && (
//             <span className="text-red-500">Doctor required</span>
//           )}
//         </div>

//         <div>
//           <label className="label">Description</label>
//           <textarea
//             {...register("description", { required: true })}
//             className="textarea textarea-bordered w-full"
//             rows={4}
//           ></textarea>
//           {errors.description && (
//             <span className="text-red-500">Description is required</span>
//           )}
//         </div>

//         <button type="submit" className="btn btn-primary w-full">
//           Update Camp
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateCamp;
