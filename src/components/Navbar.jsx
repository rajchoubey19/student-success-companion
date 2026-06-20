import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    setUserEmail(user.email);
  } else {
    setUserEmail("");
  }
});

return () => unsubscribe();

    localStorage.setItem("darkMode", darkMode);

    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
   
  const [userEmail, setUserEmail] = useState("");

  const logoutUser = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 shadow-lg flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-wide">
        Student Success Companion
      </h1>
       
        <p className="hidden md:block bg-white/20 px-3 py-2 rounded-lg text-sm">
  {userEmail}
</p>

      <div className="flex gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button
          onClick={logoutUser}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}