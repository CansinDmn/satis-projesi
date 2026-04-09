export default function handler(req, res) {
  const companies = [
    {
      id: 301,
      name: "Papara",
      sector: "Fintech",
      score: 92,
      opportunityType: "İşe Alım + Eğitim",
      note: "Büyüme, ürünleşme ve kritik roller için yüksek potansiyel"
    },
    {
      id: 302,
      name: "Midas",
      sector: "Fintech",
      score: 89,
      opportunityType: "İşe Alım",
      note: "Scale-up yapıda kritik teknik ve ticari roller öne çıkıyor"
    },
    {
      id: 303,
      name: "Insider",
      sector: "SaaS",
      score: 90,
      opportunityType: "İşe Alım + Eğitim",
      note: "Global büyüme, liderlik ve ekip yapılanması ihtiyacı"
    },
    {
      id: 304,
      name: "Hepsiburada",
      sector: "E-Ticaret",
      score: 82,
      opportunityType: "Eğitim",
      note: "Operasyon, müşteri deneyimi ve koordinasyon alanı güçlü fırsat"
    },
    {
      id: 305,
      name: "Martı",
      sector: "Mobilite",
      score: 77,
      opportunityType: "Eğitim",
      note: "Dönüşüm ve operasyonel verimlilik başlığı öne çıkıyor"
    },
    {
      id: 306,
      name: "Aksa Enerji",
      sector: "Enerji",
      score: 80,
      opportunityType: "Eğitim",
      note: "Çok paydaşlı operasyonlarda liderlik ve süreç disiplini ihtiyacı"
    },
    {
      id: 307,
      name: "Good Job Games",
      sector: "Oyun",
      score: 86,
      opportunityType: "Eğitim",
      note: "Orta kademe liderlik ve ekip ölçekleme fırsatı"
    },
    {
      id: 308,
      name: "Doktar",
      sector: "AgriTech",
      score: 81,
      opportunityType: "İşe Alım + Eğitim",
      note: "Teknoloji ve saha ekipleri arasında hibrit yapı ihtiyacı"
    },
    {
      id: 309,
      name: "Getir",
      sector: "Tech",
      score: 78,
      opportunityType: "Eğitim",
      note: "Operasyonel yapı ve yeniden hizalanma fırsatı"
    },
    {
      id: 310,
      name: "Logo Yazılım",
      sector: "Yazılım",
      score: 79,
      opportunityType: "İşe Alım + Eğitim",
      note: "Ürün, müşteri başarısı ve liderlik tarafında potansiyel"
    }
  ];

  res.status(200).json(companies);
}
