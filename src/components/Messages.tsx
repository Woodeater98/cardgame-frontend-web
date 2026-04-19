import React, { useEffect, useState } from "react";
import type { Message } from "../types/messages";
import { getMessages } from "../services/messageService";
import { io, Socket } from "socket.io-client";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>("Guest");

  // Create socket once
  const [socket] = useState<Socket>(() =>
    io("http://localhost:3000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    })
  );

  // Decode username from JWT (client-side display only)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.username ?? "Guest");
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  // Fetch + socket listeners
  useEffect(() => {
    fetchMessages();

    socket.on("message:new", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("message:deleted", (id: number) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    });

    return () => {
      socket.off("message:new");
      socket.off("message:deleted");
      socket.disconnect();
    };
  }, [socket]);

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

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    socket.emit("message:create", {
      text: newMessage,
      guestUsername: username,
    });

    setNewMessage("");
  };

  const handleDelete = (id: number) => {
    socket.emit("message:delete", { id });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow relative z-10 bg-white dark:bg-gray-900">
      
      {/* HEADER */}
<div className="mb-4">
  {/* Username ABOVE */}
  <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">
    Logged in as:{" "}
    <span className="font-semibold">{username}</span>
  </div>

  {/* Title BELOW */}
  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
    Messages
  </h1>
</div>

      {/* MESSAGE LIST */}
      {loading ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : (
        <ul className="mb-4 max-h-96 overflow-y-auto">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="border-b py-2 text-gray-700 dark:text-gray-200"
            >
              <span className="font-semibold">
                {msg.username}
              </span>
              : {msg.text}

              <button
                onClick={() => handleDelete(msg.id)}
                className="ml-3 bg-purple-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-purple-700"
              >
                DEL
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* INPUT */}
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