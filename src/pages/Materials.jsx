import { useState, useEffect } from "react";
import { FaFileUpload, FaTrash, FaDownload, FaSearch, FaEye } from "react-icons/fa";
import { useDropzone } from "react-dropzone"; 

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedMaterials = JSON.parse(localStorage.getItem("materials")) || [];
    setMaterials(savedMaterials);
  }, []);

  useEffect(() => {
    localStorage.setItem("materials", JSON.stringify(materials));
  }, [materials]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newMaterials = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      date: new Date().toLocaleDateString(),
      url: URL.createObjectURL(file) // Create a temporary URL for download
    }));
    setMaterials([...materials, ...newMaterials]);
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter((material) => material.id !== id));
  };

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">📂 Materials Management</h2>
      <div className="flex items-center space-x-4 mb-6">
        <label className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">
          <FaFileUpload className="mr-2" /> Upload Files
          <input type="file" className="hidden" multiple onChange={handleFileUpload} />
        </label>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search materials..."
            className="w-full p-2 pl-10 border rounded-md outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">File Name</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.map((material) => (
              <tr key={material.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{material.name}</td>
                <td className="p-2">{material.type}</td>
                <td className="p-2">{material.date}</td>
                <td className="p-2 flex space-x-3">
                  
                  <a href={material.url} download={material.name} className="text-green-600 cursor-pointer">
                    <FaDownload />
                  </a>
                  <button className="text-red-600 cursor-pointer" onClick={() => handleDelete(material.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Materials;
