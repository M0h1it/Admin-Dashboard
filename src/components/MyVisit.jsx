import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
    <div className="bg-white p-4 rounded-2xl shadow-md">
      {/* Month Selection */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Visit</h2>
        <select
          className="border rounded-md px-2 py-1 text-sm cursor-pointer"
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

      {/* Graphs */}
      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <ResponsiveContainer width={80} height={80}>
              <PieChart>
                <Pie
                  data={[item]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={35}
                  fill={item.color}
                  startAngle={90}
                  endAngle={90 + (360 * item.value) / 100}
                  isAnimationActive={false}
                >
                  <Cell key={`cell-${index}`} fill={item.color} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Percentage in the middle */}
            <div className="absolute text-xs font-semibold mt-8">
              {item.value}%
            </div>

            {/* Subject Name */}
            <span className="text-sm font-medium mt-2">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVisit;
