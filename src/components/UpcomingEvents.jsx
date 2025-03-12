import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import moment from "moment";

// Indian Public Holidays
const indianHolidays = [
  { title: "Republic Day", date: "2025-01-26" },
  { title: "Holi", date: "2025-03-17" },
  { title: "Good Friday", date: "2025-04-18" },
  { title: "Independence Day", date: "2025-08-15" },
  { title: "Gandhi Jayanti", date: "2025-10-02" },
  { title: "Diwali", date: "2025-10-29" },
  { title: "Christmas", date: "2025-12-25" },
];

const UpcomingEvents = ({ calendarEvents = [] }) => {
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false); // Toggle to show all events
  const auth = getAuth();
  const db = getFirestore();
  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    const fetchEvents = async () => {
      if (!auth.currentUser) return;

      const eventsRef = collection(db, "upcomingEvents");
      const q = query(eventsRef, where("userId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);

      let eventsList = [];
      snapshot.forEach((doc) => {
        const eventData = doc.data();
        if (moment(eventData.date).isAfter(today)) {
          eventsList.push(eventData);
        }
      });

      // Ensure calendarEvents is defined before using .filter()
      const allEvents = [
        ...eventsList,
        ...((calendarEvents || []).filter((event) => moment(event.date).isAfter(today))), // Safe filtering
        ...indianHolidays.filter((holiday) => moment(holiday.date).isAfter(today)), // Future Indian holidays
      ];

      // Sort events by date
      allEvents.sort((a, b) => moment(a.date) - moment(b.date));

      setEvents(allEvents);
    };

    fetchEvents();
  }, [auth.currentUser, calendarEvents]);

  return (
    <div className="">

      <ul className="space-y-3">
        {events.length > 0 ? (
          (showAll ? events : events.slice(0, 3)).map((event, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{moment(event.date).format("MMMM D, YYYY")}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-600">No upcoming events found.</p>
        )}
      </ul>

      {/* "See All" Button */}
      {events.length > 3 && (
        <div className="text-right mt-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 text-sm font-medium cursor-pointer bg-white underline rounded-md px-2 py-1"
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
