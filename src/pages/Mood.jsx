import { useEffect, useState } from "react";

export default function Mood() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const [moodHistory, setMoodHistory] = useState(() => {
    const saved = localStorage.getItem("moodHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
  }, [moodHistory]);

  const addMood = () => {
    if (mood === "") return;

    const newMood = {
      id: Date.now(),
      mood,
      note,
      date: new Date().toLocaleDateString(),
    };

    setMoodHistory([newMood, ...moodHistory]);
    setMood("");
    setNote("");
  };

  const deleteMood = (id) => {
    setMoodHistory(moodHistory.filter((item) => item.id !== id));
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