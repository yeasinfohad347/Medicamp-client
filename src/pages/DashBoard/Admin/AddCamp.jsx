import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/AuthContext";

const AddCamp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const {user}=useContext(AuthContext)
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const newCamp = {
        name: data.name,
        image: data.image,
        fees: parseFloat(data.fees),
        date: data.date,
        time: data.time,
        location: data.location,
        healthcareProfessional: data.healthcareProfessional,
        participantCount: 0,
        description: data.description,
        email:user.email
      };

      const res = await axiosSecure.post("/camps", newCamp);

      if (res.data.insertedId) {
        // ✅ SweetAlert instead of toast
        Swal.fire({
          icon: "success",
          title: "Camp Added!",
          text: "Your camp has been successfully added.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          reset();
          navigate("/dashboard");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add camp.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while adding the camp.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-100 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-primary">
        Add A New Camp
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Camp Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <span className="text-red-500">Camp Name is required</span>
          )}
        </div>

        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.image && (
            <span className="text-red-500">Image URL is required</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Camp Fees</label>
            <input
              type="number"
              step="0.01"
              {...register("fees", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.fees && (
              <span className="text-red-500">Camp Fees is required</span>
            )}
          </div>

          <div>
            <label className="label">Date</label>
            <input
              type="date"
              {...register("date", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.date && (
              <span className="text-red-500">Date is required</span>
            )}
          </div>

          <div>
            <label className="label">Time</label>
            <input
              type="time"
              {...register("time", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.time && (
              <span className="text-red-500">Time is required</span>
            )}
          </div>

          <div>
            <label className="label">Location</label>
            <input
              type="text"
              {...register("location", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.location && (
              <span className="text-red-500">Location is required</span>
            )}
          </div>
        </div>

        <div>
          <label className="label">Healthcare Professional Name</label>
          <input
            type="text"
            {...register("healthcareProfessional", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.healthcareProfessional && (
            <span className="text-red-500">Doctor's name is required</span>
          )}
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Describe the purpose, services, and benefits of this camp."
          ></textarea>
          {errors.description && (
            <span className="text-red-500">Description is required</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Camp
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
