import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Goals() {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const querySnapshot = await getDocs(collection(db, "goals"));

      const goalList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGoals(goalList);
    };

    fetchGoals();
  }, []);

  const completedGoals = goals.filter((goal) => goal.completed).length;

  const progress =
    goals.length > 0
      ? ((completedGoals / goals.length) * 100).toFixed(0)
      : 0;

  const addGoal = async () => {
    if (goal.trim() === "") return;

    const docRef = await addDoc(collection(db, "goals"), {
      text: goal,
      completed: false,
      createdAt: new Date(),
    });

    setGoals([
      ...goals,
      {
        id: docRef.id,
        text: goal,
        completed: false,
      },
    ]);

    setGoal("");
  };

  const toggleGoal = async (id, currentStatus) => {
  await updateDoc(doc(db, "goals", id), {
    completed: !currentStatus,
  });

  setGoals(
    goals.map((item) =>
      item.id === id
        ? { ...item, completed: !currentStatus }
        : item
    )
  );
};

  const deleteGoal = async (id) => {
    await deleteDoc(doc(db, "goals", id));
    setGoals(goals.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🎯 Daily Goals</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 max-w-xl">
        <h2 className="text-xl font-bold mb-2">Goals Progress</h2>

        <p className="mb-3">
          {completedGoals} / {goals.length} Completed
        </p>

        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-purple-600 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="mt-2 font-semibold">{progress}% Complete</p>
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
                onClick={() => toggleGoal(item.id, item.completed)}
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