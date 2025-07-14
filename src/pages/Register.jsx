import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../authentication/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [imageName, setImageName] = useState("No file chosen");

  const { creatUser, updateUser, signInWithGoogle, setUser } =
    useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

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
      console.error("Failed to save user to DB:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!regex.test(password)) {
      toast.error(
        "Password must include:\n• One uppercase letter\n• One lowercase letter\n• Minimum 6 characters",
        { autoClose: 5000 }
      );
      return;
    }

    try {
      const result = await creatUser(email, password);
      const photoUrl = image ? URL.createObjectURL(image) : "";

      await updateUser({
        displayName: name,
        photoURL: photoUrl,
      });

      const updatedUser = {
        ...result.user,
        displayName: name,
        photoURL: photoUrl,
      };

      setUser(updatedUser);

      // ✅ Save to DB
      await saveUserToDB(updatedUser);

      Swal.fire({
        title: "Congratulations!",
        text: "You successfully registered!",
        icon: "success",
      });
      navigate(location?.state?.from?.pathname || "/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else {
        toast.error("Registration failed: " + err.message);
        console.error(err);
      }
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-lg bg-base-100 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Register for MediCamp
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
          </div>

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

          <div>
            <label className="label font-medium">Upload Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={(e) =>
                setImageName(e.target.files[0]?.name || "No file chosen")
              }
              className="file-input file-input-bordered w-full"
            />
            <span className="text-xs text-gray-500 mt-1">{imageName}</span>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} /> Register with Google
          </button>
        </div>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
