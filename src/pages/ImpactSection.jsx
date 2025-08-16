// import React from "react";
// import CountUp from "react-countup";

// const stats = [
//   { label: "Camps Organized", value: 120, color: "text-blue-500" },
//   { label: "Participants Served", value: 4500, color: "text-yellow-500" },
//   { label: "Volunteers", value: 300, color: "text-blue-500" },
//   { label: "Communities Reached", value: 50, color: "text-yellow-500" },
// ];

// const ImpactSection = () => {
//   return (
//     <section className="py-20 bg-base-100 text-center ">
//       <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
//         Our Impact
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
//         {stats.map((stat, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-xl shadow-md p-8 hover:shadow-2xl transition transform hover:-translate-y-2"
//           >
//             <h3 className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
//               <CountUp
//                 end={stat.value}
//                 duration={2}
//                 separator=","
//               />
//               {(stat.label === "Camps Organized" || stat.label === "Volunteers") &&
//                 "+"}
//             </h3>
//             <p className="text-gray-600 text-lg">{stat.label}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ImpactSection;
