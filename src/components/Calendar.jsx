import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Icons
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!auth.currentUser) return;

      const eventsRef = collection(db, "calendarEvents");
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const q = query(eventsRef, where("userId", "==", auth.currentUser.uid), where("date", "==", formattedDate));
      const snapshot = await getDocs(q);

      let eventsList = [];
      snapshot.forEach((doc) => {
        eventsList.push(doc.data());
      });

      setEvents(eventsList);
    };

    fetchEvents();
  }, [auth.currentUser, selectedDate]);

  const handlePrevDay = () => {
    setSelectedDate((prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setSelectedDate((prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1)));
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <FaChevronLeft onClick={handlePrevDay} className="cursor-pointer text-gray-600 text-xl" />

        <div className="relative flex items-center">
          <span className="font-semibold">{selectedDate.toDateString()}</span>
          <FaCalendarAlt
            className="ml-2 text-gray-600 cursor-pointer"
            onClick={() => setShowDatePicker(!showDatePicker)}
          />
          {showDatePicker && (
            <div className="absolute top-8 left-0 bg-white shadow-lg p-2 rounded">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setShowDatePicker(false);
                }}
                inline
              />
            </div>
          )}
        </div>

        <FaChevronRight onClick={handleNextDay} className="cursor-pointer text-gray-600 text-xl" />
      </div>

      <ul>
        {events.length > 0 ? (
          events.map((event, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{event.title}</strong> - {event.time}
            </li>
          ))
        ) : (
          <p>No events for this date.</p>
        )}
      </ul>
    </div>
  );
};

export default Calendar;
