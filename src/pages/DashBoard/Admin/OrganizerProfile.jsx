import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../authentication/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const OrganizerProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: dbUser = {},
    isLoading,
    refetch, // ✅ use refetch after update
  } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Reset form using dbUser (MongoDB) instead of user (Firebase)
  useEffect(() => {
    if (dbUser) {
      reset({
        firstName: dbUser?.name?.split(" ")[0] || "",
        lastName: dbUser?.name?.split(" ")[1] || "",
        email: dbUser?.email || "",
        contact: dbUser?.contact || "",
        organization: dbUser?.organization || "",
        specialty: dbUser?.specialty || "",
        bio: dbUser?.bio || "",
      });
    }
  }, [dbUser, reset]);

  const onSubmit = async (data) => {
    const updatedUser = {
      displayName: `${data.firstName} ${data.lastName}`,
      contact: data.contact,
      organization: data.organization,
      specialty: data.specialty,
      bio: data.bio,
    };

    try {
      const res = await axiosSecure.put(`/users/admin/${user.email}`, {
        ...updatedUser,
        role: "admin", // keep role unchanged
      });

      if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
        setUser((prev) => ({
          ...prev,
          ...updatedUser,
        }));

        await refetch(); // ✅ Refetch data from DB
        Swal.fire("Success!", "Profile updated successfully.", "success");
      } else {
        Swal.fire("Info", "No changes were made.", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update profile.", "error");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-1 text-primary">Admin Profile</h2>
      <p className="mb-6 text-gray-500">
        Manage your personal information and settings
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="avatar placeholder">
          <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl">
            <img src={user?.photoURL} alt="Profile" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {isLoading ? "Loading..." : dbUser?.name || "Admin User"}
          </h3>
          <p className="text-sm text-gray-500">Admin Panel Access</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* First Name */}
        <div>
          <label className="label font-medium">First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
            className="input input-bordered w-full"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="label font-medium">Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            className="input input-bordered w-full"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email (disabled) */}
        <div>
          <label className="label font-medium">Email Address</label>
          <input
            disabled
            className="input input-bordered w-full bg-base-200"
            value={user?.email}
          />
        </div>

        {/* Contact */}
        <div>
          <label className="label font-medium">Phone Number</label>
          <input
            {...register("contact", { required: "Phone number is required" })}
            className="input input-bordered w-full"
            placeholder="e.g. +8801XXXXXXXXX"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact.message}</p>
          )}
        </div>

        {/* Specialty */}
        <div>
          <label className="label font-medium">Admin Area</label>
          <input
            {...register("specialty")}
            className="input input-bordered w-full"
            placeholder="e.g. Management, Supervision"
          />
        </div>

        {/* Organization */}
        <div>
          <label className="label font-medium">Organization</label>
          <input
            {...register("organization")}
            className="input input-bordered w-full"
            placeholder="e.g. MediCamp HQ"
          />
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="label font-medium">Bio</label>
          <textarea
            {...register("bio")}
            rows={3}
            className="textarea textarea-bordered w-full"
            placeholder="Write a short bio about yourself..."
          />
        </div>

        <div className="md:col-span-2">
          <button className="btn btn-primary w-full mt-2">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizerProfile;
