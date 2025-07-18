import { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";


import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../authentication/AuthContext";
import Loading from "./Loading";
import Swal from "sweetalert2";

const CampDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const {
    data: camp = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["campDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${id}`);
      return res.data;
    },
  });

  // React Hook Form setup for modal form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  if (isLoading) return <div className="text-center py-10"><Loading/></div>;

  if (isError)
    return <div className="text-center py-10">Failed to load camp data.</div>;

  // Submit handler for Join Camp form
  const onSubmit = async (data) => {
  const participantData = {
    campId: camp._id,
    campName: camp.name,
    campFee: camp.fee,
    location: camp.location,
    healthcareProfessional: camp.healthcareProfessional,
    participantName: user.displayName,
    participantEmail: user.email,
    paymentStatus: "unpaid",
    confirmationStatus: "pending",
    ...data,
  };
  try {
    await axiosSecure.post("/participants", participantData);
    await axiosSecure.patch(`/camps/increment/${camp._id}`);

    Swal.fire({
      icon: "success",
      title: "Joined Successfully!",
      text: `You have successfully joined the camp: ${camp.name}`,
    });

    setShowModal(false);
    reset();
    queryClient.invalidateQueries(["campDetails", id]);
  } catch (error) {
    
    Swal.fire({
      icon: "error",
      title: "Join Failed",
      text: "Something went wrong. Please try again.",
    });
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <img
        src={camp.image}
        alt={camp.name}
        className="rounded-lg w-full h-96 object-cover"
      />
      <h2 className="text-3xl font-bold">{camp.name}</h2>
      <p>
        <strong>Fee:</strong> ${camp.fee}
      </p>
      <p>
        <strong>Date & Time:</strong> {camp.date} at {camp.time}
      </p>
      <p>
        <strong>Location:</strong> {camp.location}
      </p>
      <p>
        <strong>Healthcare Professional:</strong> {camp.healthcareProfessional}
      </p>
      <p>
        <strong>Participants:</strong> {camp.participantCount}
      </p>
      <p>
        <strong>Description:</strong> {camp.description}
      </p>

      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Join Camp
      </button>

      {showModal && (
        <dialog id="join_modal" className="modal" open>
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg mb-4">Join {camp.name}</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Read-only fields */}
              <input
                className="input input-bordered w-full"
                value={camp.name}
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={`$${camp.fee}`}
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={camp.location}
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={camp.healthcareProfessional}
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={user.displayName}
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={user.email}
                readOnly
              />

              {/* User input fields */}
              <div>
                <input
                  type="number"
                  placeholder="Age"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 1, message: "Minimum age is 1" },
                    max: { value: 120, message: "Max age is 120" },
                  })}
                  className={`input input-bordered w-full ${
                    errors.age ? "input-error" : ""
                  }`}
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\-() ]{7,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className={`input input-bordered w-full ${
                    errors.phone ? "input-error" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className={`select select-bordered w-full ${
                    errors.gender ? "select-error" : ""
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Emergency Contact"
                  {...register("emergencyContact", {
                    required: "Emergency Contact is required",
                    minLength: {
                      value: 7,
                      message: "Must be at least 7 characters",
                    },
                  })}
                  className={`input input-bordered w-full ${
                    errors.emergencyContact ? "input-error" : ""
                  }`}
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emergencyContact.message}
                  </p>
                )}
              </div>

              <div className="modal-action justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? "Joining..." : "Confirm Join"}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CampDetails;
