import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CampCard from "./CampCard";

const PopularCamp = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: camps = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-camps");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-10 text-lg">Loading popular camps...</div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500">
        Failed to load popular camps.
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 my-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        Popular Medical Camps
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {camps.map((camp) => (
          <CampCard key={camp._id} camp={camp} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/available-camps" className="btn btn-primary btn-wide">
          See All Camps
        </Link>
      </div>
    </section>
  );
};

export default PopularCamp;
