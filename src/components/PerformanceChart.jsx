import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const PerformanceChart = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("December");
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!auth.currentUser) return;
      
      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, where("userId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      
      let completed = 0;
      let incomplete = 0;
      let lateCompleted = 0;
      
      snapshot.forEach((doc) => {
        const task = doc.data();
        if (task.status === "completed" && task.month === month) completed++;
        else if (task.status === "incomplete" && task.month === month) incomplete++;
        else if (task.status === "late_completed" && task.month === month) lateCompleted++;
      });
      
      setData([
        { name: "Completed", value: completed },
        { name: "Incomplete", value: incomplete },
        { name: "Late Completed", value: lateCompleted },
      ]);
    };
    
    fetchTasks();
  }, [auth.currentUser, month]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
  <div className="flex justify-between items-center mb-2">
    <div className="flex items-center space-x-2">
      <p className="text-gray-600 text-sm font-semibold">Best Lessons:</p>
      <span className="text-xl font-bold text-black">95.4</span>
    </div>
    <select 
      value={month} 
      onChange={(e) => setMonth(e.target.value)}
      className="p-1 text-sm border rounded-md cursor-pointer transition-all duration-200">
      <option value="December">December</option>
      <option value="November">November</option>
      <option value="October">October</option>
    </select>
  </div>

  {/* Bar Chart */}
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#4CAF50" />
    </BarChart>
  </ResponsiveContainer>

  {/* All Lessons Button */}
  <div className="text-right mt-2">
    <button className="text-black-500 text-sm font-medium cursor-pointer bg-white border rounded-md px-2 py-1">
      All Lessons
    </button>
  </div>
</div>

  );
};

export default PerformanceChart;
