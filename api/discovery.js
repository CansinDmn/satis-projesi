export default async function handler(req, res) {
  const searchQueries = [
    "yatırım aldı",
    "işe alım yapacak",
    "yeni fabrika",
    "yeniden yapılanma",
    "küçülme",
    "seri A yatırım"
  ];

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

  function cleanTitle(title) {
    return title
      .replace(/\s+-\s+.*$/, "")
      .replace(/\s+\|\s+.*$/, "")
      .trim();
  }

  function guessCompanyName(title) {
    const cleaned = cleanTitle(title);

    // İlk kaba yaklaşım: başlığın ilk 2-4 kelimesinden aday üret
    const words = cleaned.split(" ").filter(Boolean);

    if (words.length === 0) return "";

    // Türkçe genel kelimeleri filtrele
    const stopWords = [
      "yatırım", "aldı", "işe", "alım", "yapacak", "yeni", "fabrika",
      "küçülme", "yeniden", "yapılanma", "seri", "a", "b", "fon",
      "ile", "ve", "bir", "için", "olan", "gibi", "sektöründe"
    ];

    const filtered = words.filter(
      (w) => !stopWords.includes(w.toLowerCase())
    );

    return filtered.slice(0, 3).join(" ").trim();
  }

  function detectSignals(title) {
    const t = title.toLowerCase();
    const signals = [];

    if (/(yatırım|seri a|seri b|fon|investment)/i.test(t)) signals.push("Yatırım");
    if (/(işe alım|hiring|kariyer|pozisyon|ekip)/i.test(t)) signals.push("İşe Alım");
    if (/(büyüme|expansion|global|yeni fabrika|yeni tesis)/i.test(t)) signals.push("Büyüme");
    if (/(küçülme|layoff|yeniden yapılanma|kriz|zarar)/i.test(t)) signals.push("Risk");

    return signals;
  }

  function scoreFromSignals(signals) {
    let score = 70;
    if (signals.includes("Yatırım")) score += 12;
    if (signals.includes("İşe Alım")) score += 8;
    if (signals.includes("Büyüme")) score += 6;
    if (signals.includes("Risk")) score += 4;
    return Math.min(score, 95);
  }

  try {
    const allCandidates = [];

    for (const q of searchQueries) {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=tr&gl=TR&ceid=TR:tr`;

      try {
        const response = await fetch(url);
        const xml = await response.text();
        const items = extractItems(xml).slice(0, 8);

        for (const item of items) {
          const title = extractTag(item, "title");
          const clean = cleanTitle(title);
          const companyGuess = guessCompanyName(clean);
          const signals = detectSignals(clean);

          if (!companyGuess || companyGuess.length < 2) continue;

          allCandidates.push({
            name: companyGuess,
            sector: "Keşif",
            score: scoreFromSignals(signals),
            opportunityType: signals.includes("İşe Alım")
              ? "İşe Alım + Eğitim"
              : "Eğitim",
            note: clean,
            headlines: [clean],
            signals
          });
        }
      } catch (err) {
        // sessiz geç
      }
    }

    // isim bazlı tekilleştir
    const uniqueMap = new Map();

    for (const item of allCandidates) {
      const key = item.name.toLowerCase();
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, {
          id: uniqueMap.size + 7000,
          ...item
        });
      } else {
        const existing = uniqueMap.get(key);
        uniqueMap.set(key, {
          ...existing,
          score: Math.max(existing.score, item.score),
          headlines: [...existing.headlines, ...item.headlines].slice(0, 3),
          signals: [...new Set([...(existing.signals || []), ...(item.signals || [])])]
        });
      }
    }

    const results = [...uniqueMap.values()]
      .filter((x) => x.name.length > 2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Discovery verisi alınamadı." });
  }
}
