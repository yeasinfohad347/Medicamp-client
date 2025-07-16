import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CampCard from "./CampCard";
import { motion } from "framer-motion";

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
    <motion.section
      className="max-w-7xl mx-auto px-4 my-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Popular Medical Camps
      </motion.h2>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {camps.map((camp) => (
          <motion.div
            key={camp._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
            }}
            className="transition-all duration-300"
          >
            <CampCard camp={camp} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link to="/available-camps">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-wide"
          >
            See All Camps
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default PopularCamp;
