import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import Goals from "./pages/Goals";
import Mood from "./pages/Mood";
import AIAssistant from "./pages/AIAssistant";
import StudyPlanner from "./pages/StudyPlanner";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100">
        <Navbar />

        <div className="flex">
          <Sidebar />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/study-planner" element={<StudyPlanner />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}