import React from "react";

const DashboardContent = ({ selectedSection }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{selectedSection}</h2>
      
      {selectedSection === "Dashboard" && (
        <p>Welcome to your dashboard! Here, you can see an overview of your progress.</p>
      )}

      {selectedSection === "Lessons" && (
        <p>View and manage your lessons here.</p>
      )}

      {selectedSection === "Schedule" && (
        <p>Here is your schedule. Stay organized!</p>
      )}

      {selectedSection === "Materials" && (
        <p>Access your course materials and documents here.</p>
      )}

      {selectedSection === "Forum" && (
        <p>Join discussions with others in the forum.</p>
      )}

      {selectedSection === "Assessments" && (
        <p>Check your assignments and test results here.</p>
      )}

      {selectedSection === "Settings" && (
        <p>Adjust your preferences and account settings.</p>
      )}
    </div>
  );
};

export default DashboardContent;
