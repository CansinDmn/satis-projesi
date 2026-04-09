import React, { useEffect, useMemo, useState } from "react";

const defaultCompanies = [
  {
    id: 1,
    name: "Papara",
    sector: "Fintech",
    score: 91,
    opportunityType: "İşe Alım + Eğitim",
    note: "Hızlı büyüme",
  },
  {
    id: 2,
    name: "Midas",
    sector: "Fintech",
    score: 88,
    opportunityType: "İşe Alım",
    note: "Scale-up",
  },
  {
    id: 3,
    name: "Insider",
    sector: "SaaS",
    score: 90,
    opportunityType: "İşe Alım + Eğitim",
    note: "Global büyüme",
  }
];

function buildMessage(company) {
  return `Merhaba, ${company.name} tarafında ${company.sector} sektöründeki büyüme dinamiklerine bağlı olarak özellikle ${company.opportunityType.toLowerCase()} alanında destek olabileceğimizi düşünüyorum. Uygun olursa kısa bir görüşme yapabilir miyiz?`;
}

export default function App() {
  const [companies, setCompanies] = useState(defaultCompanies);
  const [selected, setSelected] = useState(defaultCompanies[0]);
  const [query, setQuery] = useState("");

  // 🔥 OTOMATİK API ÇEK
  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => {
        if (data?.length) {
          setCompanies(data);
          setSelected(data[0]);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return companies.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, companies]);

  const message = buildMessage(selected);

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

          <div>
            <h3>Fırsat</h3>
            <p>{selected.opportunityType}</p>
          </div>

          <div>
            <h3>Not</h3>
            <p>{selected.note}</p>
          </div>

          <div>
            <h3>Satış Mesajı</h3>
            <p>{message}</p>

            <button
              onClick={() => {
                navigator.clipboard.writeText(message);
                alert("Kopyalandı");
              }}
              style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 8,
                border: "none",
                background: "#22c55e",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Mesajı Kopyala
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
