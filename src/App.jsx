import React from "react";

export default function App() {
  return (
    <div style={{ background: "#020617", color: "white", minHeight: "100vh", padding: 24, fontFamily: "Arial" }}>
      <div
        style={{
          background: "#dc2626",
          color: "white",
          fontWeight: 800,
          fontSize: 28,
          padding: 16,
          borderRadius: 12,
          marginBottom: 20
        }}
      >
        TEST SÜRÜMÜ - KEŞİFLER AKTİF
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <button style={{ padding: 10, borderRadius: 8 }}>Trend</button>
        <button style={{ padding: 10, borderRadius: 8 }}>Yatırım</button>
        <button style={{ padding: 10, borderRadius: 8 }}>İşe Alım</button>
        <button style={{ padding: 10, borderRadius: 8 }}>Risk / Dönüşüm</button>
        <button style={{ padding: 10, borderRadius: 8, background: "#7c3aed", color: "white" }}>Keşifler</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#1e293b", padding: 20, borderRadius: 12 }}>
          <h2>Keşif Listesi</h2>
          <div style={{ background: "#312e81", color: "#c4b5fd", display: "inline-block", padding: "6px 10px", borderRadius: 999, marginBottom: 10 }}>
            Aday Şirket
          </div>
          <p>Şirket: Örnek Discovery Firma</p>
          <p>Sinyal: Yatırım, İşe Alım</p>
          <p>Haber: Örnek haber başlığı burada</p>
        </div>

        <div style={{ background: "#1e293b", padding: 20, borderRadius: 12 }}>
          <h2>Detay Paneli</h2>
          <p>Bu ekranı görüyorsan yeni kod production’a çıkmış demektir.</p>
        </div>
      </div>
    </div>
  );
}
