import { Routes, Route, Navigate } from "react-router";
import TodoPage from "./TodoPage";
import Login from "./Login";
import Register from "./Register";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/todo"
        element={token ? <TodoPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={token ? "/todo" : "/login"} />} />
    </Routes>
  );
}

export default App;

