import React, { useState, useEffect } from "react";

// Example quotes dataset
const QUOTES = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "Motivation"
  },
  {
    text: "I'm not arguing, I'm just explaining why I'm right.",
    author: "Unknown",
    category: "Humor"
  },
  {
    text: "Do not take life too seriously. You will never get out of it alive.",
    author: "Elbert Hubbard",
    category: "Humor"
  },
  {
    text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
    author: "Albert Einstein",
    category: "Wisdom"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Motivation"
  },
  {
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    category: "Wisdom"
  }
];

const CATEGORIES = ["All", ...Array.from(new Set(QUOTES.map(q => q.category)))];

// Helper to get a "random" quote by date
function getQuoteOfTheDay(quotes, category = "All") {
  const today = new Date();
  const idxSeed =
    today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const filtered = category === "All" ? quotes : quotes.filter(q => q.category === category);
  if (!filtered.length) return null;
  return filtered[idxSeed % filtered.length];
}

function App() {
  const [category, setCategory] = useState("All");
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [showingFavorites, setShowingFavorites] = useState(false);

  // Load daily quote
  useEffect(() => {
    setQuote(getQuoteOfTheDay(QUOTES, category));
  }, [category, showingFavorites]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleNewRandomQuote = () => {
    const filtered = category === "All" ? QUOTES : QUOTES.filter(q => q.category === category);
    if (!filtered.length) return;
    let random;
    do {
      random = filtered[Math.floor(Math.random() * filtered.length)];
    } while (filtered.length > 1 && random.text === quote?.text);
    setQuote(random);
  };

  const handleSaveFavorite = () => {
    if (quote && !favorites.some(f => f.text === quote.text && f.author === quote.author)) {
      setFavorites([...favorites, quote]);
    }
  };

  const handleRemoveFavorite = quoteToRemove => {
    setFavorites(favorites.filter(f => !(f.text === quoteToRemove.text && f.author === quoteToRemove.author)));
  };

  const displayQuotes = showingFavorites ? favorites : quote ? [quote] : [];

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>🌟 Daily Quotes App</h2>
      <div style={{ marginBottom: 16 }}>
        <label>
          Category:{" "}
          <select value={category} onChange={e => setCategory(e.target.value)} disabled={showingFavorites}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <button
          style={{ marginLeft: 16 }}
          onClick={() => setShowingFavorites(fav => !fav)}
        >
          {showingFavorites ? "Show Daily Quote" : `Show Favorites (${favorites.length})`}
        </button>
      </div>

      {displayQuotes.length > 0 ? (
        displayQuotes.map((q, idx) => (
          <div key={q.text + idx} style={{
            background: "#f9f9f9",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            position: "relative"
          }}>
            <div style={{ fontStyle: "italic", fontSize: "1.1rem" }}>"{q.text}"</div>
            <div style={{ fontWeight: "bold", marginTop: 8 }}>{q.author}</div>
            <div style={{
              background: "#e0e7ff",
              display: "inline-block",
              borderRadius: 4,
              padding: "2px 8px",
              marginTop: 4,
              fontSize: 12
            }}>{q.category}</div>
            {showingFavorites &&
              <button
                style={{ position: "absolute", top: 12, right: 12, color: "#fff", background: "#e11", border: "none", borderRadius: 4, padding: "4px 8px" }}
                onClick={() => handleRemoveFavorite(q)}
              >Remove</button>
            }
          </div>
        ))
      ) : (
        <div style={{ marginTop: 32, fontStyle: "italic" }}>No quotes to display.</div>
      )}

      {!showingFavorites && (
        <div style={{ marginTop: 16 }}>
          <button onClick={handleNewRandomQuote} style={{ marginRight: 8 }}>🎲 New Random Quote</button>
          <button onClick={handleSaveFavorite} disabled={!quote || favorites.some(f => f.text === quote.text && f.author === quote.author)}>
            ⭐ Save Favorite
          </button>
        </div>
      )}
    </div>
  );
}

export default App;