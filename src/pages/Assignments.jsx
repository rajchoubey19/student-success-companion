import { useEffect, useState } from "react";

export default function Assignments() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("assignments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const addAssignment = () => {
    if (title.trim() === "") return;

    const newAssignment = {
      id: Date.now(),
      title,
      dueDate,
      completed: false,
    };

    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setDueDate("");
  };

  const toggleComplete = (id) => {
    setAssignments(
      assignments.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((item) => item.id !== id));
  };

  const getStatus = (item) => {
    if (!item.dueDate) {
      return {
        color: "text-gray-500",
        text: "No due date",
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(item.dueDate);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        color: "text-red-600",
        text: "🔴 Overdue",
      };
    }

    if (diffDays === 0) {
      return {
        color: "text-red-600",
        text: "🔴 Due Today",
      };
    }

    if (diffDays === 1) {
      return {
        color: "text-yellow-600",
        text: "🟡 Due Tomorrow",
      };
    }

    return {
      color: "text-green-600",
      text: "🟢 Future",
    };
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Assignment Tracker</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
        <input
          type="text"
          placeholder="Enter Assignment Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={addAssignment}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Assignment
        </button>
      </div>

      <div className="mt-6 max-w-xl">
        {assignments.map((item) => {
          const status = getStatus(item);

          return (
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
                  📚 {item.title}
                </h2>

                <p className="text-sm text-gray-500">
                  Due Date: {item.dueDate || "Not set"}
                </p>

                <p className={`text-sm font-bold ${status.color}`}>
                  {status.text}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  {item.completed ? "Undo" : "Done"}
                </button>

                <button
                  onClick={() => deleteAssignment(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}