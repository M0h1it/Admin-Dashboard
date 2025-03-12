import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#4F75FE", "#62C48F", "#FFBB28", "#FF8042"];

const monthData = {
  December: [
    { name: "Algorithms", value: 92, color: COLORS[0] },
    { name: "Object-Oriented", value: 83, color: COLORS[1] },
    { name: "Database", value: 78, color: COLORS[2] },
    { name: "Machine Learning", value: 65, color: COLORS[3] },
  ],
  January: [
    { name: "Algorithms", value: 88, color: COLORS[0] },
    { name: "Object-Oriented", value: 79, color: COLORS[1] },
    { name: "Database", value: 82, color: COLORS[2] },
    { name: "Machine Learning", value: 70, color: COLORS[3] },
  ],
};

const MyVisit = () => {
  const [selectedMonth, setSelectedMonth] = useState("December");
  const data = monthData[selectedMonth];

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        
        <select
          className="border rounded-md px-3 py-1 text-sm cursor-pointer outline-none"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {Object.keys(monthData).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="relative">
              <PieChart width={100} height={100}>
                <Pie
                  data={[item]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={45}
                  startAngle={90}
                  endAngle={90 + (360 * item.value) / 100}
                  isAnimationActive={true}
                >
                  <Cell fill={item.color} />
                </Pie>
              </PieChart>
              {/* Percentage in Center */}
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {item.value}%
              </div>
            </div>

            {/* Subject Name */}
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVisit;
