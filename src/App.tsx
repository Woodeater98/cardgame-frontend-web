import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Messages from "./components/Messages";
import CreateAccount from "./components/CreateAccount";

function App() {
  const account = localStorage.getItem("account");

  return (
    <Routes>
      {/* No account → force to "/" */}
      {!account && <Route path="*" element={<Navigate to="/" />} />}

      {/* Create account page */}
      <Route path="/" element={<CreateAccount />} />

      {/* Messages page */}
      <Route path="/messages" element={<Messages />} />
    </Routes>
  );
}

export default App;