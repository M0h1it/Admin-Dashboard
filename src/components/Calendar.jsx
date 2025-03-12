import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!auth.currentUser) return;

      const formattedDate = selectedDate.toISOString().split("T")[0];
      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, where("userId", "==", auth.currentUser.uid), where("date", "==", formattedDate));
      const snapshot = await getDocs(q);

      let fetchedTasks = [];
      snapshot.forEach((doc) => {
        fetchedTasks.push(doc.data());
      });

      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, [auth.currentUser, selectedDate]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <FaChevronLeft onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))} className="cursor-pointer text-gray-600 text-xl" />

        <div className="relative flex items-center">
          <span className="font-semibold">{selectedDate.toDateString()}</span>
          <FaCalendarAlt className="ml-2 text-gray-600 cursor-pointer" onClick={() => setShowDatePicker(!showDatePicker)} />
          {showDatePicker && (
            <div className="absolute top-8 left-0 bg-white shadow-lg p-2 rounded">
              <DatePicker selected={selectedDate} onChange={(date) => { setSelectedDate(date); setShowDatePicker(false); }} inline />
            </div>
          )}
        </div>

        <FaChevronRight onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))} className="cursor-pointer text-gray-600 text-xl" />
      </div>

      <h3 className="text-lg font-medium">Tasks for {selectedDate.toDateString()}</h3>
      <ul className="mt-2 space-y-2">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded-lg flex justify-between">
              <span className="text-gray-700">{task.title}</span>
              <span className="text-gray-500">{task.time}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks for this date.</p>
        )}
      </ul>
    </div>
  );
};

export default Calendar;
