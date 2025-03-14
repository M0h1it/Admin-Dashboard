import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaPlus } from "react-icons/fa";
import { db, storage, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? { uid: user.uid, name: user.displayName || "Anonymous" } : null);
    });
    return () => unsubscribe();
  }, []);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!currentUser) return alert("Sign in to send messages.");
    if (!newMessage.trim() && !image) return;

    let imageUrl = null;
    if (image) {
      const imageRef = ref(storage, `chatImages/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(messagesRef, {
      text: newMessage,
      sender: currentUser.name,
      userId: currentUser.uid,
      timestamp: serverTimestamp(),
      image: imageUrl,
    });

    setNewMessage("");
    setImage(null);
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
            className={`mb-3 p-2 max-w-xs break-words rounded-lg ${
              currentUser && msg.userId === currentUser.uid ? "bg-green-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"
            }`}
          >
            <span className="block text-xs text-gray-700">
              {msg.sender} - {msg.timestamp?.seconds ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Now"}
            </span>
            {msg.image && <img src={msg.image} alt="sent" className="mt-1 max-w-full rounded" />}
            {msg.text && <p>{msg.text}</p>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center mt-2 border rounded-md p-2 bg-white">
        <label className="cursor-pointer">
          <FaPlus className="text-blue-600 mr-2" />
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="hidden" />
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