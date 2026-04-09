import React, { useMemo, useState } from "react";

const companies = [
  {
    id: 1,
    name: "Papara",
    sector: "Fintech",
    score: 91,
    opportunityType: "İşe Alım + Eğitim",
    note: "Hızlı büyüme, rol netliği ve karar mekanizması ihtiyacı",
    message:
      "Merhaba, Papara tarafında büyüme ile birlikte rol netliği ve karar mekanizmaları kritik hale geliyor. Bu noktada işe alım ve gelişim tarafında destek olabiliriz."
  },
  {
    id: 2,
    name: "Midas",
    sector: "Fintech",
    score: 88,
    opportunityType: "İşe Alım",
    note: "Scale-up aşamasında kritik rol ihtiyacı",
    message:
      "Merhaba, Midas büyüme sürecinde kritik rollerin doğru konumlanması önemli hale geliyor. Bu noktada işe alım desteği sunabiliriz."
  },
  {
    id: 3,
    name: "Good Job Games",
    sector: "Oyun",
    score: 84,
    opportunityType: "Eğitim",
    note: "Orta kademe liderlik gelişimi kritik",
    message:
      "Merhaba, hızlı büyüyen ekiplerde liderlik ve delegasyon başlıkları kritik hale geliyor. Bu alanda gelişim çözümleri sunabiliriz."
  }
];

function scoreColor(score) {
  if (score >= 85) return "#ff4d6d";
  if (score >= 75) return "#ff9f1c";
  return "#2ec4b6";
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(companies[0]);

  const filtered = useMemo(() => {
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.sector.toLowerCase().includes(query.toLowerCase()) ||
        c.opportunityType.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div style={{ fontFamily: "Arial", padding: 20, background: "#f5f7fb", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 20 }}>Satış İstihbarat Paneli</h1>

      <input
        placeholder="Şirket ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: 10,
          width: "100%",
          marginBottom: 20,
          borderRadius: 8,
          border: "1px solid #ddd"
        }}
      />

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: "40%" }}>
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              style={{
                background: "#fff",
                padding: 15,
                marginBottom: 10,
                borderRadius: 10,
                cursor: "pointer",
                border: selected.id === c.id ? "2px solid blue" : "1px solid #ddd"
              }}
            >
              <b>{c.name}</b>
              <div>{c.sector}</div>
              <div style={{ color: scoreColor(c.score) }}>Skor: {c.score}</div>
            </div>
          ))}
        </div>

        <div style={{ width: "60%", background: "#fff", padding: 20, borderRadius: 10 }}>
          <h2>{selected.name}</h2>
          <p><b>Sektör:</b> {selected.sector}</p>
          <p><b>Fırsat:</b> {selected.opportunityType}</p>
          <p><b>Not:</b> {selected.note}</p>

          <hr />

          <h3>Satış Mesajı</h3>
          <p>{selected.message}</p>
        </div>
      </div>
    </div>
  );
}
