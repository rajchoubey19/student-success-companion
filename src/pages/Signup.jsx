import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signupUser}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}