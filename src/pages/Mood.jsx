import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export default function Mood() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const [moodHistory, setMoodHistory] = useState([]);

useEffect(() => {
  const fetchMoods = async () => {
    const q = query(
      collection(db, "moods"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);

    const moodList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMoodHistory(moodList);
  };

  fetchMoods();
}, []);

  const addMood = async () => {
  if (mood === "") return;

  const newMood = {
    mood,
    note,
    date: new Date().toLocaleDateString(),
    userId: auth.currentUser.uid,
    createdAt: new Date(),
  };

  const docRef = await addDoc(collection(db, "moods"), newMood);

  setMoodHistory([
    {
      id: docRef.id,
      ...newMood,
    },
    ...moodHistory,
  ]);

  setMood("");
  setNote("");
};

  const deleteMood = async (id) => {
  await deleteDoc(doc(db, "moods", id));

  setMoodHistory(
    moodHistory.filter((item) => item.id !== id)
  );
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">😊 Mood Tracker</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
        <label className="block font-semibold mb-2">How are you feeling today?</label>

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option value="">Select Mood</option>
          <option value="😊 Happy">😊 Happy</option>
          <option value="😐 Okay">😐 Okay</option>
          <option value="😔 Sad">😔 Sad</option>
          <option value="😰 Stressed">😰 Stressed</option>
          <option value="😴 Tired">😴 Tired</option>
        </select>

        <textarea
          placeholder="Write a short note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
          rows="4"
        ></textarea>

        <button
          onClick={addMood}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Save Mood
        </button>
      </div>

      <div className="mt-6 max-w-xl">
        {moodHistory.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow mb-3">
            <div className="flex justify-between items-center">
              <h2 className="font-bold">{item.mood}</h2>

              <button
                onClick={() => deleteMood(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-1">{item.date}</p>
            <p className="mt-2">{item.note || "No note added"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}