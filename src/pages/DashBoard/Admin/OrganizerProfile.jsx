import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { AuthContext } from "../../../authentication/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const OrganizerProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load existing user data to prefill form
  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
        contact: user.contact || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const updatedUser = {
        name: data.name,
        photoURL: data.photoURL,
        contact: data.contact,
      };

      const res = await axiosSecure.put(`/users/${user.email}`, {
        ...updatedUser,
        role: "organizer", // Preserve the role
      });

      if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
        // Optionally update user context
        setUser((prev) => ({
          ...prev,
          displayName: data.name,
          photoURL: data.photoURL,
          contact: data.contact,
        }));
        toast.success("Profile updated successfully!");
      } else {
        toast.info("No changes made.");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Organizer Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label font-semibold">Full Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="label font-semibold">Profile Image URL</label>
          <input
            {...register("photoURL", { required: "Photo URL is required" })}
            className="input input-bordered w-full"
          />
          {errors.photoURL && (
            <p className="text-red-500 text-sm">{errors.photoURL.message}</p>
          )}
        </div>

        <div>
          <label className="label font-semibold">Contact Info</label>
          <input
            {...register("contact", { required: "Contact is required" })}
            className="input input-bordered w-full"
            placeholder="e.g., +8801XXXXXXXXX"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default OrganizerProfile;
