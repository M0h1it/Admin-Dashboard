import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaPlus } from "react-icons/fa";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig"; // Import Firebase Auth

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const messagesEndRef = useRef(null);

  // 🔹 Get current logged-in user
  const currentUser = auth.currentUser ? auth.currentUser.displayName || "Anonymous" : "Guest";

  const messagesRef = collection(db, "messages");

  // 🔹 Fetch messages from Firestore in real-time
  useEffect(() => {
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Send a message with sender name
  const sendMessage = async () => {
    if (newMessage.trim() === "" && !image) return;

    const messageData = {
      text: newMessage,
      sender: currentUser, // Store actual user name
      timestamp: serverTimestamp(),
    };

    if (image) {
      messageData.image = image;
    }

    await addDoc(messagesRef, messageData);
    setNewMessage("");
    setImage(null);
  };

  // 🔹 Handle Image Upload
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

  // 🔹 Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen p-4">
      <h3 className="text-lg font-semibold">Chat</h3>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md shadow-md">
        {messages.map((msg) => {
          const isCurrentUser = msg.sender === currentUser;
          return (
            <div
              key={msg.id}
              className={`mb-3 p-2 max-w-xs break-words rounded-lg 
                ${isCurrentUser ? "bg-green-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"}
              `}
            >
              <span className="block text-xs text-gray-700">
                {msg.sender} -{" "}
                {msg.timestamp?.seconds
                  ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "Now"}
              </span>
              {msg.image && <img src={msg.image} alt="sent" className="mt-1 max-w-full rounded" />}
              {msg.text && <p>{msg.text}</p>}
            </div>
          );
        })}
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
