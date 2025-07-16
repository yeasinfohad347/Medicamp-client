import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../../authentication/AuthContext";

const ManageCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: camps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myCamps", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/organizer-camps/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (campId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/delete-camp/${campId}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Camp has been deleted.", "success");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete camp.", "error");
          console.error(error);
        }
      }
    });
  };

  const totalPages = Math.ceil(camps.length / itemsPerPage);
  const currentItems = camps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Manage Your Camps
      </h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : camps.length === 0 ? (
        <p className="text-center text-gray-500">No camps found.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="table w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>Camp Name</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Doctor</th>
                  <th>Participants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((camp, index) => (
                  <tr key={camp._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{camp.name}</td>
                    <td>
                      {camp.date} | {camp.time}
                    </td>
                    <td>{camp.location}</td>
                    <td>{camp.healthcareProfessional}</td>
                    <td>{camp.participantCount}</td>
                    <td className="flex flex-wrap gap-2">
                      <Link
                        to={`/dashboard/admin/update-camp/${camp._id}`}
                        className="btn btn-sm btn-info"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(camp._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {camps.length > itemsPerPage && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
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
                    currentPage === idx + 1
                      ? "btn-primary"
                      : "btn-outline"
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
        </>
      )}
    </div>
  );
};

export default ManageCamps;
