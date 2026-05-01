import { useEffect, useState } from "react";

/* =======================
   STYLISTYKA
======================= */
const stylistyka = [
  { term: "Epitet", def: "Określenie rzeczownika uwydatniające jego cechy." },
  { term: "Oksymoron", def: "Sprzeczne znaczenia (np. sucha woda)." },
  { term: "Porównanie", def: "Zestawienie z: jak, niczym itd." },
  { term: "Porównanie homeryckie", def: "Bardzo rozbudowane porównanie." },
  { term: "Metafora", def: "Przenośnia – nowe znaczenie." },
  { term: "Personifikacja", def: "Cechy ludzkie dla rzeczy." },
  { term: "Animizacja", def: "Ożywienie rzeczy martwych." },
  { term: "Metonimia", def: "Zamiana na wyraz powiązany." },
  { term: "Synekdocha", def: "Część za całość lub odwrotnie." },
  { term: "Peryfraza", def: "Omówienie zamiast nazwy." },
  { term: "Eufemizm", def: "Złagodzenie wypowiedzi." },
  { term: "Apostrofa", def: "Bezpośredni zwrot do adresata." },
  { term: "Inwokacja", def: "Uroczysta apostrofa." },
  { term: "Powtórzenie", def: "Te same słowa w tekście." },
  { term: "Anafora", def: "Powtórzenie na początku." },
  { term: "Epifora", def: "Powtórzenie na końcu." },
  { term: "Paralelizm składniowy", def: "Powtarzalna budowa zdań." },
  { term: "Inwersja", def: "Przestawny szyk." },
  { term: "Zdrobnienie", def: "Formy zdrobniałe." },
  { term: "Zgrubienie", def: "Formy pogardliwe." },
  { term: "Neologizm", def: "Nowe słowo." },
  { term: "Archaizm", def: "Słowo przestarzałe." },
  { term: "Zapożyczenie", def: "Słowo z obcego języka." },
  { term: "Onomatopeja", def: "Dźwiękonaśladowcze słowo." },
  { term: "Instrumentacja głoskowa", def: "Efekt brzmieniowy głosek." },
  { term: "Hiperbola", def: "Przesada." },
  { term: "Paradoks", def: "Sprzeczne stwierdzenie." },
  { term: "Pytanie retoryczne", def: "Bez odpowiedzi." },
  { term: "Wykrzyknienie", def: "Emocjonalne zdanie." },
  { term: "Synonim", def: "Wyraz bliskoznaczny." },
  { term: "Antonim", def: "Przeciwieństwo." },
  { term: "Homonim", def: "To samo brzmienie, inne znaczenie." },
  { term: "Symbol", def: "Wiele znaczeń przenośnych." },
  { term: "Alegoria", def: "Jeden stały sens przenośny." }
];

/* =======================
   WESELE
======================= */
const wesele = [
  { term: "Chochoł", def: "Symbol uśpienia narodu." },
  { term: "Widmo", def: "Niespełniona miłość." },
  { term: "Stańczyk", def: "Mądrość i krytyka inteligencji." },
  { term: "Rycerz", def: "Dawna chwała Polski." },
  { term: "Hetman", def: "Zdrada narodowa." },
  { term: "Upiór", def: "Rabacja galicyjska." },
  { term: "Wernyhora", def: "Nadzieja na powstanie." },
  { term: "Kaduceusz", def: "Ironiczny symbol polityki." },
  { term: "Złoty róg", def: "Stracona szansa narodu." },
  { term: "Czapka z pawimi piórami", def: "Próżność i egoizm." },
  { term: "Sznur", def: "Niewola i porażka." },
  { term: "Złota podkowa", def: "Szczęście ukryte przez egoizm." },
  { term: "Chocholi taniec", def: "Marazm narodowy." }
];

/* =======================
   UNIQUE RANDOM (BRAK POWTÓREK)
======================= */
function createUniquePicker(data) {
  let used = new Set();

  return function pick() {
    if (used.size === data.length) used.clear();

    let item;
    do {
      item = data[Math.floor(Math.random() * data.length)];
    } while (used.has(item.term));

    used.add(item.term);
    return item;
  };
}

/* =======================
   APP
======================= */
export default function App() {
  const [mode, setMode] = useState("stylistyka");
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  const data = mode === "wesele" ? wesele : stylistyka;

  const pick = createUniquePicker(data);

  function generate() {
    const correct = pick();

    const options = [correct];
    while (options.length < 4) {
      const r = data[Math.floor(Math.random() * data.length)];
      if (!options.includes(r)) options.push(r);
    }

    return {
      def: correct.def,
      correct: correct.term,
      options: options.sort(() => Math.random() - 0.5)
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

        <div style={styles.nav}>
          <button onClick={() => setMode("stylistyka")}>Stylistyka</button>
          <button onClick={() => setMode("wesele")}>Wesele</button>
        </div>

        <div style={styles.flash}>
          {question.def}
        </div>

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

        <div style={{ marginTop: 10 }}>
          Wynik: {score}
        </div>

      </div>
    </div>
  );
}

/* =======================
   STYLES
======================= */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
    padding: 30,
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