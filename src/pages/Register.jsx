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

  const { creatUser, updateUser, signInWithGoogle, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const saveUserToDB = async (user) => {
  const userInfo = {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    role: "user", // default role
    contact: ""   // initially empty
  };

  try {
    await axiosSecure.put(`/users/${user.email}`, userInfo);

    // Now request JWT
    const tokenRes = await axiosSecure.post("/jwt", { email: user.email });
    const token = tokenRes.data.token;

    // Store it in localStorage
    localStorage.setItem("access-token", token);
  } catch (err) {
    console.error("Failed to save user or fetch JWT:", err);
  }
};


  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must contain at least 1 uppercase, 1 lowercase, and 6+ characters.");
      return;
    }

    try {
      const result = await creatUser(email, password);
      const photoUrl = image ? URL.createObjectURL(image) : "";

      await updateUser({ displayName: name, photoURL: photoUrl });

      const updatedUser = {
        ...result.user,
        displayName: name,
        photoURL: photoUrl,
      };

      setUser(updatedUser);
      await saveUserToDB(updatedUser);
    

      Swal.fire({
        title: "Success!",
        text: "Registration completed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate(location?.state?.from?.pathname || "/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email is already registered.");
      } else {
        toast.error("Registration failed. Try again.");
        console.error(err);
      }
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const loggedUser = result.user;
        await saveUserToDB(loggedUser);

        toast.success("Signed in with Google!");
        navigate(location?.state?.from?.pathname || "/");
      })
      .catch((err) => {
        toast.error("Google sign-in failed.");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-lg bg-base-100 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">Register for MediCamp</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label font-medium">Full Name</label>
            <input type="text" name="name" required className="input input-bordered w-full" placeholder="John Doe" />
          </div>

          <div>
            <label className="label font-medium">Email</label>
            <input type="email" name="email" required className="input input-bordered w-full" placeholder="your@email.com" />
          </div>

          <div>
            <label className="label font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="input input-bordered w-full pr-10"
                placeholder="••••••••"
              />
              <span className="absolute top-3 right-3 cursor-pointer text-gray-500" onClick={() => setShowPassword((prev) => !prev)}>
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
              className="file-input file-input-bordered w-full"
              onChange={(e) => setImageName(e.target.files[0]?.name || "No file chosen")}
            />
            <span className="text-xs text-gray-500 mt-1">{imageName}</span>
          </div>

          <button type="submit" className="btn btn-primary w-full">Register</button>
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
          <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
