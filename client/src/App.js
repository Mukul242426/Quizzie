import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
