import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";

const defaultCompanies = [
  {
    id: 1,
    name: "Papara",
    sector: "Fintech",
    score: 91,
    opportunityType: "İşe Alım + Eğitim",
    note: "Hızlı büyüme",
    headlines: ["Papara için örnek haber başlığı"],
    signals: ["Yatırım", "Büyüme"]
  },
  {
    id: 2,
    name: "Midas",
    sector: "Fintech",
    score: 88,
    opportunityType: "İşe Alım",
    note: "Scale-up",
    headlines: ["Midas için örnek haber başlığı"],
    signals: ["İşe Alım"]
  },
  {
    id: 3,
    name: "Insider",
    sector: "SaaS",
    score: 90,
    opportunityType: "İşe Alım + Eğitim",
    note: "Global büyüme",
    headlines: ["Insider için örnek haber başlığı"],
    signals: ["Büyüme", "Dönüşüm"]
  }
];

function buildMessage(company) {
  return `Merhaba, ${company.name} tarafında ${company.sector} sektöründeki büyüme dinamikleri doğrultusunda özellikle ${company.opportunityType.toLowerCase()} alanında destek olabileceğimizi düşünüyorum. Özellikle ${company.note.toLowerCase()} başlığı burada dikkat çekiyor. Uygun olursa kısa bir görüşme yapabilir miyiz?`;
}

function buildOpportunity(sector) {
  const s = (sector || "").toLowerCase();

  if (s.includes("fintech")) return "İşe Alım + Eğitim";
  if (s.includes("oyun")) return "Eğitim";
  if (s.includes("saas") || s.includes("yazılım") || s.includes("tech")) return "İşe Alım + Eğitim";
  if (s.includes("enerji")) return "Eğitim";
  if (s.includes("e-ticaret") || s.includes("perakende")) return "Eğitim";
  return "İşe Alım + Eğitim";
}

function badgeStyle(type) {
  if (type === "İşe Alım") return { background: "#082f49", color: "#38bdf8" };
  if (type === "Eğitim") return { background: "#3f1d0b", color: "#fb923c" };
  return { background: "#052e16", color: "#4ade80" };
}

function signalStyle(signal) {
  if (signal === "Yatırım") return { background: "#052e16", color: "#4ade80" };
  if (signal === "İşe Alım") return { background: "#082f49", color: "#38bdf8" };
  if (signal === "Büyüme") return { background: "#3f1d0b", color: "#fb923c" };
  if (signal === "Dönüşüm") return { background: "#312e81", color: "#a78bfa" };
  if (signal === "Risk") return { background: "#450a0a", color: "#f87171" };
  if (signal === "Operasyon") return { background: "#3f3f46", color: "#e4e4e7" };
  return { background: "#334155", color: "#e2e8f0" };
}

function scoreColor(score) {
  if (score >= 90) return "#22c55e";
  if (score >= 80) return "#38bdf8";
  return "#f59e0b";
}

function getTrainingTopics(company) {
  const s = (company.sector || "").toLowerCase();
  if (s.includes("fintech")) return ["Karar alma", "Risk yönetimi", "Fonksiyonlar arası iş birliği"];
  if (s.includes("oyun")) return ["Orta kademe liderlik", "Delegasyon", "Ekip performansı"];
  if (s.includes("saas") || s.includes("yazılım") || s.includes("tech")) return ["Liderlik", "Ölçeklenme yönetimi", "Karar kalitesi"];
  if (s.includes("enerji")) return ["Süreç iyileştirme", "Operasyonel mükemmellik", "Liderlik"];
  if (s.includes("e-ticaret") || s.includes("perakende")) return ["Müşteri deneyimi", "Süreç yönetimi", "Ekip koordinasyonu"];
  return ["Liderlik", "Karar alma", "İş birliği"];
}

function getHiringRoles(company) {
  const s = (company.sector || "").toLowerCase();
  if (s.includes("fintech")) return ["Product Manager", "Compliance Specialist", "Data Analyst"];
  if (s.includes("oyun")) return ["Game Producer", "UA Manager", "People Partner"];
  if (s.includes("saas") || s.includes("yazılım") || s.includes("tech")) return ["Product", "Engineering", "Customer Success"];
  if (s.includes("enerji")) return ["Operasyon Yöneticisi", "Proje Kontrol", "Süreç Geliştirme"];
  if (s.includes("e-ticaret") || s.includes("perakende")) return ["Category Manager", "CX Lead", "Operations Manager"];
  return ["Kritik rol analizi gerekli"];
}

function getTargetRoles(company) {
  const s = (company.sector || "").toLowerCase();
  if (s.includes("fintech")) return ["CHRO", "Talent Acquisition Lead", "Product Director"];
  if (s.includes("oyun")) return ["People Lead", "Studio Director", "Founder"];
  if (s.includes("saas") || s.includes("yazılım") || s.includes("tech")) return ["Head of People", "VP Product", "Founder"];
  if (s.includes("enerji")) return ["İK Direktörü", "Operasyon Direktörü", "L&D Manager"];
  if (s.includes("e-ticaret") || s.includes("perakende")) return ["HR Director", "Operations Director", "CX Director"];
  return ["İK", "Operasyon", "Genel Müdür"];
}

export default function App() {
  const [companies, setCompanies] = useState(defaultCompanies);
  const [selected, setSelected] = useState(defaultCompanies[0]);
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("Tümü");
  const [activeView, setActiveView] = useState("trend");

  const loadData = (view) => {
let endpoint = "/api/trending";
if (view === "investments") endpoint = "/api/investments";
if (view === "hiring") endpoint = "/api/hiring";
if (view === "risk") endpoint = "/api/risk";
if (view === "discovery") endpoint = "/api/discovery";

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data?.length) {
          setCompanies(data);
          setSelected(data[0]);
          setQuery("");
          setSectorFilter("Tümü");
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadData(activeView);
  }, [activeView]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = (results.data || [])
          .filter((row) => row.SirketAdi)
          .map((row, index) => {
            const sector = row.Sektor || "Genel";
            const score = Math.floor(Math.random() * 25) + 70;

            return {
              id: index + 1000,
              name: row.SirketAdi,
              sector,
              score,
              opportunityType: buildOpportunity(sector),
              note: row.Not || "Yüklenen şirket verisi üzerinden otomatik fırsat analizi oluşturuldu.",
              headlines: row.Haber ? [row.Haber] : [],
              signals: row.Sinyal ? [row.Sinyal] : []
            };
          });

        if (parsed.length > 0) {
          const merged = [...parsed, ...companies];
          setCompanies(merged);
          setSelected(parsed[0]);
          setQuery("");
          setSectorFilter("Tümü");
          alert("CSV başarıyla yüklendi.");
        } else {
          alert("Geçerli veri bulunamadı. CSV'de SirketAdi ve Sektor kolonları olmalı.");
        }
      }
    });
  };

  const sectors = useMemo(() => ["Tümü", ...new Set(companies.map((c) => c.sector))], [companies]);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchesQuery =
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.sector.toLowerCase().includes(query.toLowerCase());

      const matchesSector = sectorFilter === "Tümü" || c.sector === sectorFilter;

      return matchesQuery && matchesSector;
    });
  }, [query, companies, sectorFilter]);

  const hottest = [...companies].sort((a, b) => b.score - a.score).slice(0, 3);
  const actionList = [...companies].sort((a, b) => b.score - a.score).slice(0, 5);
  const message = buildMessage(selected);
  const trainingTopics = getTrainingTopics(selected);
  const hiringRoles = getHiringRoles(selected);
  const targetRoles = getTargetRoles(selected);

  const tabStyle = (key) => ({
    padding: "10px 14px",
    borderRadius: 10,
    border: activeView === key ? "1px solid #38bdf8" : "1px solid #334155",
    background: activeView === key ? "#082f49" : "#1e293b",
    color: activeView === key ? "#38bdf8" : "#fff",
    cursor: "pointer"
  });

  return (
    <div style={{ background: "#0f172a", color: "#fff", minHeight: "100vh", padding: 30 }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Satış İstihbarat Paneli</h1>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
<button style={tabStyle("trend")} onClick={() => setActiveView("trend")}>Trend</button>
<button style={tabStyle("investments")} onClick={() => setActiveView("investments")}>Yatırım</button>
<button style={tabStyle("hiring")} onClick={() => setActiveView("hiring")}>İşe Alım</button>
<button style={tabStyle("risk")} onClick={() => setActiveView("risk")}>Risk / Dönüşüm</button>
<button style={tabStyle("discovery")} onClick={() => setActiveView("discovery")}>Keşifler</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {hottest.map((c) => (
          <div key={c.id} style={{ background: "#1e293b", padding: 16, borderRadius: 12, border: "1px solid #334155" }}>
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 6 }}>En sıcak şirket</div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{c.name}</div>
            <div style={{ fontSize: 14 }}>{c.sector}</div>
            <div style={{ color: scoreColor(c.score), marginTop: 8 }}>Skor: {c.score}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#111827", border: "1px solid #334155", borderRadius: 12, padding: 16, marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Bugün yazılacak 5 şirket</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {actionList.map((c) => (
            <div key={c.id} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, padding: "10px 12px", minWidth: 180 }}>
              <div style={{ fontWeight: 700 }}>{c.name}</div>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>{c.sector}</div>
              <div style={{ fontSize: 13, color: scoreColor(c.score) }}>Skor: {c.score}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          placeholder="Şirket ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 12, width: 260, borderRadius: 10, border: "none" }}
        />

        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          style={{ padding: 12, borderRadius: 10, border: "none" }}
        >
          {sectors.map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>

        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>

      <div style={{ marginBottom: 16, fontSize: 13, color: "#94a3b8" }}>
        CSV formatı: <b>SirketAdi,Sektor,Not,Haber,Sinyal</b>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ width: "35%" }}>
          {filtered.map((c) => {
            const tag = badgeStyle(c.opportunityType);

            return (
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <div>
                    <b>{c.name}</b>
                    <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{c.sector}</div>
                  </div>
                  <div style={{ color: scoreColor(c.score), fontWeight: 700 }}>#{c.score}</div>
                </div>

                <div style={{ ...tag, display: "inline-block", marginTop: 10, padding: "4px 8px", borderRadius: 999, fontSize: 12 }}>
                  {c.opportunityType}
                </div>

                <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 10 }}>
                  {c.note}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ width: "65%", background: "#1e293b", padding: 20, borderRadius: 12 }}>
          <h2>{selected.name}</h2>
          <p>{selected.sector}</p>

          <div style={{ marginBottom: 16 }}>
            <h3>Fırsat</h3>
            <p>{selected.opportunityType}</p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <h3>Neden sıcak?</h3>
            <p>{selected.note}</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3>Sinyaller</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(selected.signals || []).length ? selected.signals.map((signal) => {
                const tag = signalStyle(signal);
                return (
                  <span key={signal} style={{ ...tag, padding: "6px 10px", borderRadius: 999, fontSize: 12 }}>
                    {signal}
                  </span>
                );
              }) : <span style={{ color: "#94a3b8" }}>Sinyal bulunamadı</span>}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3>Haber başlıkları</h3>
            {(selected.headlines || []).length ? (
              <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
                {selected.headlines.map((item, idx) => (
                  <li key={`${item}-${idx}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#94a3b8" }}>Haber başlığı bulunamadı</p>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20, marginBottom: 20 }}>
            <div style={{ background: "#111827", border: "1px solid #334155", borderRadius: 12, padding: 14 }}>
              <h3 style={{ marginTop: 0 }}>Önerilen eğitim başlıkları</h3>
              <ul style={{ paddingLeft: 18, marginBottom: 0 }}>
                {trainingTopics.map((item) => <li key={item} style={{ marginBottom: 6 }}>{item}</li>)}
              </ul>
            </div>

            <div style={{ background: "#111827", border: "1px solid #334155", borderRadius: 12, padding: 14 }}>
              <h3 style={{ marginTop: 0 }}>Önerilen işe alım rolleri</h3>
              <ul style={{ paddingLeft: 18, marginBottom: 0 }}>
                {hiringRoles.map((item) => <li key={item} style={{ marginBottom: 6 }}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div style={{ background: "#111827", border: "1px solid #334155", borderRadius: 12, padding: 14, marginBottom: 20 }}>
            <h3 style={{ marginTop: 0 }}>Hedeflenecek kişi rolleri</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {targetRoles.map((item) => (
                <span key={item} style={{ background: "#082f49", color: "#38bdf8", padding: "6px 10px", borderRadius: 999, fontSize: 12 }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3>Satış Mesajı</h3>
            <p style={{ lineHeight: 1.7 }}>{message}</p>

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
