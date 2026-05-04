import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Messages from "./components/Messages";
import ShowcasePage from "./components/ShowcasePage/ShowcasePage";
import "./styles/typography.css";
import "./styles/theme.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<AuthPage />} />

      {/* Protected route */}
      <Route
        path="/messages"
        element={
          token ? <Messages /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/showcase"
        element={
          <ShowcasePage></ShowcasePage>
        }
      />

      {/* Default redirect */}
      <Route
        path="*"
        element={<Navigate to={token ? "/messages" : "/"} replace />}
      />
    </Routes>
  );
}

export default App;