import { useEffect, useState } from "react";

export default function StudyPlanner() {
  const [time, setTime] = useState("");
  const [task, setTask] = useState("");

  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem("studyPlans");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("studyPlans", JSON.stringify(plans));
  }, [plans]);

  const addPlan = () => {
    if (time.trim() === "" || task.trim() === "") return;

    setPlans([
      ...plans,
      {
        id: Date.now(),
        time,
        task,
        completed: false,
      },
    ]);

    setTime("");
    setTask("");
  };

  const toggleComplete = (id) => {
    setPlans(
      plans.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deletePlan = (id) => {
    setPlans(plans.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📅 Study Planner</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Enter study task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={addPlan}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Add Plan
        </button>
      </div>

      <div className="mt-6 max-w-xl">
        {plans.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow mb-3 flex justify-between items-center"
          >
            <div>
              <h2
                className={`font-bold ${
                  item.completed ? "line-through text-gray-400" : ""
                }`}
              >
                🕒 {item.time} - {item.task}
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(item.id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                {item.completed ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => deletePlan(item.id)}
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