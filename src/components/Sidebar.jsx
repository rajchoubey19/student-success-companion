import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuClass = (path) =>
    `p-3 rounded-xl transition-all duration-300 ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <div className="w-64 min-h-screen bg-slate-900 p-4">

      <h2 className="text-2xl font-bold text-white mb-8">
        🎓 SSC
      </h2>

      <div className="flex flex-col gap-3">

        <Link to="/" className={menuClass("/")}>
          📊 Dashboard
        </Link>

        <Link to="/attendance" className={menuClass("/attendance")}>
          📈 Attendance
        </Link>

        <Link to="/assignments" className={menuClass("/assignments")}>
          📚 Assignments
        </Link>

        <Link to="/goals" className={menuClass("/goals")}>
          🎯 Goals
        </Link>

        <Link to="/mood" className={menuClass("/mood")}>
          😊 Mood
        </Link>

        <Link to="/ai-assistant" className={menuClass("/ai-assistant")}>
          🤖 AI Assistant
        </Link>

        <Link to="/study-planner" className={menuClass("/study-planner")}>
  📅 Study Planner
</Link>

      </div>
    </div>
  );
}