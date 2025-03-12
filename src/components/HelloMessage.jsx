import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const HelloMessage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const [remainingTasks, setRemainingTasks] = useState(0);

  useEffect(() => {
    const fetchRemainingTasks = async () => {
      if (!user) return;
      
      const tasksRef = collection(db, "tasks");
      const today = new Date().toISOString().split("T")[0];
      const q = query(tasksRef, where("userId", "==", user.uid), where("dueDate", "==", today), where("status", "!=", "completed"));
      const snapshot = await getDocs(q);
      
      setRemainingTasks(snapshot.size);
    };

    fetchRemainingTasks();
  }, [user]);

  return (
    <div className="">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        Hello, {user ? user.displayName : "User"}!
      </h2>
      <p className="text-sm md:text-base text-gray-600 mt-2">
        {remainingTasks > 0
          ? `You have ${remainingTasks} tasks left for today! Let's get started!`
          : "All tasks completed! Great job! 🎉"}
      </p>
    </div>
  );
};

export default HelloMessage;
