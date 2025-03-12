import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const LinkedTeachers = () => {
  const [month, setMonth] = useState("December");

  // Static teacher data
  const teachers = [
    { name: "John Doe", subject: "Mathematics" },
    { name: "Emily Smith", subject: "Physics" },
    { name: "Michael Brown", subject: "Chemistry" },
  ];

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        

        {/* Month Dropdown */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-1 text-sm border rounded-md cursor-pointer outline-none"
        >
          {["December", "November", "October"].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Teachers List */}
      <div className="space-y-3">
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
          >
            {/* Left Side - Initial Profile and Name */}
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold mr-4">
                {getInitials(teacher.name)}
              </div>
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
