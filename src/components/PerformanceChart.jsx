import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const PerformanceChart = () => {
  const [data, setData] = useState([]);
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
        if (task.status === "completed") completed++;
        else if (task.status === "incomplete") incomplete++;
        else if (task.status === "late_completed") lateCompleted++;
      });
      
      setData([
        { name: "Completed", value: completed },
        { name: "Incomplete", value: incomplete },
        { name: "Late Completed", value: lateCompleted },
      ]);
    };
    
    fetchTasks();
  }, [auth.currentUser]);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#4CAF50" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
