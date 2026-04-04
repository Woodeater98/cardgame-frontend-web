// src/components/Messages.tsx
import React, { useEffect, useState } from "react";
import type { Message } from "../types/messages";
import { getMessages} from "../services/messageService";
import { io, Socket } from "socket.io-client";
const socket: Socket = io("http://localhost:3000");

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();


    // Listen for new messages
    socket.on("message:new", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Listen for deleted messages
    socket.on("message:deleted", (id: number) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    });

    // Cleanup on unmount
    return () => {
      socket.off("message:new");
      socket.off("message:deleted");
    };
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const msgs = await getMessages();
      setMessages(msgs);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

   const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!newMessage) return;
    const account = JSON.parse(localStorage.getItem("account") || "null");
    socket.emit("message:create", { text: newMessage, accountId: account?.id });
    setNewMessage(""); // UI will update via socket
  };

  const handleDelete = async (id: number) =>{
    socket.emit("message:delete", { id });
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow relative z-10 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Messages</h1>

      {loading ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : (
        <ul className="mb-4 max-h-96 overflow-y-auto">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="border-b py-2 text-gray-700 dark:text-gray-200"
            >
              {msg.account?.displayName ?? "Guest"}: {msg.text}
              <button onClick={() => handleDelete(msg.id)} className="bg-purple-600 text-white px-4 rounded cursor-pointer hover:bg-purple-700">
                DEL
                </button>
            </li>
            
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="New message"
          className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 rounded cursor-pointer hover:bg-purple-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Messages;