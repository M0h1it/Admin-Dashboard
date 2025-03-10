import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const LinkedTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchTeachers = async () => {
      if (!auth.currentUser) return;
      
      const teachersRef = collection(db, "linkedTeachers");
      const q = query(teachersRef, where("userId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      
      let teachersList = [];
      snapshot.forEach((doc) => {
        teachersList.push(doc.data());
      });
      
      setTeachers(teachersList);
    };
    
    fetchTeachers();
  }, [auth.currentUser]);

  return (
    <div className="">
      {teachers.length > 0 ? (
        teachers.map((teacher, index) => (
          <div key={index} className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm">
            <img src={teacher.profilePic} alt={teacher.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h3 className="text-md font-semibold">{teacher.name}</h3>
              <p className="text-sm text-gray-600">{teacher.subject}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No linked teachers found.</p>
      )}
      {/* All Lessons Button */}
      <div className="text-right mt-2">
        <button className="text-blue-500 text-sm font-medium cursor-pointer bg-white underline rounded-md px-2 py-1">
        See All
      </button>
  </div>
    </div>
  );
};

export default LinkedTeachers;
