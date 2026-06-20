import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

console.log("Gemini Key:", import.meta.env.VITE_GEMINI_API_KEY);
  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  );

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent(question);

      setAnswer(result.response.text());
    } catch (error) {
  console.error(error);
  setAnswer(error.message);
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        🤖 AI Study Assistant
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask any study question..."
          className="w-full border p-4 rounded-lg"
          rows="5"
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {answer && (
          <div className="mt-6 bg-slate-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">
              AI Answer:
            </h3>

            <p className="whitespace-pre-wrap">
              {answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}