import React, { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion"; // For animation

const performanceData = {
  December: [
    { subject: "Math", completed: 40, incomplete: 10 },
    { subject: "Science", completed: 35, incomplete: 15 },
    { subject: "English", completed: 30, incomplete: 20 },
    { subject: "History", completed: 45, incomplete: 5 },
    { subject: "Physics", completed: 50, incomplete: 8 },
  ],
  November: [
    { subject: "Math", completed: 38, incomplete: 12 },
    { subject: "Science", completed: 33, incomplete: 17 },
    { subject: "English", completed: 28, incomplete: 22 },
    { subject: "History", completed: 42, incomplete: 7 },
    { subject: "Physics", completed: 48, incomplete: 9 },
  ],
};

const PerformanceSection = () => {
  const [month, setMonth] = useState("December");
  const [data, setData] = useState(performanceData[month]);

  useEffect(() => {
    setData([]);
    setTimeout(() => setData(performanceData[month]), 300); // Animation delay
  }, [month]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <p className="text-gray-600 text-sm font-semibold">Best Lessons:</p>
          <span className="text-xl font-bold text-black">95.4%</span>
        </div>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-1 text-sm border rounded-md cursor-pointer transition-all duration-200"
        >
          {Object.keys(performanceData).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Performance Bar Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" fill="#1E3A8A" barSize={30} />
          <Bar dataKey="incomplete" fill="#93C5FD" barSize={30} />
        </BarChart>
      </ResponsiveContainer>

      {/* All Lessons Button */}
      <div className="text-right mt-2">
        <button className="text-black text-sm font-medium cursor-pointer bg-white border rounded-md px-2 py-1">
          All Lessons
        </button>
      </div>
    </motion.div>
  );
};

export default PerformanceSection;
