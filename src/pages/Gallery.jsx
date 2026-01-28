import { useState } from "react";

function Gallery({ items }) {
  if (!items.length) return <p>Brak zdjęć</p>;

  // Grupowanie zdjęć po tytułach
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.title]) acc[item.title] = [];
    acc[item.title].push(item.image_url);
    return acc;
  }, {});

  const [activeTitle, setActiveTitle] = useState(null); // który zestaw jest rozwinięty
  const [activeIndex, setActiveIndex] = useState(0); // które zdjęcie w zestawie

  const handleNext = () => {
    if (!activeTitle) return;
    setActiveIndex((prev) =>
      prev + 1 < grouped[activeTitle].length ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    if (!activeTitle) return;
    setActiveIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : grouped[activeTitle].length - 1
    );
  };

  return (
    <div className="row">
      {Object.keys(grouped).map((title) => (
        <div className="col-md-4 mb-3" key={title}>
          <div className="card">
            <img
              src={grouped[title][0]}
              alt={title}
              className="card-img-top"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (activeTitle === title) {
                  // kliknięcie na aktywny zestaw zamyka go
                  setActiveTitle(null);
                } else {
                  setActiveTitle(title);
                  setActiveIndex(0);
                }
              }}
            />
            <div className="card-body">
              <h6 className="card-title">{title}</h6>
            </div>
          </div>
        </div>
      ))}

      {/* Rozwijany widok tylko dla aktywnego tytułu */}
      {activeTitle && (
        <div className="col-12 mt-3 text-center">
          <h5>{activeTitle}</h5>
          <img
            src={grouped[activeTitle][activeIndex]}
            alt={activeTitle}
            style={{ maxWidth: "100%", marginBottom: "10px" }}
          />
          <div>
            <button onClick={handlePrev} className="btn btn-primary me-2">
              Poprzednie
            </button>
            <button onClick={handleNext} className="btn btn-primary">
              Następne
            </button>
            <button
              onClick={() => setActiveTitle(null)}
              className="btn btn-secondary ms-2"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
