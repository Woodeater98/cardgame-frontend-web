import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);

  // 🔐 LOGIN
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        mode === "login"
          ? `${API_BASE}/auth/login`
          : `${API_BASE}/auth/register`;

      const res = await axios.post(url, {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access_token);

      navigate("/lobby");
    } catch (err) {
      console.error(err);
      alert("Auth failed");
    } finally {
      setLoading(false);
    }
  };

  // 👤 GUEST LOGIN
  const handleGuest = async () => {
    if (!username.trim()) {
      alert("Enter a guest name first");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/auth/guest`, {
        displayName: username,
      });
      console.log(username);
      localStorage.setItem("token", res.data.access_token);

      navigate("/lobby");
    } catch (err) {
      console.error(err);
      alert("Guest login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">

      <div className="w-80 p-6 bg-white dark:bg-gray-800 rounded shadow">

        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          {mode === "login" ? "Login" : "Register"}
        </h1>

        <form onSubmit={handleAuth} className="flex flex-col gap-3">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            {loading
              ? "Loading..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        {/* TOGGLE MODE */}
        <p className="text-sm text-center mt-3 text-gray-500">
          {mode === "login" ? "No account?" : "Already have an account?"}{" "}
          <button
            className="text-purple-600"
            onClick={() =>
              setMode(mode === "login" ? "register" : "login")
            }
          >
            Switch
          </button>
        </p>

        {/* GUEST SECTION */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-sm text-gray-500 mb-2 text-center">
            Or continue as guest
          </h2>

          <button
            onClick={handleGuest}
            disabled={loading}
            className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Continue as Guest
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;