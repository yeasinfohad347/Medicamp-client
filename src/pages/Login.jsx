import { use, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../authentication/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, signInWithGoogle } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Save user to DB (only for Google login)
  const saveUserToDB = async (user) => {
    const userInfo = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      role: "user", // default role
    };

    try {
      await axiosSecure.put(`/users/${user.email}`, userInfo);
    } catch (err) {
      console.error("Failed to save user to DB", err);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const loggedUser = result.user;

        // 🔐 Save user to DB
        await saveUserToDB(loggedUser);

        toast.success("Logged in with Google!");
        navigate(location?.state?.from?.pathname || "/");
      })
      .catch((err) => {
        toast.error("Google Sign-In failed. Please try again.");
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Welcome Back!",
          text: "You successfully logged in!",
          icon: "success",
        });
        navigate(location?.state?.from?.pathname || "/");
      })
      .catch(() => {
        toast.error("Wrong email or password.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Login to MediCamp
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@email.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
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
