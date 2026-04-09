export default function handler(req, res) {
  const companies = [
    {
      id: 201,
      name: "Insider",
      sector: "SaaS",
      score: 89,
      opportunityType: "İşe Alım + Eğitim",
      note: "Global büyüme ve ekip ölçekleme sinyali",
      message:
        "Merhaba, Insider gibi hızlı ölçeklenen SaaS şirketlerinde rol netliği ve ekip performansı birlikte yönetilmesi gereken kritik başlıklar. Bu noktada işe alım ve gelişim tarafında destek olabiliriz."
    },
    {
      id: 202,
      name: "Hepsiburada",
      sector: "E-Ticaret",
      score: 82,
      opportunityType: "Eğitim",
      note: "Operasyon ve müşteri deneyimi tarafında gelişim fırsatı",
      message:
        "Merhaba, yüksek hacimli e-ticaret operasyonlarında süreç yönetimi ve ekip koordinasyonu kritik hale geliyor. Bu alanda gelişim desteği sunabiliriz."
    },
    {
      id: 203,
      name: "Martı",
      sector: "Mobilite",
      score: 77,
      opportunityType: "Eğitim",
      note: "Dönüşüm ve operasyonel verimlilik ihtiyacı",
      message:
        "Merhaba, mobilite tarafında hızlı değişen operasyonlarda süreç iyileştirme ve liderlik kapasitesi daha kritik hale geliyor. Bu noktada destek olabiliriz."
    },
    {
      id: 204,
      name: "Aksa Enerji",
      sector: "Enerji",
      score: 80,
      opportunityType: "Eğitim",
      note: "Operasyonel büyümede karar ve koordinasyon ihtiyacı",
      message:
        "Merhaba, enerji sektöründe büyüyen operasyonlarla birlikte liderlik, süreç yönetimi ve koordinasyon başlıkları kritik hale geliyor. Bu alanda gelişim desteği sunabiliriz."
    },
    {
      id: 205,
      name: "Papara",
      sector: "Fintech",
      score: 92,
      opportunityType: "İşe Alım + Eğitim",
      note: "Hızlı büyüme ve kritik roller için işe alım fırsatı",
      message:
        "Merhaba, Papara tarafında büyüme ile birlikte kritik rollerin doğru konumlanması ve ekiplerin gelişimi önemli hale geliyor. Bu noktada işe alım ve gelişim desteği sunabiliriz."
    }
  ];

  res.status(200).json(companies);
}
