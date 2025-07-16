import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: roleData, isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role ?? "user";  // <-- fallback default
    },
  });

  return [roleData, isLoading];
};

export default useRole;
