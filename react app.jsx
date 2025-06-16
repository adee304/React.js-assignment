import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Real-time Text Display</h2>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Type something..."
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      />
      <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        {inputValue}
      </div>
    </div>
  );
}

export default App;