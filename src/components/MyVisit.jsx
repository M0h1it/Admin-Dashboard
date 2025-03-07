import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MyVisit = () => {
  const [data, setData] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchVisits = async () => {
      if (!auth.currentUser) return;
      
      const visitsRef = collection(db, "visits");
      const q = query(visitsRef, where("userId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      
      let visitCounts = {
        "Algorithms": 0,
        "Object-Oriented": 0,
        "Database": 0,
        "Machine Learning": 0,
      };
      
      snapshot.forEach((doc) => {
        const visit = doc.data();
        if (visit.subject in visitCounts) {
          visitCounts[visit.subject]++;
        }
      });
      
      setData(
        Object.entries(visitCounts).map(([name, value]) => ({ name, value }))
      );
    };
    
    fetchVisits();
  }, [auth.currentUser]);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MyVisit;
