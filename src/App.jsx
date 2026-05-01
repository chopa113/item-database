import { useEffect, useRef, useState } from "react";
import './App.css';

/* =======================
   DANE – STYLISTYKA
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
  { term: "Onomatopeja", def: "Dźwiękonaśladowcze słowo." },
  { term: "Hiperbola", def: "Przesada." },
  { term: "Symbol", def: "Wiele znaczeń przenośnych." },
  { term: "Alegoria", def: "Jeden stały sens przenośny." }
];

/* =======================
   EPOKI
======================= */
const epoki = [
  /* =======================
     ANTYK
  ======================= */
  { term: "Klasycyzm", def: "Wzorzec doskonałości i harmonii." },
  { term: "Antyk", def: "Kultura Grecji i Rzymu." },
  { term: "Cnota", def: "Dobro, piękno i prawda (Platon)." },
  { term: "Epikureizm", def: "Szczęście przez przyjemność i brak bólu." },
  { term: "Stoicyzm", def: "Spokój i opanowanie emocji." },
  { term: "Hedonizm", def: "Dążenie do przyjemności." },
  { term: "Sceptycyzm", def: "Wątpienie w poznanie prawdy." },
  { term: "Sofiści", def: "Relatywizm prawdy." },
  { term: "Cynizm", def: "Odrzucenie norm społecznych." },
  { term: "Katharsis", def: "Oczyszczenie emocjonalne." },
  { term: "Mimesis", def: "Naśladowanie rzeczywistości." },
  { term: "Fatum", def: "Nieuchronny los." },
  { term: "Decorum", def: "Dostosowanie stylu do treści." },

  /* =======================
     BIBLIA
  ======================= */
  { term: "Monoteizm", def: "Wiara w jednego Boga." },
  { term: "Politeizm", def: "Wiara w wielu bogów." },
  { term: "Przypowieść", def: "Utwór z ukrytym sensem." },
  { term: "Hiobowa wieść", def: "Bardzo zła wiadomość." },
  { term: "Vanitas", def: "Przemijanie życia." },
  { term: "Biblicyzm", def: "Związki frazeologiczne z Biblii." },

  /* =======================
     ŚREDNIOWIECZE
  ======================= */
  { term: "Sacrum", def: "Sfera święta." },
  { term: "Profanum", def: "Sfera świecka." },
  { term: "Memento mori", def: "Pamiętaj o śmierci." },
  { term: "Ars moriendi", def: "Sztuka umierania." },
  { term: "Teocentryzm", def: "Bóg w centrum świata." },
  { term: "Dydaktyzm", def: "Nauczanie moralne." },
  { term: "Alegoryczność", def: "Ukryte znaczenie." },
  { term: "Pareneza", def: "Wzorce moralne." },
  { term: "Stabat Mater", def: "Motyw cierpienia Matki Boskiej." },
  { term: "Danse macabre", def: "Taniec śmierci." },

  /* =======================
     RENESANS
  ======================= */
  { term: "Renesans", def: "Odrodzenie kultury antycznej." },
  { term: "Humanizm", def: "Człowiek w centrum zainteresowania." },
  { term: "Antropocentryzm", def: "Człowiek najważniejszy." },
  { term: "Mecenat", def: "Finansowanie artystów." },
  { term: "Theatrum mundi", def: "Świat jako scena." },
  { term: "Tren", def: "Utwór żałobny." },

  /* =======================
     BAROK
  ======================= */
  { term: "Kontrreformacja", def: "Ruch Kościoła przeciw reformacji." },
  { term: "Sarmatyzm", def: "Ideologia polskiej szlachty." },

  /* =======================
     OŚWIECENIE
  ======================= */
  { term: "Racjonalizm", def: "Rozum jako źródło wiedzy." },
  { term: "Empiryzm", def: "Doświadczenie jako źródło wiedzy." },
  { term: "Deizm", def: "Bóg stworzył świat, ale nie ingeruje." },
  { term: "Ateizm", def: "Brak wiary w Boga." },
  { term: "Utylitaryzm", def: "Największa korzyść społeczna." },
  { term: "Wiek rozumu", def: "Epoka racjonalnego myślenia." },

  /* =======================
     ROMANTYZM
  ======================= */
  { term: "Bohater werteryczny", def: "Emocjonalny, nieszczęśliwy kochanek." },
  { term: "Bohater romantyczny", def: "Indywidualista, buntownik." },
  { term: "Winkelriedyzm", def: "Poświęcenie dla narodu." },
  { term: "Mesjanizm", def: "Polska jako mesjasz narodów." },
  { term: "Orientalizm", def: "Zainteresowanie kulturą Wschodu." },
  { term: "Gottizm", def: "Nawiązanie do średniowiecza." },

  /* =======================
     POZYTYWIZM
  ======================= */
  { term: "Praca u podstaw", def: "Pomoc najniższym warstwom." },
  { term: "Praca organiczna", def: "Naród jako organizm." },
  { term: "Asymilacja", def: "Włączenie mniejszości do społeczeństwa." },
  { term: "Emancypacja kobiet", def: "Równość kobiet." },
  { term: "Scjentyzm", def: "Nauka jako podstawa wiedzy." },
  { term: "Realizm", def: "Przedstawienie rzeczywistości." },

  /* =======================
     MŁODA POLSKA
  ======================= */
  { term: "Dekadentyzm", def: "Kryzys wartości i pesymizm." },
  { term: "Naturalizm", def: "Realistyczne, brutalne przedstawienie świata." },
  { term: "Katastrofizm", def: "Przekonanie o upadku cywilizacji." },

  /* =======================
     DWUDZIESTOLECIE
  ======================= */
  { term: "Ekspresjonizm", def: "Ekspresja emocji." },
  { term: "Surrealizm", def: "Podświadomość i sen." },
  { term: "Futuryzm", def: "Kult nowoczesności." },
  { term: "Awangarda", def: "Nowatorskie formy sztuki." },

  /* =======================
     WOJNA I OKUPACJA
  ======================= */
  { term: "Dehumanizacja", def: "Odebranie człowieczeństwa." },
  { term: "Patos", def: "Podniosłość stylu." },
  { term: "Demitologizacja", def: "Obalenie mitów bohaterstwa." }
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
   PICKER (bez resetu przy renderze)
======================= */
function createPicker(data) {
  let used = new Set();

  return () => {
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

  const data =
    mode === "wesele"
      ? wesele
      : mode === "epoki"
      ? epoki
      : stylistyka;

  const pickerRef = useRef(null);

  useEffect(() => {
    pickerRef.current = createPicker(data);
    next();
    setScore(0);
  }, [mode]);

  function next() {
    const pick = pickerRef.current;
    const correct = pick();

    const options = [correct];

    while (options.length < 4) {
      const r = data[Math.floor(Math.random() * data.length)];
      if (!options.find(o => o.term === r.term)) options.push(r);
    }

    setQuestion({
      def: correct.def,
      correct: correct.term,
      options: options.sort(() => Math.random() - 0.5)
    });

    setSelected(null);
    setLocked(false);
  }

  function answer(term) {
    if (locked) return;

    setSelected(term);

    if (term === question.correct) {
      setScore(s => s + 1);
      setTimeout(next, 500);
    } else {
      setLocked(true);
    }
  }

  if (!question) return null;

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2>📚 Fiszki Matura</h2>

        <div style={styles.nav}>
          <button onClick={() => setMode("stylistyka")}>Stylistyka</button>
          <button onClick={() => setMode("epoki")}>Epoki</button>
          <button onClick={() => setMode("wesele")}>Wesele</button>
          <button onClick={() => setScore(0)}>Reset</button>
        </div>

        <div style={styles.flash}>{question.def}</div>

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

        {locked && (
          <button onClick={next} style={styles.btn} style={{ ...styles.btn, background: "#3b82f6", color: "white" }}>
            Dalej
          </button>
        )}

        <div style={{ marginTop: 10 }}>
          Wynik: {score}
        </div>

      </div>
    </div>
  );
}

/* =======================
   STYLE
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
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginBottom: 15
  },
  flash: {
    padding: 20,
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
