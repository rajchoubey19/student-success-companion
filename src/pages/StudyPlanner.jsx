import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export default function StudyPlanner() {
  const [time, setTime] = useState("");
  const [task, setTask] = useState("");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const q = query(
        collection(db, "studyPlans"),
        where("userId", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);

      const planList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPlans(planList);
    };

    fetchPlans();
  }, []);

  const addPlan = async () => {
    if (time.trim() === "" || task.trim() === "") return;

    const newPlan = {
      time,
      task,
      completed: false,
      userId: auth.currentUser.uid,
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "studyPlans"), newPlan);

    setPlans([
      ...plans,
      {
        id: docRef.id,
        ...newPlan,
      },
    ]);

    setTime("");
    setTask("");
  };

  const toggleComplete = async (id, currentStatus) => {
    await updateDoc(doc(db, "studyPlans", id), {
      completed: !currentStatus,
    });

    setPlans(
      plans.map((item) =>
        item.id === id
          ? { ...item, completed: !currentStatus }
          : item
      )
    );
  };

  const deletePlan = async (id) => {
    await deleteDoc(doc(db, "studyPlans", id));
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
                onClick={() => toggleComplete(item.id, item.completed)}
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