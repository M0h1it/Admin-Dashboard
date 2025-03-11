import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#4F75FE", "#62C48F", "#FFBB28", "#FF8042"];

const data = [
  { name: "Algorithms", value: 92, color: COLORS[0] },
  { name: "Object-Oriented", value: 83, color: COLORS[1] },
  { name: "Database", value: 78, color: COLORS[2] },
  { name: "Machine Learning", value: 65, color: COLORS[3] },
];

const MyVisit = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">My Visit</h2>

      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
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
                >
                  <Cell key={`cell-${index}`} fill={item.color} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <span className="text-sm font-medium mt-2">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVisit;
