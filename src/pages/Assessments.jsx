import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

const Assessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    description: "",
    type: "MCQs",
    difficulty: "Easy",
    category: "General",
    timeLimit: "No Limit",
    status: "Active",
  });

  // 🔹 Load Assessments from LocalStorage on Component Mount
  useEffect(() => {
    const storedAssessments = JSON.parse(localStorage.getItem("assessments")) || [];
    setAssessments(storedAssessments);
  }, []);

  // 🔹 Save Assessments to LocalStorage
  const saveToLocalStorage = (data) => {
    localStorage.setItem("assessments", JSON.stringify(data));
  };

  // 🔹 Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssessment({ ...newAssessment, [name]: value });
  };

  // 🔹 Create Assessment
  const handleCreateAssessment = () => {
    const updatedAssessments = [...assessments, { id: Date.now(), ...newAssessment }];
    setAssessments(updatedAssessments);
    saveToLocalStorage(updatedAssessments);
    setShowCreateModal(false);
    setNewAssessment({
      title: "", description: "", type: "MCQs", difficulty: "Easy",
      category: "General", timeLimit: "No Limit", status: "Active"
    });
  };

  // 🔹 Delete Assessment
  const handleDeleteAssessment = (id) => {
    const updatedAssessments = assessments.filter((assessment) => assessment.id !== id);
    setAssessments(updatedAssessments);
    saveToLocalStorage(updatedAssessments);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">📝 Assessments Management</h2>

      {/* Add New Assessment Button */}
      <button onClick={() => setShowCreateModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center mb-4 hover:bg-blue-600">
        <FaPlus className="mr-2" /> Add Assessment
      </button>

      {/* Assessments Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Difficulty</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Time Limit</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assessments.length > 0 ? (
              assessments.map((assessment, index) => (
                <tr key={assessment.id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{assessment.title}</td>
                  <td className="p-2">{assessment.type}</td>
                  <td className="p-2">{assessment.difficulty}</td>
                  <td className="p-2">{assessment.category}</td>
                  <td className="p-2">{assessment.timeLimit}</td>
                  <td className={`p-2 font-semibold ${assessment.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {assessment.status}
                  </td>
                  <td className="p-2 flex space-x-3">
                    <button className="text-blue-600 cursor-pointer">
                      <FaEye />
                    </button>
                    <button className="text-yellow-600 cursor-pointer">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 cursor-pointer" onClick={() => handleDeleteAssessment(assessment.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No assessments created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h3 className="text-xl font-semibold mb-4">Create New Assessment</h3>
            <input
              type="text"
              name="title"
              placeholder="Assessment Title"
              className="w-full p-2 mb-3 border rounded-md"
              value={newAssessment.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-2 mb-3 border rounded-md"
              value={newAssessment.description}
              onChange={handleInputChange}
            ></textarea>
            <select name="type" className="w-full p-2 mb-3 border rounded-md" value={newAssessment.type} onChange={handleInputChange}>
              <option>MCQs</option>
              <option>Descriptive</option>
              <option>File Upload</option>
              <option>Programming</option>
            </select>
            <select name="difficulty" className="w-full p-2 mb-3 border rounded-md" value={newAssessment.difficulty} onChange={handleInputChange}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <select name="category" className="w-full p-2 mb-3 border rounded-md" value={newAssessment.category} onChange={handleInputChange}>
              <option>Math</option>
              <option>Science</option>
              <option>Programming</option>
              <option>General</option>
            </select>
            <select name="timeLimit" className="w-full p-2 mb-3 border rounded-md" value={newAssessment.timeLimit} onChange={handleInputChange}>
              <option>No Limit</option>
              <option>10 mins</option>
              <option>30 mins</option>
              <option>1 hour</option>
            </select>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
              <button onClick={handleCreateAssessment} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessments;
