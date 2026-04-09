export default function handler(req, res) {
  const companies = [
    {
      id: 4001,
      name: "Papara",
      sector: "Fintech",
      score: 94,
      opportunityType: "İşe Alım + Eğitim",
      note: "Yatırım ve büyüme sinyali güçlü",
      headlines: ["Papara büyüme ivmesini sürdürüyor"],
      signals: ["Yatırım", "Büyüme"]
    },
    {
      id: 4002,
      name: "Midas",
      sector: "Fintech",
      score: 91,
      opportunityType: "İşe Alım",
      note: "Yeni ürün ve büyüme alanı",
      headlines: ["Midas büyüme alanlarını genişletiyor"],
      signals: ["Yatırım", "İşe Alım"]
    },
    {
      id: 4003,
      name: "Doktar",
      sector: "AgriTech",
      score: 86,
      opportunityType: "İşe Alım + Eğitim",
      note: "Sektör büyümesi ve yatırım odağı",
      headlines: ["Tarım teknolojilerinde yatırım odağı artıyor"],
      signals: ["Yatırım", "Dönüşüm"]
    }
  ];

  res.status(200).json(companies);
}
