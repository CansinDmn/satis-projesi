import React, { useEffect, useMemo, useState } from "react";

const defaultCompanies = [
  {
    id: 1,
    name: "Papara",
    sector: "Fintech",
    score: 91,
    opportunityType: "İşe Alım + Eğitim",
    note: "Hızlı büyüme"
  },
  {
    id: 2,
    name: "Midas",
    sector: "Fintech",
    score: 88,
    opportunityType: "İşe Alım",
    note: "Scale-up"
  },
  {
    id: 3,
    name: "Insider",
    sector: "SaaS",
    score: 90,
    opportunityType: "İşe Alım + Eğitim",
    note: "Global büyüme"
  }
];

function buildMessage(company) {
  return `Merhaba, ${company.name} tarafında ${company.sector} sektöründeki büyüme dinamikleri doğrultusunda özellikle ${company.opportunityType.toLowerCase()} alanında destek olabileceğimizi düşünüyorum. Özellikle ${company.note.toLowerCase()} başlığı burada dikkat çekiyor. Uygun olursa kısa bir görüşme yapabilir miyiz?`;
}

export default function App() {
  const [companies, setCompanies] = useState(defaultCompanies);
  const [selected, setSelected] = useState(defaultCompanies[0]);
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("Tümü");

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

  const sectors = useMemo(() => {
    return ["Tümü", ...new Set(companies.map((c) => c.sector))];
  }, [companies]);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchesQuery =
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.sector.toLowerCase().includes(query.toLowerCase());

      const matchesSector =
        sectorFilter === "Tümü" || c.sector === sectorFilter;

      return matchesQuery && matchesSector;
    });
  }, [query, companies, sectorFilter]);

  const hottest = [...companies].sort((a, b) => b.score - a.score).slice(0, 3);
  const message = buildMessage(selected);

  return (
    <div style={{ background: "#0f172a", color: "#fff", minHeight: "100vh", padding: 30 }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Satış İstihbarat Paneli</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {hottest.map((c) => (
          <div
            key={c.id}
            style={{
              background: "#1e293b",
              padding: 16,
              borderRadius: 12,
              border: "1px solid #334155"
            }}
          >
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 6 }}>En sıcak şirket</div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{c.name}</div>
            <div style={{ fontSize: 14 }}>{c.sector}</div>
            <div style={{ color: "#38bdf8", marginTop: 8 }}>Skor: {c.score}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          placeholder="Şirket ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: 12,
            width: 280,
            borderRadius: 10,
            border: "none"
          }}
        />

        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "none"
          }}
        >
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>

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
                cursor: "pointer",
                border: selected.id === c.id ? "2px solid #38bdf8" : "1px solid #334155"
              }}
            >
              <b>{c.name}</b>
              <div>{c.sector}</div>
              <div style={{ color: "#38bdf8" }}>Skor: {c.score}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>
                {c.opportunityType}
              </div>
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
