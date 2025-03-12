import { useState, useEffect } from "react";
import { FaBell, FaPlus } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Schedule = () => {
  const db = getFirestore();
  const auth = getAuth();
  const today = new Date().toISOString().split("T")[0];

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", time: "", date: today });
  const [notifications, setNotifications] = useState([]);

  // Fetch Tasks from Firebase
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const fetchedTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, [db]);

  // Function to Add Task to Firebase
  const addTask = async () => {
    if (!newTask.title || !newTask.time || !newTask.date) return;

    const taskData = {
      title: newTask.title,
      time: newTask.time,
      date: newTask.date,
      completed: false,
      userId: auth.currentUser?.uid || "guest",
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), taskData);
      setTasks([...tasks, { id: docRef.id, ...taskData }]); // Update local state
      setNotifications([...notifications, `New task added: ${taskData.title}`]);
      setNewTask({ title: "", time: "", date: today });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to Mark Task as Done
  const markTaskDone = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
      setNotifications([...notifications, "Task completed and removed"]);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 p-6 rounded-2xl shadow-lg">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
        <h3 className="mt-4 text-lg font-medium">Tasks ({tasks.length})</h3>
        <div className="mt-2 space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} markTaskDone={markTaskDone} />
          ))}
        </div>

        {/* Add New Task */}
        <div className="flex flex-col mt-4 space-y-2">
          <input
            type="text"
            placeholder="Task Name"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Time"
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            className="border p-2 rounded-md"
          />
          <button
            className="bg-purple-600 text-white p-2 rounded-md flex items-center justify-center space-x-2"
            onClick={addTask}
          >
            <FaPlus /> <span>Add Task</span>
          </button>
        </div>
      </div>
      
      {/* Notifications */}
      <div className="p-4 bg-white shadow-md rounded-xl self-start">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <FaBell className="text-yellow-500" /> <span>Notifications</span>
        </h3>
        <ul className="mt-2 text-sm text-gray-700">
          {notifications.map((notif, index) => (
            <li key={index} className="py-1">{notif}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TaskCard = ({ task, markTaskDone }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-xl flex justify-between items-center">
      <div>
        <span className="text-gray-700 font-medium">{task.title}</span>
        <span className="block text-gray-500 text-sm">{task.date} | {task.time}</span>
      </div>
      <input
        type="checkbox"
        className="ml-4"
        onChange={() => markTaskDone(task.id)}
      />
    </div>
  );
};

export default Schedule;