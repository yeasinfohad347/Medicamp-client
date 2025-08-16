// import { FaStethoscope, FaEye, FaHeartbeat, FaTooth, FaBaby, FaUserMd } from "react-icons/fa";

// export default function ServicesSection() {
//   const services = [
//     {
//       icon: <FaEye className="text-5xl text-blue-500 mb-4" />,
//       title: "Eye Care",
//       desc: "Comprehensive eye exams, vision correction, and advanced treatments for healthy eyesight.",
//     },
//     {
//       icon: <FaStethoscope className="text-5xl text-green-500 mb-4" />,
//       title: "General Checkup",
//       desc: "Routine health checkups and preventive care to keep you and your family healthy.",
//     },
//     {
//       icon: <FaHeartbeat className="text-5xl text-red-500 mb-4" />,
//       title: "Cardiology",
//       desc: "Expert heart care, including diagnosis, monitoring, and advanced cardiac treatments.",
//     },
//     {
//       icon: <FaTooth className="text-5xl text-yellow-500 mb-4" />,
//       title: "Dental Care",
//       desc: "Professional dental services from cleaning and whitening to surgery and implants.",
//     },
//     {
//       icon: <FaBaby className="text-5xl text-pink-500 mb-4" />,
//       title: "Pediatrics",
//       desc: "Specialized healthcare services for infants, children, and adolescents.",
//     },
//     {
//       icon: <FaUserMd className="text-5xl text-purple-500 mb-4" />,
//       title: "Specialist Doctors",
//       desc: "Access to top specialists across multiple medical fields for personalized care.",
//     },
//   ];

//   return (
//     <section className="py-20  transition-colors duration-500">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-primary  mb-4">
//           What Services We Provide
//         </h2>
//         <p className="text-gray-600  mb-12 max-w-2xl mx-auto">
//           We offer a wide range of medical services with top-class facilities and professional care.
//         </p>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, idx) => (
//             <div
//               key={idx}
//               className="bg-white  shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition duration-300"
//             >
//               <div className="flex justify-center">{service.icon}</div>
//               <h3 className="text-xl font-semibold text-gray-800  mb-2">
//                 {service.title}
//               </h3>
//               <p className="text-gray-600 ">{service.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
