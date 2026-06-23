import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function Attendance() {
  const [totalClasses, setTotalClasses] = useState("");
  const [attendedClasses, setAttendedClasses] = useState("");

  const percentage =
    totalClasses > 0
      ? ((attendedClasses / totalClasses) * 100).toFixed(1)
      : 0;

      const total = Number(totalClasses);
const attended = Number(attendedClasses);

let classesNeeded = 0;
if (total > 0 && percentage < 75) {
  classesNeeded = Math.ceil((0.75 * total - attended) / 0.25);
}

let bunkableClasses = 0;
if (total > 0 && percentage >= 75) {
  bunkableClasses = Math.floor((attended / 0.75) - total);
}

  const [attendanceDocId, setAttendanceDocId] = useState(null);

useEffect(() => {
  const fetchAttendance = async () => {
    const q = query(
      collection(db, "attendance"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      setAttendanceDocId(querySnapshot.docs[0].id);
      setTotalClasses(docData.totalClasses);
      setAttendedClasses(docData.attendedClasses);
    }
  };

  fetchAttendance();
}, []);

   const saveAttendance = async () => {
  const attendanceData = {
    totalClasses,
    attendedClasses,
    percentage,
    userId: auth.currentUser.uid,
    updatedAt: new Date(),
  };

  if (attendanceDocId) {
    await updateDoc(doc(db, "attendance", attendanceDocId), attendanceData);
  } else {
    const docRef = await addDoc(
      collection(db, "attendance"),
      attendanceData
    );

    setAttendanceDocId(docRef.id);
  }

  alert("Attendance saved successfully");
};
   
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📈 Attendance Tracker</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
        <label className="block mb-2 font-semibold">Total Classes</label>
        <input
          type="number"
          value={totalClasses}
          onChange={(e) => setTotalClasses(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Enter total classes"
        />

        <label className="block mb-2 font-semibold">Attended Classes</label>
        <input
          type="number"
          value={attendedClasses}
          onChange={(e) => setAttendedClasses(e.target.value)}
          className="w-full border p-3 rounded-lg"
          placeholder="Enter attended classes"
        />

        <h2 className="text-2xl font-bold text-green-600 mt-6">
          Attendance: {percentage}%
        </h2>

        <button
  onClick={saveAttendance}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
>
  Save Attendance
</button>

        {totalClasses > 0 && (
          <div className="mt-4">
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  percentage >= 75 ? "bg-green-500" : "bg-red-500"
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {totalClasses > 0 && (
          <div className="mt-4 bg-slate-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Attendance Analysis</h3>

            {percentage >= 75 ? (
  <p className="text-green-600 font-semibold">
    ✅ Attendance is safe. You can bunk {bunkableClasses} more classes safely.
  </p>
) : (
  <p className="text-red-600 font-semibold">
    ⚠️ You need to attend {classesNeeded} more classes to reach 75%.
  </p>
)}
          </div>
        )}
      </div>
    </div>
  );
}