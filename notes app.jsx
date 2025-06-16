import React, { useState } from "react";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const handleAddNote = () => {
    if (note.trim() !== "") {
      setNotes([...notes, note]);
      setNote("");
    }
  };

  return (
    <div style={{ margin: "2rem", maxWidth: 400 }}>
      <h2>Notes App</h2>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={note}
          placeholder="Write a note..."
          onChange={e => setNote(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleAddNote();
          }}
          style={{ flex: 1, padding: "0.5rem", fontSize: "1rem" }}
        />
        <button onClick={handleAddNote} style={{ padding: "0.5rem 1rem" }}>
          Add
        </button>
      </div>
      <ul style={{ marginTop: "1.5rem", paddingLeft: 20 }}>
        {notes.map((n, idx) => (
          <li key={idx} style={{ fontSize: "1.1rem", marginBottom: 4 }}>
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;