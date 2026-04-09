export default function handler(req, res) {
  const companies = [
    {
      id: 6001,
      name: "Martı",
      sector: "Mobilite",
      score: 79,
      opportunityType: "Eğitim",
      note: "Dönüşüm baskısı ve operasyonel verimlilik ihtiyacı öne çıkıyor",
      headlines: ["Mobilite sektöründe maliyet ve verimlilik baskısı artıyor"],
      signals: ["Risk", "Dönüşüm"]
    },
    {
      id: 6002,
      name: "Getir",
      sector: "Tech",
      score: 82,
      opportunityType: "Eğitim",
      note: "Yapısal hizalanma ve liderlik kapasitesi güçlendirme fırsatı",
      headlines: ["Teknoloji şirketlerinde yeniden yapılanma gündemi sürüyor"],
      signals: ["Risk", "Dönüşüm"]
    },
    {
      id: 6003,
      name: "Aksa Enerji",
      sector: "Enerji",
      score: 78,
      opportunityType: "Eğitim",
      note: "Çok paydaşlı operasyonlarda koordinasyon ve karar kalitesi ihtiyacı",
      headlines: ["Enerji tarafında operasyonel verimlilik yeniden odakta"],
      signals: ["Risk", "Operasyon"]
    }
  ];

  res.status(200).json(companies);
}
