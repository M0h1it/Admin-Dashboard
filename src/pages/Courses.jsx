import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const initialCourses = [
  { id: "1", title: "English Lecture", category: "Languages", start: "2025-07-20", progress: 60 },
  { id: "2", title: "Design Strategy", category: "UI/UX Design", start: "2025-07-22", progress: 40 },
  { id: "3", title: "Business Lecture", category: "Marketing | Finance", start: "2025-07-26", progress: 70 },
];

const categories = ["Languages", "UI/UX Design", "Marketing | Finance", "Web Development", "Mobile Development"];

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [newCourse, setNewCourse] = useState({ title: "", category: "Languages", start: "", progress: 0 });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.start) {
      setCourses([...courses, { ...newCourse, id: Date.now().toString() }]);
      setNewCourse({ title: "", category: "Languages", start: "", progress: 0 });
    }
  };

  const handleEditCourse = (id) => {
    const updatedCourses = courses.map((course) =>
      course.id === id ? { ...course, title: newCourse.title, category: newCourse.category, start: newCourse.start, progress: newCourse.progress } : course
    );
    setCourses(updatedCourses);
    setEditId(null);
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100 p-6">
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Courses</h1>
          <div className="flex items-center space-x-3 border-b border-gray-400 pb-1">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search courses..."
              className="outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Course List Without Drag and Drop */}
        <div className="space-y-4">
          {courses
            .filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((course) => (
              <div key={course.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">{course.title}</h2>
                  <p className="text-gray-500">{course.category}</p>
                  <p className="text-gray-600">Start: {course.start}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="text-red-500 cursor-pointer" onClick={() => handleDeleteCourse(course.id)}><FaTrash /></button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Courses Section */}
      <div className="w-80 bg-white p-5 ml-6 shadow-md rounded-lg">
        <h2 className="text-lg font-bold mb-4">Add Course</h2>
        <input
          type="text"
          placeholder="Course Title"
          className="border p-2 w-full mb-3 rounded-md "
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
        />
        <select
          className="border p-2 w-full mb-3 rounded-md cursor-pointer"
          value={newCourse.category}
          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="date"
          className="border p-2 w-full mb-3 rounded-md cursor-pointer"
          value={newCourse.start}
          onChange={(e) => setNewCourse({ ...newCourse, start: e.target.value })}
        />
        <button className="bg-blue-500 text-white w-full p-2 rounded-md cursor-pointer" onClick={handleAddCourse}>
          <FaPlus className="inline mr-2" /> Add Course
        </button>
      </div>
    </div>
  );
};

export default Courses;