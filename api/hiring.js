export default function handler(req, res) {
  const companies = [
    {
      id: 5001,
      name: "Insider",
      sector: "SaaS",
      score: 93,
      opportunityType: "İşe Alım + Eğitim",
      note: "Global ekip büyümesi ve kritik rol ihtiyacı",
      headlines: ["Insider küresel büyümesini yeni ekiplerle destekliyor"],
      signals: ["İşe Alım", "Büyüme"]
    },
    {
      id: 5002,
      name: "Logo Yazılım",
      sector: "Yazılım",
      score: 85,
      opportunityType: "İşe Alım + Eğitim",
      note: "Ürün, mühendislik ve müşteri tarafında kritik roller öne çıkıyor",
      headlines: ["Yazılım tarafında yeni büyüme alanları açılıyor"],
      signals: ["İşe Alım", "Dönüşüm"]
    },
    {
      id: 5003,
      name: "Hepsiburada",
      sector: "E-Ticaret",
      score: 81,
      opportunityType: "Eğitim",
      note: "Operasyon ve kategori ekiplerinde iş gücü ihtiyacı dikkat çekiyor",
      headlines: ["E-ticarette operasyon ekiplerinin önemi artıyor"],
      signals: ["İşe Alım", "Büyüme"]
    }
  ];

  res.status(200).json(companies);
}
