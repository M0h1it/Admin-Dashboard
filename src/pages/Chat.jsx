import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaPlus } from "react-icons/fa";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim() === "" && !image) return;
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      image: image,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen p-4">
      <h3 className="text-lg font-semibold">Chat</h3>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md shadow-md">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`mb-3 p-2 max-w-xs break-words rounded-lg ${msg.sender === "You" ? "bg-green-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"}`}>
            <span className="block text-xs text-gray-700">{msg.sender} - {msg.time}</span>
            {msg.image && <img src={msg.image} alt="sent" className="mt-1 max-w-full rounded" />}
            {msg.text && <p>{msg.text}</p>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center mt-2 border rounded-md p-2 bg-white">
        <label className="cursor-pointer">
          <FaPlus className="text-blue-600 mr-2" />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 outline-none"
        />
        <button onClick={sendMessage} className="ml-2 text-blue-600">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
