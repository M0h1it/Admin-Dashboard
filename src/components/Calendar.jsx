import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!auth.currentUser) return;
      
      const eventsRef = collection(db, "calendarEvents");
      const q = query(eventsRef, where("userId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      
      let eventsList = [];
      snapshot.forEach((doc) => {
        eventsList.push(doc.data());
      });
      
      setEvents(eventsList);
    };
    
    fetchEvents();
  }, [auth.currentUser]);

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-3">Calendar</h2>
      <ul>
        {events.length > 0 ? (
          events.map((event, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{event.title}</strong> - {event.time}
            </li>
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </ul>
    </div>
  );
};

export default Calendar;
