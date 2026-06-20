import { useEffect, useState } from "react";

export default function Goals() {
  const [goal, setGoal] = useState("");

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const completedGoals = goals.filter(
  (goal) => goal.completed
).length;

const progress =
  goals.length > 0
    ? ((completedGoals / goals.length) * 100).toFixed(0)
    : 0;

  const addGoal = () => {
    if (goal.trim() === "") return;

    setGoals([
      ...goals,
      {
        id: Date.now(),
        text: goal,
        completed: false,
      },
    ]);

    setGoal("");
  };

  const toggleGoal = (id) => {
    setGoals(
      goals.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🎯 Daily Goals</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 max-w-xl">
  <h2 className="text-xl font-bold mb-2">
    Goals Progress
  </h2>

  <p className="mb-3">
    {completedGoals} / {goals.length} Completed
  </p>

  <div className="w-full bg-gray-300 rounded-full h-4">
    <div
      className="bg-purple-600 h-4 rounded-full"
      style={{ width: `${progress}%` }}
    ></div>
  </div>

  <p className="mt-2 font-semibold">
    {progress}% Complete
  </p>
</div>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
        <input
          type="text"
          placeholder="Enter today's goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={addGoal}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Add Goal
        </button>
      </div>

      <div className="mt-6 max-w-xl">
        {goals.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow mb-3 flex justify-between items-center"
          >
            <h2
              className={`font-bold ${
                item.completed ? "line-through text-gray-400" : ""
              }`}
            >
              🎯 {item.text}
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => toggleGoal(item.id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                {item.completed ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => deleteGoal(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}