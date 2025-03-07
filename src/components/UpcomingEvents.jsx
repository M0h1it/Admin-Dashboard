import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!auth.currentUser) return;
      
      const eventsRef = collection(db, "upcomingEvents");
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
      <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
      <ul className="space-y-3">
        {events.length > 0 ? (
          events.map((event, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date} - {event.time}</p>
            </li>
          ))
        ) : (
          <p>No upcoming events found.</p>
        )}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
