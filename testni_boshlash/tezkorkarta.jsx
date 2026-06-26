import React, { useState, useRef, useCallback, useEffect } from "react";

// ─── Colors ────────────────────────────────────────────────────────────────────
const BRAND = "#4460ef";
const BRAND_DARK = "#2d3eb5";
const BRAND_BG = "#eef2ff";
const LATER_COLOR = "#C8A800";   // sariq (rasmdan)
const LATER_BG   = "#F5EE9A";
const CLEAR_COLOR = "#3aaa35";   // yashil (rasmdan)
const CLEAR_BG   = "#C5F5A0";

// ─── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  flip: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>,
  later: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  known: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  swipeR: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  swipeL: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  kb: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/></svg>,
  repeat: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  bolt: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  target: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  bar: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  tap: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>,
  upload: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  file: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>,
  clock: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  trophy: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 21 16 21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 4H4a2 2 0 0 0-2 2v3c0 2.5 1.5 4.5 4 5a8 8 0 0 0 12 0c2.5-.5 4-2.5 4-5V6a2 2 0 0 0-2-2h-3"/><path d="M7 4h10v7a5 5 0 0 1-10 0V4z"/></svg>,
  brain: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>,
  turtle: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/><path d="M17.87 8.88A8 8 0 1 0 21 14"/><path d="M12 2v4M3 12H2M4.22 4.22l-1.42 1.42M19.78 4.22l1.42 1.42M22 12h-1"/></svg>,
  settings: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  mobile: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  desktop: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
};

// ─── Parser ────────────────────────────────────────────────────────────────────
function parseTxtCards(text) {
  const blocks = text.trim().split(/\n\s*\n/);
  const cards = [];
  blocks.forEach((block, idx) => {
    const lines = block.trim().split("\n").map(l => l.trim()).filter(Boolean);
    const answerIdx = lines.findIndex(l => /^ANSWER\s*:/i.test(l));
    if (answerIdx === -1) return;
    const answerLetter = lines[answerIdx].replace(/^ANSWER\s*:\s*/i, "").trim().toUpperCase();
    const optionLines = lines.filter(l => /^[A-D][\.\)]\s/.test(l));
    const questionLines = lines.filter(l => !/^[A-D][\.\)]\s/.test(l) && !/^ANSWER\s*:/i.test(l));
    if (!questionLines.length || !optionLines.length) return;
    const correctOption = optionLines.find(l => l.charAt(0).toUpperCase() === answerLetter);
    const rawAnswer = correctOption || `To'g'ri javob: ${answerLetter}`;
    const cleanAnswer = rawAnswer.replace(/^[A-D][\.\)]\s*/i, "").trim();
    cards.push({ id: idx + 1, question: questionLines.join(" "), answer: cleanAnswer });
  });
  return cards;
}

// ─── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ statuses }) {
  const total = statuses.length;
  const clearPct = total > 0 ? (statuses.filter(s => s === "known").length / total) * 100 : 0;
  const laterPct = total > 0 ? (statuses.filter(s => s === "unknown").length / total) * 100 : 0;
  return (
    <div style={S.progressWrap}>
      <div style={S.progressTrack}>
        <div style={{ ...S.progressSeg, width: `${clearPct}%`, background: CLEAR_COLOR }} />
        <div style={{ ...S.progressSeg, width: `${laterPct}%`, background: LATER_COLOR }} />
      </div>
    </div>
  );
}

// ─── How It Works Modal ────────────────────────────────────────────────────────
function HowItWorksModal({ onClose }) {
  const items = [
    { icon: Icon.tap,    text: "Kartaga bosing — javob ochiladi. Yana bosing — savol qaytadi." },
    { icon: Icon.swipeR, text: "O'ngga suring yoki '2' → Tushunarli. Karta o'rganilgan deb belgilanadi." },
    { icon: Icon.swipeL, text: "Chapga suring yoki '1' → Keyinroq. Karta sessiya oxirida qayta keladi." },
    { icon: Icon.repeat, text: "Sessiya oxirida faqat 'Keyinroq' kartalar qayta boshlanadi." },
    { icon: Icon.kb,     text: "Space/Enter — aylantirish. → keyingi, ← oldingi, 1 = Keyinroq, 2 = Tushunarli." },
    { icon: Icon.bolt,   text: "Lifehack: avval hammani 'Keyinroq' qiling. Keyin qiyinlarini takrorlang — 3x tez." },
  ];
  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modalPanel} onClick={e => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <span style={S.modalTitle}>Bu qanday ishlaydi?</span>
          <button style={S.iconCloseBtn} onClick={onClose}>✕</button>
        </div>
        <div style={S.divider} />
        <div style={S.modalBody}>
          {items.map((item, i) => (
            <div key={i} style={S.modalItem}>
              <div style={S.modalItemIcon}>{item.icon}</div>
              <div style={S.modalItemText}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Settings Panel ────────────────────────────────────────────────────────────
function SettingsPanel({ showButtons, onToggle, onClose }) {
  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={{ ...S.modalPanel, maxWidth: 360 }} onClick={e => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <span style={S.modalTitle}>Sozlamalar</span>
          <button style={S.iconCloseBtn} onClick={onClose}>✕</button>
        </div>
        <div style={S.divider} />
        <div style={S.settingsRow}>
          <div>
            <div style={S.settingsLabel}>Tugmalarni ko'rsatish</div>
            <div style={S.settingsSubLabel}>«Keyinroq» va «Tushunarli» tugmalari</div>
          </div>
          <div style={{ ...S.toggle, ...(showButtons ? S.toggleOn : S.toggleOff) }} onClick={onToggle}>
            <div style={{ ...S.toggleThumb, transform: showButtons ? "translateX(22px)" : "translateX(2px)" }} />
          </div>
        </div>
        <div style={S.divider} />
        <div style={S.settingsNote}>
          <strong>Swipe:</strong> O'ngga → Tushunarli · Chapga → Keyinroq
        </div>
      </div>
    </div>
  );
}

// ─── Tip Ticker ────────────────────────────────────────────────────────────────
const TIPS = [
  {
    icon: Icon.target,
    line1: "Maqsadingiz: har bir savolni o'qib, javobini eslab qolish",
    line2: "Agar eslab qolmasangiz, 'Keyinroq' tugmasini bosing — karta qayta keladi",
  },
  {
    icon: Icon.tap,
    line1: "Karta ustiga bosing — to'g'ri javob ko'rsatiladi",
    line2: "Yana bosish orqali savolga qaytishingiz mumkin",
  },
  {
    icon: Icon.swipeR,
    line1: "Javobni bilsangiz kartani o'ngga suring yoki 'Tushunarli' tugmasini bosing",
    line2: "Bu karta o'rganilgan deb belgilanadi va qayta ko'rsatilmaydi",
  },
  {
    icon: Icon.swipeL,
    line1: "Javobni bilmasangiz kartani chapga suring yoki 'Keyinroq' tugmasini bosing",
    line2: "Sessiya oxirida bu karta qayta keladi — bilguningizcha takrorlanadi",
  },
  {
    icon: Icon.repeat,
    line1: "Barcha kartalarni ko'rib chiqqach, 'Keyinroq' belgilanganlar qayta boshlanadi",
    line2: "Bu jarayon barcha kartalar 'Tushunarli' bo'lgunga qadar davom etadi",
  },
  {
    icon: Icon.bolt,
    line1: "Maslahat: birinchi o'tishda hamma kartani 'Keyinroq' deb belgilang",
    line2: "Keyingi o'tishlarda faqat bilmaganlaringizga e'tibor qarating — 3 baravar tezroq",
  },
  {
    icon: Icon.kb,
    line1: "Klaviatura bilan ham foydalanish mumkin: Space yoki Enter — kartani aylantirish",
    line2: "1 tugmasi — Keyinroq, 2 tugmasi — Tushunarli, ← → — oldingi/keyingi karta",
  },
  {
    icon: Icon.bar,
    line1: "Yuqoridagi progress bar o'rganish jarayoningizni ko'rsatadi",
    line2: "Yashil — tushunarli kartalar, sariq — keyinroq, kulrang — hali ko'rilmaganlar",
  },
];

function TipTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % TIPS.length); setVisible(true); }, 500);
    }, 10000);
    return () => clearInterval(timer);
  }, []);
  const tip = TIPS[idx];
  return (
    <div style={S.tipTicker}>
      <span style={S.tipIcon}>{tip.icon}</span>
      <div style={{ ...S.tipLines, opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <div style={S.tipLine1}>{tip.line1}</div>
        <div style={S.tipLine2}>{tip.line2}</div>
      </div>
    </div>
  );
}

// ─── Upload View ───────────────────────────────────────────────────────────────
function UploadView({ onLoad, error }) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  const processFile = useCallback((file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".txt")) {
      onLoad(null, "Faqat .txt formatdagi fayl qabul qilinadi"); return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsed = parseTxtCards(e.target.result);
      if (!parsed.length) onLoad(null, "Faylda to'g'ri formatdagi savollar topilmadi.");
      else onLoad(parsed, null);
    };
    reader.onerror = () => onLoad(null, "Faylni o'qishda xatolik yuz berdi");
    reader.readAsText(file, "UTF-8");
  }, [onLoad]);

  return (
    <div style={S.page}>
      <style>{KEYFRAMES}</style>
      <div style={S.uploadWrap}>
        <h2 style={S.uploadTitle}>Tezkor Karta</h2>
        <p style={S.uploadDesc}>Savollar faylini yuklang va kartochka ko'rinishida o'rganing</p>

        {/* Drop Zone */}
        <div
          style={{ ...S.dropZone, ...(dragging ? S.dropZoneActive : {}) }}
          onDrop={e => { e.preventDefault(); setDragging(false); processFile(e.dataTransfer.files[0]); }}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => fileRef.current?.click()}
        >
          <div style={{ ...S.dropIconWrap, background: dragging ? "rgba(68,96,239,0.12)" : "rgba(68,96,239,0.07)", transform: dragging ? "scale(1.05)" : "scale(1)" }}>
            {dragging ? Icon.upload : Icon.file}
          </div>
          <p style={{ ...S.dropTitle, color: dragging ? BRAND : "#334155" }}>{dragging ? "Qo'yib yuboring!" : ".txt faylni shu yerga tashlang"}</p>
          <p style={S.dropOr}>yoki</p>
          <button style={S.fileBtn} onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}>Fayl tanlash</button>
          <p style={S.dropHint}>Faqat .txt • UTF-8 kodlash</p>
          <input ref={fileRef} type="file" accept=".txt" style={{ display: "none" }} onChange={e => { processFile(e.target.files[0]); e.target.value = ""; }} />
        </div>

        {error && (
          <div style={S.errorBox}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {/* Format box */}
        <div style={S.formatBox}>
          <div style={S.formatHeader}>
            <span style={S.formatIcon}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke={BRAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </span>
            <span style={S.formatLabel}>Fayl formati namunasi</span>
          </div>
          <pre style={S.formatPre}>{`Savol matni shu yerda yoziladi?\nA. Birinchi variant\nB. To'g'ri variant\nC. Uchinchi variant\nD. To'rtinchi variant\nANSWER: B`}</pre>
          <p style={S.formatNote}>💡 Har bir savol <strong>bo'sh qator</strong> bilan ajratilishi kerak</p>
        </div>

        <InfoSection />
      </div>
    </div>
  );
}

// ─── Info Section (responsive 3-col desktop, 2-col tablet, 1-col mobile) ──────
function InfoSection() {
  const items = [
    { icon: Icon.desktop, label: "Kompyuterda", desc: "Space — aylantirish · → keyingi · ← oldingi · 1 = Keyinroq · 2 = Tushunarli" },
    { icon: Icon.mobile,  label: "Telefonda",   desc: "O'ngga suring → Tushunarli · Chapga suring → Keyinroq · Bosing — javob ochiladi" },
    { icon: Icon.target,  label: "Maqsadi",     desc: "«Keyinroq» kartalar sessiya oxirida qayta keladi — to'liq o'rguningizcha" },
    { icon: Icon.repeat,  label: "Spaced Rep",  desc: "Har loop faqat bilmaganlar. Barcha 'Tushunarli' bo'lganda sessiya tugaydi" },
    { icon: Icon.bolt,    label: "Lifehack",    desc: "Birinchi o'tishda hammani 'Keyinroq' qiling. Keyin faqat qiyinlarini o'rganing" },
    { icon: Icon.bar,     label: "Progress",    desc: "Yashil = tushunarli, sariq = keyinroq, kulrang = hali ko'rilmagan kartalar" },
  ];
  return (
    <div style={S.infoSection}>
      <div style={S.infoTitle}>Tezkor Karta qanday ishlaydi?</div>
      <div style={S.infoGrid}>
        {items.map((item, i) => (
          <div key={i} style={S.infoCard}>
            <div style={S.infoCardIcon}>{item.icon}</div>
            <div style={S.infoCardLabel}>{item.label}</div>
            <div style={S.infoCardDesc}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Flashcard() {
  const [cards, setCards] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [statusMap, setStatusMap] = useState({});
  const [flipped, setFlipped] = useState(false);
  const [swipeDir, setSwipeDir] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);
  const [showButtons, setShowButtons] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [loopInfo, setLoopInfo] = useState(null);
  const [sessionQueue, setSessionQueue] = useState([]);
  const [sessionIdx, setSessionIdx] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isAnimating = useRef(false);
  const [cardTimes, setCardTimes] = useState({});
  const [unknownCounts, setUnknownCounts] = useState({});
  const cardStartTime = useRef(null);
  const sessionStartTime = useRef(null);

  const handleLoad = useCallback((parsedCards, error) => {
    if (error) { setUploadError(error); return; }
    setCards(parsedCards);
    setUploadError(null);
    setStatusMap({});
    setSessionQueue(parsedCards.map(c => c.id));
    setSessionIdx(0);
    setLoopCount(1);
    setFlipped(false);
    setCardVisible(true);
    setLoopInfo(null);
    setCardTimes({});
    setUnknownCounts({});
    cardStartTime.current = Date.now();
    sessionStartTime.current = Date.now();
  }, []);

  const resetToUpload = () => {
    setCards(null); setUploadError(null); setStatusMap({});
    setSessionQueue([]); setSessionIdx(0); setLoopCount(0);
    setFlipped(false); setCardVisible(true); setLoopInfo(null);
    setCardTimes({}); setUnknownCounts({});
  };

  if (!cards) return <UploadView onLoad={handleLoad} error={uploadError} />;

  const currentCardId = sessionQueue[sessionIdx];
  const card = cards.find(c => c.id === currentCardId);
  const currentStatus = card ? statusMap[card.id] : undefined;
  const knownCount = Object.values(statusMap).filter(s => s === "known").length;
  const unknownCount = Object.values(statusMap).filter(s => s === "unknown").length;
  const allStatuses = cards.map(c => statusMap[c.id] || "unseen");

  const recordTime = (cardId) => {
    if (!cardStartTime.current) return;
    const elapsed = Date.now() - cardStartTime.current;
    setCardTimes(prev => ({ ...prev, [cardId]: [...(prev[cardId] || []), elapsed] }));
    cardStartTime.current = Date.now();
  };

  const animateTransition = (dir, callback) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setSwipeDir(dir);
    setCardVisible(false);
    setTimeout(() => {
      callback();
      setFlipped(false);
      setSwipeDir(0);
      setCardVisible(true);
      setTimeout(() => { isAnimating.current = false; }, 50);
    }, 420);
  };

  const setStatus = (value) => {
    if (!card || isAnimating.current) return;
    recordTime(card.id);
    if (value === "unknown") {
      setUnknownCounts(prev => ({ ...prev, [card.id]: (prev[card.id] || 0) + 1 }));
    }
    const newStatusMap = { ...statusMap, [card.id]: value };
    const dir = value === "known" ? 1 : -1;
    const nextIdx = sessionIdx + 1;
    setStatusMap(newStatusMap);
    if (nextIdx < sessionQueue.length) {
      animateTransition(dir, () => { setSessionIdx(nextIdx); setLoopInfo(null); });
    } else {
      animateTransition(dir, () => {
        const laterIds = cards.filter(c => newStatusMap[c.id] === "unknown").map(c => c.id);
        if (laterIds.length > 0) {
          setSessionQueue(laterIds); setSessionIdx(0); setLoopCount(lc => lc + 1);
          setLoopInfo(`${laterIds.length} ta «Keyinroq» karta qayta boshlandi`);
        } else {
          setSessionQueue([]); setSessionIdx(0); setLoopInfo("allDone");
        }
      });
    }
  };

  const handleFlip = () => { if (!isAnimating.current) setFlipped(f => !f); };

  const onKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); handleFlip(); }
    else if (e.key === "ArrowRight") {
      const nextIdx = sessionIdx + 1;
      if (nextIdx < sessionQueue.length && !isAnimating.current) {
        recordTime(card?.id);
        animateTransition(1, () => setSessionIdx(nextIdx));
      }
    } else if (e.key === "ArrowLeft") {
      if (sessionIdx > 0 && !isAnimating.current) {
        recordTime(card?.id);
        animateTransition(-1, () => setSessionIdx(sessionIdx - 1));
      }
    } else if (e.key === "1") setStatus("unknown");
    else if (e.key === "2") setStatus("known");
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; touchStartY.current = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 55 && dy < 50) { if (dx > 0) setStatus("known"); else setStatus("unknown"); }
    touchStartX.current = null; touchStartY.current = null;
  };

  const restart = () => {
    setStatusMap({}); setSessionQueue(cards.map(c => c.id)); setSessionIdx(0);
    setLoopCount(1); setFlipped(false); setCardVisible(true); setLoopInfo(null);
    setCardTimes({}); setUnknownCounts({});
    cardStartTime.current = Date.now(); sessionStartTime.current = Date.now();
  };

  const allDone = loopInfo === "allDone" || (sessionQueue.length === 0 && Object.keys(statusMap).length > 0);

  if (allDone) {
    const totalMs = sessionStartTime.current ? Date.now() - sessionStartTime.current : 0;
    return (
      <div style={S.page}>
        <style>{KEYFRAMES}</style>
        <div style={{ width: "100%", maxWidth: 520 }}>
          <div style={S.headerRow}>
            <h2 style={S.title}>Tezkor Karta</h2>
            <button style={S.ghostLink} onClick={resetToUpload}>← Bosh sahifa</button>
          </div>
          <SummaryView
            total={cards.length} known={knownCount} unknown={unknownCount}
            loopCount={loopCount} totalMs={totalMs}
            cardTimes={cardTimes} unknownCounts={unknownCounts} cards={cards}
            onRestart={restart} onNewFile={resetToUpload}
          />
        </div>
      </div>
    );
  }

  const cardOriginalIdx = cards.findIndex(c => c.id === currentCardId);
  const cardAnimStyle = {
    opacity: cardVisible ? 1 : 0,
    transform: cardVisible
      ? "translateX(0) scale(1)"
      : swipeDir === 1
        ? "translateX(90px) scale(0.92) rotate(4deg)"
        : swipeDir === -1
          ? "translateX(-90px) scale(0.92) rotate(-4deg)"
          : "translateX(0) scale(0.95)",
    transition: cardVisible
      ? "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)"
      : "opacity 0.38s cubic-bezier(0.4,0,0.2,1), transform 0.38s cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <div style={S.page}>
      <style>{KEYFRAMES}</style>
      {showSettings && <SettingsPanel showButtons={showButtons} onToggle={() => setShowButtons(v => !v)} onClose={() => setShowSettings(false)} />}
      {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} />}

      <div style={S.headerRow}>
        <div style={S.headerLeft}>
          <h2 style={S.title}>Tezkor Karta</h2>
          <button style={S.howBtn} onClick={() => setShowHowItWorks(true)}>Bu qanday ishlaydi?</button>
        </div>
        <div style={S.headerRight}>
          <div style={S.counter}>
            <span style={S.counterCurrent}>{sessionIdx + 1}</span>
            <span style={S.counterSep}>/</span>
            <span style={S.counterTotal}>{sessionQueue.length}</span>
          </div>
          <button style={S.settingsBtn} onClick={() => setShowSettings(true)} title="Sozlamalar">
            {Icon.settings}
          </button>
        </div>
      </div>

      <div style={S.statsRow}>
        <div style={S.statChip}>
          <div style={{ ...S.statNum, color: LATER_COLOR }}>{unknownCount}</div>
          <div style={S.statLbl}>Keyinroq</div>
        </div>
        <div style={S.statChip}>
          <div style={{ ...S.statNum, color: CLEAR_COLOR }}>{knownCount}</div>
          <div style={S.statLbl}>Tushunarli</div>
        </div>
        <button style={S.finishBtn} onClick={() => setLoopInfo("allDone")}>Yakunlash</button>
      </div>

      <ProgressBar statuses={allStatuses} />

      {loopInfo && loopInfo !== "allDone" && (
        <div style={S.loopInfo}>{Icon.repeat} {loopInfo}</div>
      )}

      {card && (
        <div style={S.cardOuter}>
          <div style={S.cardLabel}>{flipped ? "Javob" : "Savol"}</div>
          <div
            style={{ ...S.cardWrap, ...cardAnimStyle }}
            tabIndex={0} role="button" aria-pressed={flipped}
            onKeyDown={onKeyDown} onClick={handleFlip}
            onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
          >
            <div style={{ ...S.cardInner, transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
              {/* FRONT */}
              <div style={{
                ...S.cardFace,
                ...(currentStatus === "known" ? S.cardFaceKnown : {}),
                ...(currentStatus === "unknown" ? S.cardFaceUnknown : {}),
              }}>
                <div style={S.cardFaceTop}>
                  {currentStatus && (
                    <span style={{ ...S.statusBadge, ...(currentStatus === "known" ? S.statusBadgeKnown : S.statusBadgeUnknown) }}>
                      {currentStatus === "known" ? <>{Icon.known} Tushunarli</> : <>{Icon.later} Keyinroq</>}
                    </span>
                  )}
                </div>
                <p style={S.questionText}>{card.question}</p>
                <div style={S.flipHint}>{Icon.tap} Bosing — javob ochiladi</div>
              </div>
              {/* BACK */}
              <div style={{ ...S.cardFace, ...S.cardFaceBack }}>
                <div style={S.cardFaceTop} />
                <p style={S.answerText}>{card.answer}</p>
                <div style={S.flipHint}>{Icon.flip} Bosing — savol qaytadi</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showButtons && card && (
        <div style={S.knowRow}>
          <button
            style={{ ...S.knowBtn, ...S.knowBtnLater }}
            onClick={e => { e.stopPropagation(); setStatus("unknown"); }}
          >
            <span style={S.btnIcon}>{Icon.later}</span>
            <span>Keyinroq</span>
          </button>
          <button
            style={{ ...S.knowBtn, ...S.knowBtnClear }}
            onClick={e => { e.stopPropagation(); setStatus("known"); }}
          >
            <span style={S.btnIcon}>{Icon.known}</span>
            <span>Tushunarli</span>
          </button>
        </div>
      )}

      <TipTicker />
    </div>
  );
}

// ─── Summary ───────────────────────────────────────────────────────────────────
function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s} son`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem > 0 ? `${m} daq ${rem} son` : `${m} daq`;
}

// ─── Motivational Quotes ───────────────────────────────────────────────────────
const QUOTES = [
  { text: "Ilm o'rganish — hayotning eng yaxshi sarmoyasi.", author: "Benjamin Franklin" },
  { text: "Muvaffaqiyat — bu har kuni biroz yaxshilanishdir.", author: "Albert Einstein" },
  { text: "Bilim — bu quvvat. Lekin amalda qo'llangan bilim — bu haqiqiy quvvat.", author: "Francis Bacon" },
  { text: "Qiyinchilik — bu imkoniyatning boshqa nomi.", author: "Albert Einstein" },
  { text: "O'rganishni hech qachon to'xtatamaslik — bu hayotning eng katta sirri.", author: "Henry Ford" },
  { text: "Har bir mutaxassis bir vaqtlar yangi boshlagan edi. Davom eting.", author: "Helen Hayes" },
  { text: "Maqsadingiz yo'lida qilingan har bir qadam — g'alabadir.", author: "Nelson Mandela" },
  { text: "Ilm — tun zulmatida nur beruvchi mashʼal.", author: "Muhammad ibn Muso al-Xorazmiy" },
  { text: "Boshqarishdan ko'ra, birinchi o'zingni boshqarishni o'rgan.", author: "Sokrat" },
  { text: "Qoʻrqmaslik — bu eng kuchli yoʻldosh. Urinib ko'ring, xato qilish ham tajribadir.", author: "Konfutsiy" },
];

// ─── Grade Meter ────────────────────────────────────────────────────────────────
function GradeMeter({ percent }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 180); return () => clearTimeout(t); }, []);

  const grades = [
    { label: "D",  min: 0,  max: 39,  color: "#ef4444", note: "Kuchli urinish kerak — A+ ga intiling!" },
    { label: "C",  min: 40, max: 59,  color: "#f59e0b", note: "Yaxshi boshlanish — yana bir loop urining" },
    { label: "B",  min: 60, max: 79,  color: "#4460ef", note: "Zo'r natija — biroz mashq bilan A mumkin" },
    { label: "A",  min: 80, max: 94,  color: "#10b981", note: "Ajoyib! A+ uchun oxirgilarini takrorlang" },
    { label: "A+", min: 95, max: 100, color: "#059669", note: "Mukammal! Barcha kartalar o'zlashtirildi" },
  ];
  const activeIdx = grades.findIndex(g => percent >= g.min && percent <= g.max);
  const activeGrade = grades[activeIdx];

  return (
    <div>
      {/* Bars */}
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", justifyContent: "center", padding: "12px 0 6px" }}>
        {grades.map((g, i) => {
          const isActive = i === activeIdx;
          const isPast = i < activeIdx;
          const baseH = 28 + i * 9;
          const h = animated ? (isActive ? baseH + 30 : baseH) : 14;
          return (
            <div key={g.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: isActive ? 48 : 34,
                height: h,
                borderRadius: isActive ? 10 : 7,
                background: isActive ? g.color : isPast ? g.color : "#e8ecf4",
                opacity: isActive ? 1 : isPast ? 0.4 : 0.25,
                transition: `all 0.65s cubic-bezier(0.34,1.56,0.64,1) ${0.04 * i}s`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {isActive && (
                  <span style={{ color: "#fff", fontWeight: 900, fontSize: 14, fontFamily: "Nunito,sans-serif" }}>{g.label}</span>
                )}
              </div>
              <span style={{
                fontSize: isActive ? 12 : 9,
                fontWeight: isActive ? 900 : 600,
                color: isActive ? g.color : "#b0bac9",
                transition: "all 0.4s ease",
                lineHeight: 1,
              }}>{g.label}</span>
            </div>
          );
        })}
      </div>
      {/* Grade note */}
      {activeGrade && (
        <div style={{
          textAlign: "center", fontSize: 12, fontWeight: 700,
          color: activeGrade.color, marginTop: 4, marginBottom: 2,
          opacity: animated ? 1 : 0, transition: "opacity 0.5s ease 0.4s",
        }}>
          {activeGrade.note}
        </div>
      )}
    </div>
  );
}

function SummaryView({ total, known, unknown, loopCount, totalMs, cardTimes, unknownCounts, cards, onRestart, onNewFile }) {
  const [visIdx, setVisIdx] = useState(-1);
  useEffect(() => {
    [0, 1, 2, 3, 4].forEach(i => setTimeout(() => setVisIdx(i), 100 + i * 100));
  }, []);

  const percent = total > 0 ? Math.round((known / total) * 100) : 0;

  // Pick a random quote once
  const quote = useRef(QUOTES[Math.floor(Math.random() * QUOTES.length)]).current;

  const avgTimes = {};
  Object.entries(cardTimes).forEach(([id, times]) => {
    avgTimes[id] = times.reduce((a, b) => a + b, 0) / times.length;
  });
  const sortedByTime = Object.entries(avgTimes).sort((a, b) => b[1] - a[1]);
  const slowestId = sortedByTime[0]?.[0];
  const fastestId = sortedByTime[sortedByTime.length - 1]?.[0];
  const sortedByUnknown = Object.entries(unknownCounts).sort((a, b) => b[1] - a[1]);
  const hardestId = sortedByUnknown[0]?.[0];
  const getCard = id => cards.find(c => String(c.id) === String(id));

  const insights = [
    slowestId && {
      icon: Icon.turtle, label: "Eng ko'p vaqt ketgan",
      text: getCard(slowestId)?.question.slice(0, 60),
      extra: formatTime(avgTimes[slowestId] || 0), color: "#f59e0b",
    },
    fastestId && fastestId !== slowestId && {
      icon: Icon.bolt, label: "Eng tez javob",
      text: getCard(fastestId)?.question.slice(0, 60),
      extra: formatTime(avgTimes[fastestId] || 0), color: CLEAR_COLOR,
    },
    hardestId && {
      icon: Icon.brain, label: "Eng qiyin karta",
      text: getCard(hardestId)?.question.slice(0, 60),
      extra: `${unknownCounts[hardestId] || 0}× keyinroq`, color: "#ef4444",
    },
  ].filter(Boolean);

  const sec = (i) => ({
    ...S.summarySection,
    opacity: visIdx >= i ? 1 : 0,
    transform: visIdx >= i ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.48s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
  });

  return (
    <div style={S.summaryWrap}>

      {/* Grade + Score */}
      <div style={sec(0)}>
        <GradeMeter percent={percent} />
        <div style={S.scoreDividerH} />
        <div style={S.scoreRow}>
          <div style={S.scoreItem}>
            <div style={S.scoreBig}>{percent}<span style={S.scorePct}>%</span></div>
            <div style={S.scoreLabel}>Natija</div>
          </div>
          <div style={S.scoreDividerV} />
          <div style={S.scoreItem}>
            <div style={{ ...S.scoreBig, fontSize: "1.45rem", color: "#334155" }}>{formatTime(totalMs)}</div>
            <div style={S.scoreLabel}>Umumiy vaqt</div>
          </div>
          <div style={S.scoreDividerV} />
          <div style={S.scoreItem}>
            <div style={{ ...S.scoreBig, fontSize: "1.45rem", color: "#334155" }}>{loopCount}</div>
            <div style={S.scoreLabel}>Loop soni</div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ ...sec(1), ...S.statsGrid4 }}>
        {[
          { icon: Icon.known,  val: known,   lbl: "Tushunarli", color: CLEAR_COLOR },
          { icon: Icon.later,  val: unknown,  lbl: "Keyinroq",   color: LATER_COLOR },
          { icon: Icon.trophy, val: total,    lbl: "Jami karta",  color: BRAND },
          { icon: Icon.clock,  val: total > 0 ? formatTime(Math.round(totalMs / total)) : "—", lbl: "Avg/karta", color: "#8b5cf6" },
        ].map((item, i) => (
          <div key={i} style={S.statGridItem}>
            <div style={{ ...S.statGridIcon, color: item.color }}>{item.icon}</div>
            <div style={{ ...S.statGridValue, color: item.color }}>{item.val}</div>
            <div style={S.statGridLabel}>{item.lbl}</div>
          </div>
        ))}
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div style={sec(2)}>
          <div style={S.sectionTitle}>
            <span style={S.sectionTitleIcon}>{Icon.bar}</span> Tahlil
          </div>
          <div style={S.insightList}>
            {insights.map((item, i) => (
              <div key={i} style={S.insightItem}>
                <div style={{ ...S.insightIconWrap, color: item.color }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={S.insightLabel}>{item.label}</div>
                  <div style={S.insightText}>{item.text}{(item.text?.length ?? 0) >= 60 ? "…" : ""}</div>
                </div>
                <div style={{ ...S.insightExtra, color: item.color }}>{item.extra}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivational quote */}
      <div style={sec(3)}>
        <div style={S.quoteCard}>
          <div style={S.quoteIcon}>"</div>
          <p style={S.quoteText}>{quote.text}</p>
          <div style={S.quoteAuthor}>— {quote.author}</div>
        </div>
      </div>

      {/* Actions */}
      <div style={sec(4)}>
        <div style={S.summaryActions}>
          <button style={S.restartBtn} onClick={onRestart}>
            <span style={S.btnIcon}>{Icon.repeat}</span>
            <span>Boshidan boshlash</span>
          </button>
          <button style={S.newFileBtn} onClick={onNewFile}>
            <span style={S.btnIcon}>{Icon.file}</span>
            <span>Yangi fayl</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Keyframes ─────────────────────────────────────────────────────────────────
const KEYFRAMES = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');
@keyframes tq-fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
* { box-sizing: border-box; }
button { transition: opacity 0.15s ease, transform 0.15s ease; cursor: pointer; }
button:hover { opacity: 0.85; }
button:active { transform: scale(0.96) !important; }

/* Responsive info grid */
.tq-info-grid { display: grid; gap: 12px; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 700px) { .tq-info-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 440px) { .tq-info-grid { grid-template-columns: 1fr; } }
`;

// ─── Styles ────────────────────────────────────────────────────────────────────
const S = {
  page: {
    fontFamily: "'Nunito','Roboto','Segoe UI',sans-serif",
    background: "#FAFAFA",
    minHeight: "100vh",
    padding: "24px 16px 60px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },

  // ── Upload ──
  uploadWrap: { width: "100%", maxWidth: 720 },
  uploadTitle: { fontSize: "2rem", fontWeight: 900, color: "#1e2a4a", margin: "0 0 8px", letterSpacing: "-0.5px" },
  uploadDesc: { fontSize: 14, color: "#64748b", fontWeight: 600, margin: "0 0 20px" },
  dropZone: {
    width: "100%", border: "2px dashed #c7d2fe", borderRadius: 20, padding: "36px 28px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
    cursor: "pointer", background: "#ffffff", transition: "all 0.22s ease", marginBottom: 14,
  },
  dropZoneActive: { borderColor: BRAND, borderStyle: "solid", background: "#f0f4ff", transform: "scale(1.01)" },
  dropIconWrap: { width: 68, height: 68, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6, transition: "all 0.22s ease", color: BRAND },
  dropTitle: { fontSize: 15, fontWeight: 700, margin: 0, textAlign: "center" },
  dropOr: { fontSize: 11, color: "#94a3b8", margin: 0, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" },
  fileBtn: { background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`, color: "#fff", border: "none", padding: "10px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "inherit", boxShadow: "0 4px 14px rgba(68,96,239,0.30)" },
  dropHint: { fontSize: 11, color: "#94a3b8", margin: "2px 0 0", fontWeight: 700 },
  errorBox: { width: "100%", background: "#fef2f2", border: "1.5px solid #fecaca", borderRadius: 12, padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#dc2626", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 },
  formatBox: { width: "100%", background: "#ffffff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "16px 18px", marginBottom: 32 },
  formatHeader: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 },
  formatIcon: { width: 26, height: 26, borderRadius: 7, background: BRAND_BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formatLabel: { fontSize: 12, fontWeight: 800, color: BRAND, textTransform: "uppercase", letterSpacing: "0.5px" },
  formatPre: { margin: 0, fontSize: 12, lineHeight: 1.9, color: "#334155", background: "#f8fafc", borderRadius: 10, padding: "12px 14px", fontFamily: "'Courier New', monospace", whiteSpace: "pre-wrap", borderLeft: `3px solid ${BRAND}` },
  formatNote: { fontSize: 12, color: "#64748b", margin: "10px 0 0", fontWeight: 600 },

  // ── Info section ──
  infoSection: { width: "100%", marginBottom: 20 },
  infoTitle: { fontSize: 16, fontWeight: 800, color: "#1e2a4a", marginBottom: 14, letterSpacing: "-0.2px" },
  infoGrid: { display: "grid", gap: 12, gridTemplateColumns: "repeat(3, 1fr)" },
  infoCard: { background: "#ffffff", borderRadius: 16, padding: "18px 16px", border: "1.5px solid #e2e8f0", boxShadow: "0 2px 8px rgba(68,96,239,0.05)" },
  infoCardIcon: { color: BRAND, marginBottom: 10, display: "flex" },
  infoCardLabel: { fontSize: 13, fontWeight: 800, color: "#1e2a4a", marginBottom: 6 },
  infoCardDesc: { fontSize: 12, color: "#64748b", fontWeight: 600, lineHeight: 1.6 },

  // ── Header ──
  headerRow: { width: "100%", maxWidth: 520, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  headerLeft: { display: "flex", alignItems: "center", gap: 10 },
  title: { fontSize: "1.2rem", fontWeight: 900, color: "#1e2a4a", margin: 0, letterSpacing: "-0.3px" },
  howBtn: { fontSize: 11, fontWeight: 700, color: BRAND, background: BRAND_BG, border: "none", padding: "5px 10px", borderRadius: 8, fontFamily: "inherit", whiteSpace: "nowrap" },
  ghostLink: { fontSize: 12, fontWeight: 700, color: "#94a3b8", background: "none", border: "none", fontFamily: "inherit" },
  headerRight: { display: "flex", alignItems: "center", gap: 8 },
  counter: { display: "flex", alignItems: "baseline", gap: 2, background: "#ffffff", padding: "5px 12px", borderRadius: 20, boxShadow: "0 2px 10px rgba(68,96,239,0.10)" },
  counterCurrent: { fontSize: 15, fontWeight: 800, color: BRAND },
  counterSep: { fontSize: 13, fontWeight: 700, color: "#cbd5e1", margin: "0 1px" },
  counterTotal: { fontSize: 13, fontWeight: 700, color: "#94a3b8" },
  settingsBtn: { width: 36, height: 36, borderRadius: 10, border: "none", background: "#ffffff", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(68,96,239,0.10)" },

  // ── Stats row ──
  statsRow: { width: "100%", maxWidth: 520, display: "flex", gap: 8, marginBottom: 12 },
  statChip: { flex: 1, background: "#ffffff", borderRadius: 12, padding: "10px 0", textAlign: "center", boxShadow: "0 2px 8px rgba(68,96,239,0.06)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  finishBtn: { flex: 1, fontSize: 13, fontWeight: 800, color: "#64748b", background: "#ffffff", border: "none", borderRadius: 12, fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(68,96,239,0.06)", padding: "10px 0", display: "flex", alignItems: "center", justifyContent: "center" },
  statNum: { fontSize: 18, fontWeight: 900, lineHeight: 1.1 },
  statLbl: { fontSize: 10, fontWeight: 700, color: "#94a3b8", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.3px" },

  // ── Progress ──
  progressWrap: { width: "100%", maxWidth: 520, marginBottom: 14 },
  progressTrack: { width: "100%", height: 4, background: "rgba(68,96,239,0.10)", display: "flex", overflow: "hidden", borderRadius: 10 },
  progressSeg: { height: "100%", borderRadius: 10, transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)" },

  // ── Loop info ──
  loopInfo: { width: "100%", maxWidth: 520, background: "rgba(245,158,11,0.08)", borderRadius: 10, padding: "9px 14px", fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 12, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 },

  // ── Card ──
  cardOuter: { width: "100%", maxWidth: 520, display: "flex", flexDirection: "column" },
  cardLabel: { fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6, paddingLeft: 2 },
  cardWrap: { width: "100%", aspectRatio: "4/5", maxHeight: 440, cursor: "pointer", perspective: 1200, outline: "none", willChange: "transform, opacity" },
  cardInner: { position: "relative", width: "100%", height: "100%", transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)", transformStyle: "preserve-3d" },
  cardFace: {
    position: "absolute", inset: 0, borderRadius: 22, backfaceVisibility: "hidden",
    display: "flex", flexDirection: "column", justifyContent: "space-between",
    padding: "24px 24px", background: "#FAFAFA",
    boxShadow: "0 8px 32px rgba(68,96,239,0.09), 0 2px 8px rgba(0,0,0,0.04)",
    transition: "box-shadow 0.25s ease",
  },
  cardFaceKnown: { boxShadow: `0 8px 32px rgba(58,170,53,0.16)` },
  cardFaceUnknown: { boxShadow: `0 8px 32px rgba(200,168,0,0.16)` },
  cardFaceBack: { background: "#FFFFF0", transform: "rotateY(180deg)", boxShadow: "0 8px 24px rgba(200,200,0,0.07)" },
  cardFaceTop: { display: "flex", alignItems: "center", justifyContent: "flex-end", minHeight: 28 },
  statusBadge: { fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 },
  statusBadgeKnown: { background: CLEAR_BG, color: CLEAR_COLOR },
  statusBadgeUnknown: { background: LATER_BG, color: LATER_COLOR },
  questionText: { fontSize: "1.2rem", fontWeight: 700, color: "#1e293b", lineHeight: 1.6, margin: "12px 0", flex: 1, display: "flex", alignItems: "center" },
  answerText: { fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.65, margin: "12px 0", flex: 1, display: "flex", alignItems: "center", color: "#374151" },
  flipHint: { fontSize: 11, fontWeight: 600, color: "#b0b8c8", display: "flex", alignItems: "center", gap: 5 },

  // ── Buttons ──
  knowRow: { width: "100%", maxWidth: 520, display: "flex", gap: 10, marginTop: 12 },
  knowBtn: {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
    gap: 8, padding: "14px 16px", borderRadius: 14, fontSize: 14, fontWeight: 800,
    border: "none", fontFamily: "inherit", transition: "all 0.18s ease",
  },
  btnIcon: { display: "flex", alignItems: "center", flexShrink: 0 },
  knowBtnLater: { background: LATER_BG, color: LATER_COLOR },
  knowBtnLaterActive: { background: LATER_BG, color: LATER_COLOR },
  knowBtnClear: { background: CLEAR_BG, color: CLEAR_COLOR },
  knowBtnClearActive: { background: CLEAR_BG, color: CLEAR_COLOR },

  // ── Tip Ticker ──
  tipTicker: { width: "100%", maxWidth: 520, marginTop: 16, background: "#ffffff", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 10, boxShadow: "0 2px 8px rgba(68,96,239,0.05)", minHeight: 56 },
  tipIcon: { color: BRAND, flexShrink: 0, marginTop: 2, display: "flex" },
  tipLines: { flex: 1 },
  tipLine1: { fontSize: 12, fontWeight: 700, color: "#475569", lineHeight: 1.4 },
  tipLine2: { fontSize: 11, fontWeight: 600, color: "#94a3b8", lineHeight: 1.4, marginTop: 2 },

  // ── Modals ──
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)", padding: 20 },
  modalPanel: { background: "#ffffff", borderRadius: 22, padding: "24px 24px 20px", width: "100%", maxWidth: 400, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.18)" },
  modalHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  modalTitle: { fontSize: 16, fontWeight: 900, color: "#1e2a4a" },
  iconCloseBtn: { width: 30, height: 30, borderRadius: 8, border: "none", background: "#f1f5f9", color: "#64748b", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" },
  divider: { height: 1, background: "#f1f5f9", margin: "0 0 16px" },
  modalBody: { display: "flex", flexDirection: "column", gap: 8 },
  modalItem: { display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", background: "#f8fafc", borderRadius: 12 },
  modalItemIcon: { color: BRAND, flexShrink: 0, display: "flex" },
  modalItemText: { fontSize: 13, color: "#334155", fontWeight: 600, lineHeight: 1.55 },

  // ── Settings ──
  settingsRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 16 },
  settingsLabel: { fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 2 },
  settingsSubLabel: { fontSize: 12, color: "#94a3b8", fontWeight: 600 },
  toggle: { width: 48, height: 26, borderRadius: 13, position: "relative", transition: "background 0.25s ease", flexShrink: 0 },
  toggleOn: { background: BRAND },
  toggleOff: { background: "#e2e8f0" },
  toggleThumb: { position: "absolute", top: 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" },
  settingsNote: { fontSize: 12, color: "#64748b", fontWeight: 600, background: BRAND_BG, borderRadius: 10, padding: "10px 12px", lineHeight: 1.6 },

  // ── Summary ──
  summaryWrap: { width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", gap: 12 },
  summarySection: { background: "#ffffff", borderRadius: 18, padding: "20px", border: "1.5px solid #e8ecf4", boxShadow: "0 2px 12px rgba(68,96,239,0.05)" },
  scoreDividerH: { height: 1, background: "#f0f4fa", margin: "14px 0 0" },
  scoreRow: { display: "flex", alignItems: "center", justifyContent: "space-around", gap: 8, paddingTop: 16 },
  scoreItem: { textAlign: "center", flex: 1, padding: "0 4px" },
  scoreDividerV: { width: 1, height: 40, background: "#e8ecf4", flexShrink: 0 },
  scoreBig: { fontSize: "1.85rem", fontWeight: 900, color: BRAND, lineHeight: 1 },
  scorePct: { fontSize: "0.95rem", fontWeight: 700, color: "#94a3b8" },
  scoreLabel: { fontSize: 10, fontWeight: 700, color: "#94a3b8", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.3px" },

  statsGrid4: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, padding: "16px", background: "#ffffff", borderRadius: 18, border: "1.5px solid #e8ecf4", boxShadow: "0 2px 12px rgba(68,96,239,0.05)" },
  statGridItem: { textAlign: "center", padding: "12px 6px", background: "#f8fafc", borderRadius: 12 },
  statGridIcon: { display: "flex", justifyContent: "center", marginBottom: 6 },
  statGridValue: { fontSize: "1.1rem", fontWeight: 900, lineHeight: 1.1 },
  statGridLabel: { fontSize: 10, fontWeight: 700, color: "#64748b", marginTop: 4 },

  sectionTitle: { fontSize: 12, fontWeight: 800, color: "#94a3b8", marginBottom: 10, display: "flex", alignItems: "center", gap: 6, textTransform: "uppercase", letterSpacing: "0.4px" },
  sectionTitleIcon: { display: "flex", alignItems: "center" },
  insightList: { display: "flex", flexDirection: "column", gap: 8 },
  insightItem: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, padding: "11px 13px", background: "#f8fafc", borderRadius: 11 },
  insightIconWrap: { display: "flex", flexShrink: 0, marginTop: 1 },
  insightLabel: { fontSize: 10, fontWeight: 700, color: "#94a3b8", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.2px" },
  insightText: { fontSize: 12, fontWeight: 700, color: "#334155", lineHeight: 1.5 },
  insightExtra: { fontSize: 12, fontWeight: 800, whiteSpace: "nowrap", flexShrink: 0, paddingTop: 2 },

  // ── Quote card ──
  quoteCard: { background: "#f8faff", borderRadius: 14, padding: "18px 20px", border: "1px solid #e0e7ff", position: "relative" },
  quoteIcon: { fontSize: 36, fontWeight: 900, color: "#c7d2fe", lineHeight: 1, marginBottom: 4, fontFamily: "Georgia, serif" },
  quoteText: { fontSize: 14, fontWeight: 700, color: "#334155", lineHeight: 1.65, margin: "0 0 10px", fontStyle: "italic" },
  quoteAuthor: { fontSize: 12, fontWeight: 800, color: BRAND },

  // ── Summary actions ──
  summaryActions: { display: "flex", gap: 10 },
  restartBtn: {
    flex: 2, background: BRAND, color: "#fff", border: "none",
    padding: "14px 20px", borderRadius: 13, fontSize: 14, fontWeight: 800,
    fontFamily: "inherit", boxShadow: "0 4px 14px rgba(68,96,239,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  },
  newFileBtn: {
    flex: 1, background: "#f1f5f9", color: "#64748b", border: "none",
    padding: "14px 16px", borderRadius: 13, fontSize: 13, fontWeight: 700,
    fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
  },
};
