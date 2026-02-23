import { useState } from "react";
import TreeScene from "./TreeScene";
import "./App.css";

function App() {
  const [treeColor, setTreeColor] = useState("#2E7D32");
  const [advice, setAdvice] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState("");

  const askTree = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();

      setAdvice(data.advice);
      setTreeColor(data.tree_reaction);
      setSentiment(data.sentiment);
    } catch (error) {
      setAdvice("The forest is quiet... try again.");
      setTreeColor("#4CAF50");
      setSentiment("neutral");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <TreeScene treeColor={treeColor} />

      <div className="mentor-card">
        <div className="mentor-title"> AI Tree Mentor</div>

        <textarea
          rows={4}
          className="mentor-textarea"
          placeholder="Share your problem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="mentor-button"
          onClick={askTree}
          disabled={loading}
        >
          {loading ? " Growing wisdom..." : "Ask the Tree"}
        </button>

        {advice && (
          <>
            <div className="mentor-advice">{advice}</div>
            <div className={`sentiment-badge ${sentiment}`}>
              {sentiment}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;