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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Attendance />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/assignments"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Assignments />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/goals"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Goals />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/mood"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Mood />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai-assistant"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AIAssistant />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/study-planner"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <StudyPlanner />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}