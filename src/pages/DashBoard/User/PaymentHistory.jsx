import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../authentication/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Loading";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: paymentHistory = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registrations/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    Swal.fire("Error", error?.message || "Failed to load data", "error");
    return null;
  }

  const paidCamps = paymentHistory.filter(
    (item) => item.paymentStatus === "paid"
  );

  // Pagination logic
  const totalPages = Math.ceil(paidCamps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = paidCamps.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Transaction ID</th>
              <th>Payment Status</th>
              <th>Confirmation</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((camp, index) => (
              <tr key={camp._id}>
                <td>{startIndex + index + 1}</td>
                <td>{camp.campName}</td>
                <td>${camp.campFee}</td>
                <td className="text-sm break-all">
                  {camp.transactionId || (
                    <span className="text-red-500">Missing</span>
                  )}
                </td>
                <td className="text-green-600 font-semibold">Paid</td>
                <td>
                  {camp.confirmationStatus ? (
                    <span className="text-blue-600">Confirmed</span>
                  ) : (
                    <span className="text-gray-500">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paidCamps.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            You have no completed payments yet.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 items-center gap-2 flex-wrap">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`btn btn-sm ${
                currentPage === idx + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="btn btn-sm btn-outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
