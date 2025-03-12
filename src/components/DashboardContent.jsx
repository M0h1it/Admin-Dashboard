import React from "react";
import HelloMessage from "./HelloMessage";
import PerformanceChart from "./PerformanceChart";
import Calendar from "./Calendar";
import UpcomingEvents from "./UpcomingEvents";
import LinkedTeachers from "./LinkedTeachers";
import MyVisit from "./MyVisit";
import { FaChalkboardTeacher, FaCalendarAlt, FaUserGraduate } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

const DashboardContent = () => {
  return (
    <div className="p-6 grid grid-cols-8 gap-6">
      {/* Welcome Section */}
      <div className="col-span-4 row-span-3 bg-white rounded-2xl shadow-md p-4">
        <HelloMessage />
      </div>

      {/* Calendar */}
      <div className="col-span-3 row-span-4 bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center"><FaCalendarAlt className="mr-2" /> Calendar</h2>
        <Calendar />
      </div>

      {/* Performance Chart */}
      <div className="col-span-4 row-span-auto bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center"><FaUserGraduate className="mr-2" /> Performance</h2>
        <PerformanceChart />
      </div>

      {/* My Visit */}
      <div className="col-span-3 row-span-auto bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center"><FaChalkboardTeacher className="mr-2" /> My Visit</h2>
        <MyVisit />
      </div>

      {/* Linked Teachers */}
      <div className="col-span-3 row-span-auto bg-white-700 rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center"><FaChalkboardTeacher className="mr-2" /> Linked Teachers</h2>
        <LinkedTeachers />
      </div>
      
      {/* Upcoming Events */}
      <div className="col-span-3 row-span-auto bg-white-700 rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center"><MdEvent className="mr-2" /> Upcoming Events</h2>
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default DashboardContent;
