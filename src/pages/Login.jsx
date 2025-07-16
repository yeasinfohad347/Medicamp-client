import { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from "../authentication/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // ✅ Save user to DB if not already exists
  const saveUserToDB = async (user) => {
    try {
      // Check if user already exists in DB
      const checkRes = await axiosSecure.get(`/users?email=${user.email}`);
      const existingUser = checkRes.data;

      // If exists, don't overwrite existing role (admin/user)
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: existingUser?.role || "user", // Preserve role if exists
        contact: existingUser?.contact || "",
      };

      await axiosSecure.put(`/users/${user.email}`, userInfo);

      // Get JWT
      const tokenRes = await axiosSecure.post("/jwt", { email: user.email });
      const token = tokenRes.data.token;

      localStorage.setItem("access-token", token);
    } catch (err) {
      console.error("Failed to save user or fetch JWT:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const loggedUser = result.user;

      await saveUserToDB(loggedUser);

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Logged in with Google.",
      });

      navigate(location?.state?.from?.pathname || "/");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Google sign-in failed.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);

      const res = await axiosSecure.post("/jwt", { email });
      localStorage.setItem("access-token", res.data.token);

      Swal.fire({
        title: "Welcome Back!",
        text: "You successfully logged in!",
        icon: "success",
      });

      navigate(location?.state?.from?.pathname || "/");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Invalid email or password.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Login to MediCamp
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@email.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="input input-bordered w-full pr-10"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button className="btn btn-primary w-full">Login</button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} /> Login with Google
          </button>
        </div>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
