import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Chat from "./Chat";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
