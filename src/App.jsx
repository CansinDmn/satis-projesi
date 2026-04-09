import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";

const starterCompanies = [
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

function buildMessage(company) {
  return `Merhaba, ${company.name} tarafında özellikle ${company.sector} sektöründeki büyüme dinamikleri doğrultusunda ${company.opportunityType.toLowerCase()} alanında destek sunabileceğimizi düşünüyorum. Uygun olursa kısa bir görüşmede paylaşmak isterim.`;
}

export default function App() {
  const [companies, setCompanies] = useState(starterCompanies);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(starterCompanies[0]);

  const filtered = useMemo(() => {
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.sector.toLowerCase().includes(query.toLowerCase()) ||
        c.opportunityType.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, companies]);

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

            let opportunityType = "Eğitim";
            if (sector.toLowerCase().includes("fintech")) {
              opportunityType = "İşe Alım + Eğitim";
            } else if (sector.toLowerCase().includes("oyun")) {
              opportunityType = "Eğitim";
            } else if (sector.toLowerCase().includes("enerji")) {
              opportunityType = "Eğitim";
            } else {
              opportunityType = "İşe Alım + Eğitim";
            }

            const company = {
              id: index + 100,
              name: row.SirketAdi,
              sector,
              score,
              opportunityType,
              note: row.Not || "Yüklenen şirket verisi üzerinden otomatik analiz oluşturuldu.",
            };
const fetchTrendingCompanies = async () => {
  try {
    const response = await fetch("/api/trending");
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      setCompanies(data);
      setSelected(data[0]);
      setQuery("");
    } else {
      alert("Trend şirket verisi alınamadı.");
    }
  } catch (error) {
    console.error(error);
    alert("Trend şirketler alınırken hata oluştu.");
  }
};
            return {
              ...company,
              message: buildMessage(company)
            };
          });

        if (parsed.length > 0) {
          setCompanies(parsed);
          setSelected(parsed[0]);
          setQuery("");
          alert("CSV başarıyla yüklendi.");
        } else {
          alert("Geçerli veri bulunamadı. CSV'de SirketAdi ve Sektor kolonları olmalı.");
        }
      }
    });
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 20, background: "#f5f7fb", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 20 }}>Satış İstihbarat Paneli</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <input
          placeholder="Şirket ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: 10,
            width: 320,
            borderRadius: 8,
            border: "1px solid #ddd"
          }}
        />

        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>

      <div style={{ marginBottom: 16, fontSize: 14, color: "#555" }}>
        CSV formatı: <b>SirketAdi,Sektor,Not</b>
      </div>

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
              <div style={{ fontSize: 13, marginTop: 6 }}>{c.opportunityType}</div>
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
