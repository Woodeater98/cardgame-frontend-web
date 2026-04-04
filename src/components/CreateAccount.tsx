// src/components/CreateAccount.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../services/accountService";

const CreateAccount: React.FC = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    setLoading(true);
    try {
      const account = await createAccount(name);

      // store account locally
      localStorage.setItem("account", JSON.stringify(account));

      // redirect to messages page
      navigate("/messages");
    } catch (err) {
      console.error("Failed to create account:", err);
      alert("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Enter display name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mb-4 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;