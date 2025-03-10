import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const LinkedTeachers = () => {
  const [month, setMonth] = useState("December");

  // Static teacher data
  const teachers = [
    { name: "John Doe", subject: "Mathematics", profilePic: "https://via.placeholder.com/40" },
    { name: "Emily Smith", subject: "Physics", profilePic: "https://via.placeholder.com/40" },
    { name: "Michael Brown", subject: "Chemistry", profilePic: "https://via.placeholder.com/40" },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Linked Teachers</h2>

        {/* Month Dropdown */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-1 text-sm border rounded-md cursor-pointer transition-all duration-200"
        >
          <option value="December">December</option>
          <option value="November">November</option>
          <option value="October">October</option>
        </select>
      </div>

      {/* Teachers List */}
      <div className="space-y-3">
        {teachers.map((teacher, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm">
            {/* Left Side - Profile and Name */}
            <div className="flex items-center">
              <img src={teacher.profilePic} alt={teacher.name} className="w-12 h-12 rounded-full mr-4 border" />
              <div>
                <h3 className="text-md font-semibold">{teacher.name}</h3>
                <p className="text-sm text-gray-600">{teacher.subject}</p>
              </div>
            </div>

            {/* Right Side - Icons */}
            <div className="flex items-center space-x-3">
              <IoChatbubbleEllipsesSharp className="text-gray-600 text-xl cursor-pointer" />
              <FaPhoneAlt className="text-gray-600 text-lg cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      {/* "See All" Button */}
      <div className="text-right mt-4">
        <button className="text-blue-500 text-sm font-medium underline cursor-pointer">
          See All
        </button>
      </div>
    </div>
  );
};

export default LinkedTeachers;
