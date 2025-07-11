// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import { useState } from "react";
// import { HiViewGrid, HiViewList } from "react-icons/hi";

// const AvailableCamp = () => {
//   const axiosSecure = useAxiosSecure();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState(""); // e.g., 'name', 'fee', 'participants'
//   const [layout, setLayout] = useState("grid-cols-1 md:grid-cols-2 lg:grid-cols-3");

//   const { data: camps = [], isLoading, isError } = useQuery({
//     queryKey: ["availableCamps"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/available-camps");
//       return res.data;
//     },
//   });

//   // Filter by search
//   const filteredCamps = camps.filter((camp) => {
//     const keyword = searchTerm.toLowerCase();
//     return (
//       camp.name?.toLowerCase().includes(keyword) ||
//       camp.date?.toLowerCase().includes(keyword) ||
//       camp.location?.toLowerCase().includes(keyword) ||
//       camp.healthcareProfessional?.toLowerCase().includes(keyword)
//     );
//   });

//   // Sort
//   const sortedCamps = [...filteredCamps].sort((a, b) => {
//     if (sortBy === "name") return a.name.localeCompare(b.name);
//     if (sortBy === "fee") return (a.fee || 0) - (b.fee || 0);
//     if (sortBy === "participants") return (b.participantCount || 0) - (a.participantCount || 0);
//     return 0;
//   });

//   if (isLoading) return <div className="text-center mt-10">Loading...</div>;
//   if (isError)
//     return (
//       <div className="text-center mt-10 text-red-500">
//         Something went wrong!
//       </div>
//     );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-center mb-6">All Available Camps</h2>

//       {/* Search and controls */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name, date, location..."
//           className="input input-bordered w-full md:w-1/2"
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <select
//           className="select select-bordered"
//           onChange={(e) => setSortBy(e.target.value)}
//           defaultValue=""
//         >
//           <option value="" disabled>Sort by</option>
//           <option value="name">Camp Name (A-Z)</option>
//           <option value="fee">Camp Fees (Low to High)</option>
//           <option value="participants">Most Registered</option>
//         </select>

//        <button
//   className="btn btn-outline flex items-center gap-2"
//   onClick={() =>
//     setLayout((prev) =>
//       prev.includes("lg:grid-cols-3")
//         ? "grid-cols-1 md:grid-cols-2"
//         : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//     )
//   }
// >
//   {layout.includes("lg:grid-cols-3") ? (
//     <>
//       <HiViewList className="text-lg" />
     
//     </>
//   ) : (
//     <>
//       <HiViewGrid className="text-lg" />
      
//     </>
//   )}
// </button>

//       </div>

//       {/* Camp Cards */}
//       <div className={`grid gap-6 ${layout}`}>
//         {sortedCamps.map((camp) => (
//           <div
//             key={camp._id}
//             className="card bg-base-100 shadow-md border-l-4 border-primary"
//           >
//             <figure>
//               <img
//                 src={camp.image}
//                 alt={camp.name}
//                 className="h-52 w-full object-cover"
//               />
//             </figure>
//             <div className="card-body space-y-1">
//               <h2 className="card-title">{camp.name}</h2>
//               <p>
//                 <strong>Date & Time:</strong> {camp.date} | {camp.time}
//               </p>
//               <p><strong>Location:</strong> {camp.location}</p>
//               <p><strong>Doctor:</strong> {camp.healthcareProfessional}</p>
//               <p><strong>Participants:</strong> {camp.participantCount}</p>
//               <p className="text-sm">
//                 {(camp.description && camp.description.slice(0, 60)) || "No description available"}...
//               </p>
//               <div className="card-actions justify-end mt-2">
//                 <Link to={`/camp-details/${camp._id}`}>
//                   <button className="btn btn-outline btn-sm">Details</button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AvailableCamp;
