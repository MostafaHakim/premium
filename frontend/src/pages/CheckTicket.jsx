import { useState, useEffect } from "react";

export default function CheckTicket() {
  const [ticket, setTicket] = useState("");
  const [result, setResult] = useState(null);

  const check = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/draws`);
    const data = await res.json();
    const wins = data.flatMap((d) => d.winningNumbers);
    setResult(wins.includes(Number(ticket)));
  };

  return (
    <div>
      <h2>Check Ticket</h2>
      <input
        onChange={(e) => setTicket(e.target.value)}
        placeholder="Ticket No"
      />
      <button onClick={check}>Check</button>

      {result !== null && (
        <h3>{result ? "🎉 You Win Free Mosquito Net!" : "❌ Not Winner"}</h3>
      )}
    </div>
  );
}
