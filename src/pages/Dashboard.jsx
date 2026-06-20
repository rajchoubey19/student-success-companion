import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  const moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
  const attendance = localStorage.getItem("attendancePercentage") || "0";
  const studyPlans = JSON.parse(localStorage.getItem("studyPlans")) || [];

  const hour = new Date().getHours();
  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const latestMood =
    moodHistory.length > 0 ? moodHistory[0].mood : "Not set";

  const completedGoals = goals.filter((goal) => goal.completed).length;
  const completedAssignments = assignments.filter((item) => item.completed).length;
  const pendingAssignments = assignments.filter((item) => !item.completed).length;
  const pendingPlans = studyPlans.filter((item) => !item.completed).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueSoonAssignments = assignments.filter((item) => {
    if (!item.dueDate || item.completed) return false;

    const due = new Date(item.dueDate);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 1;
  }).length;

  const overdueAssignments = assignments.filter((item) => {
    if (!item.dueDate || item.completed) return false;

    const due = new Date(item.dueDate);
    due.setHours(0, 0, 0, 0);

    return due < today;
  }).length;

  const remainingGoals = goals.filter((item) => !item.completed).length;

  const goalProgress =
    goals.length > 0
      ? ((completedGoals / goals.length) * 100).toFixed(0)
      : 0;

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-lg mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">
          👋 {greeting}, Raj
        </h1>

        <p className="mt-3 text-blue-100 text-sm md:text-lg">
          Stay focused, track your progress, and complete your daily goals.
        </p>
      </div>

      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
        <Link to="/attendance">
          <DashboardCard
            title="📈 Attendance"
            value={`${attendance}%`}
            color="text-green-600"
          />
        </Link>

        <Link to="/assignments">
          <DashboardCard
            title="📚 Pending Assignments"
            value={pendingAssignments}
            color="text-blue-600"
          />
        </Link>

        <Link to="/goals">
          <DashboardCard
            title="🎯 Goals Completed"
            value={`${completedGoals}/${goals.length}`}
            color="text-purple-600"
          />
        </Link>

        <Link to="/mood">
          <DashboardCard
            title="😊 Latest Mood"
            value={latestMood}
            color="text-orange-500"
          />
        </Link>

        <Link to="/study-planner">
          <DashboardCard
            title="📅 Study Plans"
            value={pendingPlans}
            color="text-indigo-600"
          />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">📊 Today's Summary</h3>

          <div className="space-y-3 text-gray-700">
            <p>📈 Attendance: <b>{attendance}%</b></p>
            <p>📚 Pending Assignments: <b>{pendingAssignments}</b></p>
            <p>🎯 Goals Completed: <b>{completedGoals}/{goals.length}</b></p>
            <p>😊 Current Mood: <b>{latestMood}</b></p>
            <p>📅 Pending Study Plans: <b>{pendingPlans}</b></p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">⚡ Quick Actions</h3>

          <div className="grid gap-3">
            <Link to="/attendance" className="bg-green-100 text-green-700 p-3 rounded-xl font-semibold hover:bg-green-200">
              Update Attendance
            </Link>

            <Link to="/assignments" className="bg-blue-100 text-blue-700 p-3 rounded-xl font-semibold hover:bg-blue-200">
              Add Assignment
            </Link>

            <Link to="/goals" className="bg-purple-100 text-purple-700 p-3 rounded-xl font-semibold hover:bg-purple-200">
              Add Daily Goal
            </Link>

            <Link to="/mood" className="bg-orange-100 text-orange-700 p-3 rounded-xl font-semibold hover:bg-orange-200">
              Track Mood
            </Link>

            <Link to="/ai-assistant" className="bg-cyan-100 text-cyan-700 p-3 rounded-xl font-semibold hover:bg-cyan-200">
              Open AI Assistant
            </Link>

            <Link to="/study-planner" className="bg-indigo-100 text-indigo-700 p-3 rounded-xl font-semibold hover:bg-indigo-200">
              Open Study Planner
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">🔔 Smart Reminders</h3>

          <div className="space-y-3">
            <p className="bg-red-100 text-red-700 p-3 rounded-xl font-semibold">
              🔴 Overdue Assignments: {overdueAssignments}
            </p>

            <p className="bg-yellow-100 text-yellow-700 p-3 rounded-xl font-semibold">
              🟡 Assignments Due Soon: {dueSoonAssignments}
            </p>

            <p className="bg-purple-100 text-purple-700 p-3 rounded-xl font-semibold">
              🎯 Remaining Goals: {remainingGoals}
            </p>

            <p className="bg-indigo-100 text-indigo-700 p-3 rounded-xl font-semibold">
              📅 Pending Study Plans: {pendingPlans}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">📊 Overall Progress</h3>

          <p className="mb-2">🎯 Goals Progress: {goalProgress}%</p>

          <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
            <div
              className="bg-purple-600 h-3 rounded-full"
              style={{ width: `${goalProgress}%` }}
            ></div>
          </div>

          <p className="mb-2">
            📚 Assignments Completed: {completedAssignments}/{assignments.length}
          </p>

          <p>📈 Attendance: {attendance}%</p>
        </div>
      </div>
    </div>
  );
}