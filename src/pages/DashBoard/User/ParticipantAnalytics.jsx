import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Tooltip,
} from "recharts";
import { AuthContext } from "../../../authentication/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading";

// Custom triangle shape
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
    C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} 
    ${x + width},${y + height}
    Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
  "#e63946",
  "#06d6a0",
  "#f77f00",
  "#118ab2",
  "#ef476f",
];

const ParticipantAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: registeredCamps = [], isLoading } = useQuery({
    queryKey: ["participantAnalytics", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/participant/registered/${user.email}`
      );
      return res.data;
    },
  });

  const chartData = registeredCamps.map((camp) => ({
    name: camp.campName,
    uv: parseFloat(camp.campFee),
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Camp Analytics
      </h2>

      {isLoading ? (
        <p className="text-center"><Loading/></p>
      ) : chartData.length === 0 ? (
        <p className="text-center text-gray-500">No data found.</p>
      ) : (
        <div className="overflow-x-auto">
          <BarChart
            width={600}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`Fee: $${value}`, ""]}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Bar
              dataKey="uv"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default ParticipantAnalytics;
