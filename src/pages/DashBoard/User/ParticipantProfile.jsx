// src/pages/Dashboard/User/ParticipantProfile.jsx

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/AuthContext";
import Swal from "sweetalert2";

const ParticipantProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/participant/profile/${user.email}`);
        reset(res.data);
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    if (user?.email) {
      fetchProfile();
    }
  }, [user?.email, axiosSecure, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.put(`/participant/profile/${user.email}`, data);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Profile updated successfully", "success");
      } else {
        Swal.fire("No Changes", "Nothing was updated", "info");
      }
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Manage Your Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="label">Full Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>

        <div>
          <label className="label">Profile Image URL</label>
          <input
            {...register("image", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.image && <span className="text-red-500">Image URL is required</span>}
        </div>

        <div>
          <label className="label">Contact Number</label>
          <input
            type="text"
            {...register("contact", {
              required: true,
              pattern: /^[0-9]{10,15}$/,
            })}
            className="input input-bordered w-full"
          />
          {errors.contact && (
            <span className="text-red-500">Valid contact number is required</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ParticipantProfile;
