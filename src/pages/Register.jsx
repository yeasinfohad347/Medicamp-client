import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from "../authentication/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [imageName, setImageName] = useState("No file chosen");
  const [isUploading, setIsUploading] = useState(false);

  const { creatUser, updateUser, signInWithGoogle, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const imgbbApiKey = "e41f298c2814ebe3b0e61497969e7d44"; 

  const handleImageUploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    setIsUploading(true);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const saveUserToDB = async (user) => {
    const userInfo = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      role: "user",
      contact: "",
    };

    try {
      await axiosSecure.put(`/users/${user.email}`, userInfo);

      // Get JWT token
      const tokenRes = await axiosSecure.post("/jwt", { email: user.email });
      const token = tokenRes.data.token;

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
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must contain at least 1 uppercase, 1 lowercase, and 6+ characters.",
      });
      return;
    }

    try {
      // Upload image to ImgBB
      const uploadedImageURL = await handleImageUploadToImgBB(image);

      // Create user in Firebase
      const result = await creatUser(email, password);

      // Update Firebase user profile
     

      const updatedUser = {
        ...result.user,
        displayName: name,
        photoURL: uploadedImageURL,
      };

      setUser(updatedUser);

      // Save user to DB and get token
      await saveUserToDB(updatedUser);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created.",
      });

      navigate(location?.state?.from?.pathname || "/");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Email in Use",
          text: "This email is already registered.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const loggedUser = result.user;
        await saveUserToDB(loggedUser);

        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "Signed in with Google successfully.",
        });

        navigate(location?.state?.from?.pathname || "/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: "Please try again later.",
        });
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
              className="file-input file-input-bordered w-full"
              onChange={(e) => setImageName(e.target.files[0]?.name || "No file chosen")}
            />
            <span className="text-xs text-gray-500 mt-1">{imageName}</span>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isUploading}>
            {isUploading ? "Uploading Image..." : "Register"}
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
          <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
