// import { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// // import useAuth from "../hooks/useAuth"; // if using context auth

// const Register = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [imageName, setImageName] = useState("No file chosen");

//   // const { createUser, updateProfileInfo } = useAuth(); // optional custom hook

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;
//     const image = form.image.files[0];

//     // Optional: upload image to ImgBB or Cloudinary and get the URL

//     try {
//       console.log("User Info:", { name, email, password, image });
//       // await createUser(email, password);
//       // await updateProfileInfo({ displayName: name, photoURL: imageURL });
//       toast.success("Account created successfully!");
//       navigate("/");
//     } catch (error) {
//       toast.error("Registration failed.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
//       <div className="w-full max-w-lg bg-base-100 p-8 shadow-lg rounded-lg">
//         <h2 className="text-3xl font-bold text-center mb-6 text-primary">
//           Register for MediCamp
//         </h2>
//         <form onSubmit={handleRegister} className="space-y-4">
//           <div>
//             <label className="label font-medium">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               required
//               placeholder="Your Name"
//               className="input input-bordered w-full"
//             />
//           </div>

//           <div>
//             <label className="label font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="example@email.com"
//               className="input input-bordered w-full"
//             />
//           </div>

//           <div>
//             <label className="label font-medium">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 required
//                 placeholder="••••••••"
//                 className="input input-bordered w-full pr-10"
//               />
//               <span
//                 className="absolute top-3 right-3 cursor-pointer text-gray-500"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </div>

//           <div>
//             <label className="label font-medium">Upload Profile Image</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               required
//               onChange={(e) =>
//                 setImageName(e.target.files[0]?.name || "No file chosen")
//               }
//               className="file-input file-input-bordered w-full"
//             />
//             <span className="text-xs text-gray-500 mt-1">{imageName}</span>
//           </div>

//           <button type="submit" className="btn btn-primary w-full">
//             Register
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center">
//           Already have an account?{" "}
//           <Link to="/login" className="text-primary hover:underline">
//             login 
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
