export default async function handler(req, res) {
  const seedCompanies = [
    { name: "Papara", sector: "Fintech" },
    { name: "Midas", sector: "Fintech" },
    { name: "Insider", sector: "SaaS" },
    { name: "Hepsiburada", sector: "E-Ticaret" },
    { name: "Martı", sector: "Mobilite" },
    { name: "Aksa Enerji", sector: "Enerji" },
    { name: "Good Job Games", sector: "Oyun" },
    { name: "Doktar", sector: "AgriTech" },
    { name: "Getir", sector: "Tech" },
    { name: "Logo Yazılım", sector: "Yazılım" }
  ];

  function buildOpportunity(sector) {
    const s = (sector || "").toLowerCase();

    if (s.includes("fintech")) return "İşe Alım + Eğitim";
    if (s.includes("oyun")) return "Eğitim";
    if (s.includes("saas") || s.includes("yazılım") || s.includes("tech")) return "İşe Alım + Eğitim";
    if (s.includes("enerji")) return "Eğitim";
    if (s.includes("e-ticaret") || s.includes("perakende")) return "Eğitim";
    return "İşe Alım + Eğitim";
  }

  function extractItems(xml) {
    const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
    return itemMatches.map((match) => match[1]);
  }

  function extractTag(block, tag) {
    const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);
    const found = block.match(regex);
    if (!found) return "";
    return found[1]
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  function scoreFromTitles(titles) {
    const text = titles.join(" ").toLowerCase();

    let score = 70;
    const signals = [];

    if (/(yatırım|investment|funding|fon|değerleme|seri a|seri b)/i.test(text)) {
      score += 15;
      signals.push("Yatırım");
    }

    if (/(işe alım|kariyer|pozisyon|ekip|hiring|talent|istihdam)/i.test(text)) {
      score += 10;
      signals.push("İşe Alım");
    }

    if (/(büyüme|expansion|global|ihracat|yeni ürün|new product|launch)/i.test(text)) {
      score += 8;
      signals.push("Büyüme");
    }

    if (/(dönüşüm|verimlilik|otomasyon|yapay zeka|ai)/i.test(text)) {
      score += 6;
      signals.push("Dönüşüm");
    }

    if (/(kriz|zarar|ceza|soruşturma|işten çıkarma|layoff|küçülme)/i.test(text)) {
      score += 4;
      signals.push("Risk");
    }

    if (score > 99) score = 99;
    return { score, signals };
  }

  try {
    const results = await Promise.all(
      seedCompanies.map(async (company, index) => {
        const query = encodeURIComponent(`"${company.name}"`);
        const url = `https://news.google.com/rss/search?q=${query}&hl=tr&gl=TR&ceid=TR:tr`;

        try {
          const response = await fetch(url);
          const xml = await response.text();

          const items = extractItems(xml).slice(0, 5);
          const titles = items.map((item) => extractTag(item, "title")).filter(Boolean);

          const { score, signals } = scoreFromTitles(titles);

          return {
            id: index + 3000,
            name: company.name,
            sector: company.sector,
            score,
            opportunityType: buildOpportunity(company.sector),
            note:
              titles[0] ||
              `${company.name} için güncel haber bulundu, detay değerlendirme yapılabilir.`,
            headlines: titles,
            signals
          };
        } catch (err) {
          return {
            id: index + 3000,
            name: company.name,
            sector: company.sector,
            score: 70,
            opportunityType: buildOpportunity(company.sector),
            note: `${company.name} için canlı haber çekilemedi, varsayılan analiz gösteriliyor.`,
            headlines: [],
            signals: []
          };
        }
      })
    );

    results.sort((a, b) => b.score - a.score);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Trend verisi alınamadı." });
  }
}
