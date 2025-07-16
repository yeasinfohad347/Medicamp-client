import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../authentication/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [feedbackCampId, setFeedbackCampId] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const { data: registrations = [], refetch, isLoading } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registrations/${user.email}`);
      return res.data;
    },
  });

  const handleCancel = async (id, paymentStatus) => {
    if (paymentStatus === "paid") return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You will cancel this registration!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/registrations/${id}`);
      if (res.data.deleteResult.deletedCount > 0) {
        Swal.fire("Canceled!", "Your registration has been canceled.", "success");
        refetch();
      }
    }
  };

  const openFeedback = (id) => {
    setFeedbackCampId(id);
    setFeedback("");
    setRating(0);
    document.getElementById("feedbackModal").showModal();
  };

  const submitFeedback = async () => {
    if (!feedback || rating === 0) {
      Swal.fire("Error", "Please write feedback and select a rating.", "error");
      return;
    }

    await axiosSecure.post("/feedbacks", {
      campId: feedbackCampId,
      participantEmail: user.email,
      feedback,
      rating,
      date: new Date().toISOString(),
    });

    Swal.fire("Success", "Thanks for your feedback!", "success");
    document.getElementById("feedbackModal").close();
  };

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Registered Camps</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={reg._id}>
                <td>{index + 1}</td>
                <td>{reg.campName}</td>
                <td>${reg.campFee}</td>
                <td>
                  {reg.paymentStatus === "paid" ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <Link to={`/dashboard/user/payment/${reg._id}`}>
                      <button className="btn btn-sm btn-primary">Pay</button>
                    </Link>
                  )}
                </td>
                <td>
                  {reg.paymentStatus === "paid" && reg.confirmationStatus ? "Confirmed" : "Pending"}
                </td>
                <td className="flex flex-wrap gap-2">
                  {reg.paymentStatus === "paid" && (
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openFeedback(reg._id)}
                    >
                      Feedback
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-error"
                    disabled={reg.paymentStatus === "paid"}
                    onClick={() => handleCancel(reg._id, reg.paymentStatus)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {registrations.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            You haven't registered for any camps yet.
          </p>
        )}
      </div>

      {/* Feedback Modal */}
      <dialog id="feedbackModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Submit Feedback</h3>
          <textarea
            className="textarea textarea-bordered w-full mb-2"
            rows="3"
            placeholder="Write your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <select
            className="select select-bordered w-full mb-4"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={0}>Select Rating</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>{r} Star</option>
            ))}
          </select>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline mr-2">Close</button>
            </form>
            <button className="btn btn-primary" onClick={submitFeedback}>
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RegisteredCamps;
