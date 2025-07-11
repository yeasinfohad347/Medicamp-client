// import { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// // import useAuth from "../hooks/useAuth"; // if using custom auth context

// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showPassword, setShowPassword] = useState(false);

//   // const { loginUser } = useAuth(); // your custom context function

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;

//     try {
//       // await loginUser(email, password); // if using Firebase
//       console.log("Logging in with", email, password);
//       toast.success("Login successful");
//       navigate(location?.state?.from?.pathname || "/");
//     } catch (err) {
//       toast.error("Login failed. Please check credentials.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
//       <div className="w-full max-w-md bg-base-100 p-8 shadow-lg rounded-lg">
//         <h2 className="text-3xl font-bold text-center mb-6 text-primary">Login to MediCamp</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="label">
//               <span className="label-text font-medium">Email</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="example@email.com"
//               className="input input-bordered w-full"
//             />
//           </div>

//           <div>
//             <label className="label">
//               <span className="label-text font-medium">Password</span>
//             </label>
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

//           <button className="btn btn-primary w-full">Login</button>
//         </form>

//         <p className="mt-4 text-sm text-center">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-primary hover:underline">
//             Register now
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
