import { useEffect, useState } from "react";

const stylistyka = [
  { term: "Epitet", def: "Określenie rzeczownika." },
  { term: "Metafora", def: "Przenośne znaczenie." },
  { term: "Personifikacja", def: "Cechy ludzkie dla rzeczy." },
  { term: "Oksymoron", def: "Sprzeczne znaczenia." },
  { term: "Onomatopeja", def: "Dźwiękonaśladowcze słowa." }
];

const wesele = [
  { term: "Chochoł", def: "Symbol uśpienia narodu." },
  { term: "Widmo", def: "Duch utraconej miłości." },
  { term: "Stańczyk", def: "Symbol mądrości politycznej." },
  { term: "Wernyhora", def: "Prorok wolnej Polski." }
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [mode, setMode] = useState("stylistyka");
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  function getData() {
    return mode === "wesele" ? wesele : stylistyka;
  }

  function generate() {
    const data = getData();
    const correct = data[Math.floor(Math.random() * data.length)];

    const options = [correct];
    while (options.length < 4) {
      const r = data[Math.floor(Math.random() * data.length)];
      if (!options.includes(r)) options.push(r);
    }

    return {
      def: correct.def,
      correct: correct.term,
      options: shuffle(options)
    };
  }

  useEffect(() => {
    setQuestion(generate());
    setSelected(null);
    setLocked(false);
  }, [mode]);

  function answer(opt) {
    if (locked) return;

    setLocked(true);
    setSelected(opt);

    if (opt === question.correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setQuestion(generate());
      setSelected(null);
      setLocked(false);
    }, 600);
  }

  if (!question) return null;

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2>📚 Fiszki + Wesele</h2>

        {/* NAV */}
        <div style={styles.nav}>
          <button onClick={() => setMode("stylistyka")}>Stylistyka</button>
          <button onClick={() => setMode("wesele")}>Wesele</button>
        </div>

        {/* FISZKA / PYTANIE */}
        <div style={styles.flash}>
          {question.def}
        </div>

        {/* ODPOWIEDZI */}
        <div>
          {question.options.map((o, i) => (
            <button
              key={i}
              onClick={() => answer(o.term)}
              style={{
                ...styles.btn,
                background:
                  locked && o.term === question.correct
                    ? "#22c55e"
                    : locked && o.term === selected
                    ? "#ef4444"
                    : "#eee"
              }}
            >
              {o.term}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 10 }}>
          Wynik: {score}
        </div>

      </div>
    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6366f1, #7c3aed)"
  },
  card: {
    width: 420,
    background: "white",
    padding: 20,
    borderRadius: 16,
    textAlign: "center",
    fontFamily: "Arial"
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 15
  },
  flash: {
    padding: 40,
    background: "#eef2ff",
    borderRadius: 12,
    fontWeight: "bold",
    marginBottom: 15
  },
  btn: {
    width: "100%",
    marginTop: 8,
    padding: 10,
    border: "none",
    borderRadius: 10,
    cursor: "pointer"
  }
};