import React, { useMemo, useState } from "react";

const companies = [
  {
    id: 1,
    name: "Papara",
    sector: "Fintech",
    score: 91,
    opportunityType: "İşe Alım + Eğitim",
    note: "Hızlı büyüme ve kritik rol ihtiyacı",
    message: "Fintech büyümesinde işe alım ve organizasyon desteği sunabiliriz."
  },
  {
    id: 2,
    name: "Midas",
    sector: "Fintech",
    score: 88,
    opportunityType: "İşe Alım",
    note: "Scale-up aşamasında ekip kurulumu",
    message: "Kritik rollerin doğru konumlanması için destek olabiliriz."
  },
  {
    id: 3,
    name: "Insider",
    sector: "SaaS",
    score: 90,
    opportunityType: "İşe Alım + Eğitim",
    note: "Global büyüme",
    message: "Global ekiplerde liderlik ve yapı kurma desteği sunuyoruz."
  }
];

export default function App() {
  const [selected, setSelected] = useState(companies[0]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return companies.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div style={{ background: "#0f172a", color: "#fff", minHeight: "100vh", padding: 30 }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Satış İstihbarat Paneli</h1>

      <input
        placeholder="Şirket ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: 12,
          width: "100%",
          borderRadius: 10,
          marginBottom: 20,
          border: "none"
        }}
      />

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: "35%" }}>
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              style={{
                background: "#1e293b",
                padding: 15,
                borderRadius: 12,
                marginBottom: 10,
                cursor: "pointer"
              }}
            >
              <b>{c.name}</b>
              <div>{c.sector}</div>
              <div style={{ color: "#38bdf8" }}>Skor: {c.score}</div>
            </div>
          ))}
        </div>

        <div style={{ width: "65%", background: "#1e293b", padding: 20, borderRadius: 12 }}>
          <h2>{selected.name}</h2>
          <p>{selected.sector}</p>

          <div style={{ marginTop: 20 }}>
            <h3>Fırsat</h3>
            <p>{selected.opportunityType}</p>
          </div>

          <div>
            <h3>Not</h3>
            <p>{selected.note}</p>
          </div>

          <div>
            <h3>Satış Mesajı</h3>
            <p>{selected.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
