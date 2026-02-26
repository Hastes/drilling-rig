"use client";

import { useEffect, useRef, useState } from "react";

// SVG illustrations per step
const illustrations = [
  // 01 — Normatives: document with checkmarks
  <svg key="01" viewBox="0 0 320 280" fill="none" className="w-full h-full">
    <rect x="60" y="20" width="200" height="240" rx="12" fill="#D9E0E7" opacity="0.4"/>
    <rect x="80" y="40" width="160" height="200" rx="8" fill="white"/>
    <rect x="100" y="72" width="120" height="8" rx="3" fill="#8EA9C3" opacity="0.5"/>
    <rect x="100" y="90" width="90" height="6" rx="2" fill="#D9E0E7"/>
    <rect x="100" y="106" width="110" height="6" rx="2" fill="#D9E0E7"/>
    <rect x="100" y="138" width="100" height="6" rx="2" fill="#D9E0E7"/>
    <rect x="100" y="154" width="80" height="6" rx="2" fill="#D9E0E7"/>
    <rect x="100" y="170" width="110" height="6" rx="2" fill="#D9E0E7"/>
    <circle cx="220" cy="196" r="32" fill="#3F5E7B" opacity="0.15"/>
    <circle cx="220" cy="196" r="24" fill="#3F5E7B" opacity="0.2"/>
    <polyline points="208,196 216,206 234,186" stroke="#1E3146" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <rect x="100" y="60" width="60" height="10" rx="3" fill="#1E3146" opacity="0.6"/>
  </svg>,
  // 02 — Full cycle: arrows chain
  <svg key="02" viewBox="0 0 320 280" fill="none" className="w-full h-full">
    <circle cx="60" cy="140" r="32" fill="#D9E0E7" opacity="0.6"/>
    <circle cx="60" cy="140" r="22" fill="white" stroke="#8EA9C3" strokeWidth="1.5"/>
    <path d="M50 140 L56 134 M50 140 L56 146" stroke="#3F5E7B" strokeWidth="2" strokeLinecap="round"/>
    <path d="M52 140h16" stroke="#3F5E7B" strokeWidth="2" strokeLinecap="round"/>
    <path d="M82 140 L130 140" stroke="#3F5E7B" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5"/>
    <circle cx="152" cy="140" r="22" fill="white" stroke="#8EA9C3" strokeWidth="1.5"/>
    <path d="M144 148 L152 132 L160 148" stroke="#3F5E7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M174 140 L222 140" stroke="#3F5E7B" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5"/>
    <circle cx="244" cy="140" r="22" fill="white" stroke="#8EA9C3" strokeWidth="1.5"/>
    <rect x="234" y="132" width="20" height="16" rx="2" stroke="#3F5E7B" strokeWidth="1.5" fill="none"/>
    <path d="M238 138h12M238 144h8" stroke="#3F5E7B" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M266 140 L294 140" stroke="#3F5E7B" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5"/>
    <text x="44" y="186" fontSize="10" fill="#8EA9C3" fontFamily="system-ui">Выезд</text>
    <text x="130" y="186" fontSize="10" fill="#8EA9C3" fontFamily="system-ui">Бурение</text>
    <text x="218" y="186" fontSize="10" fill="#8EA9C3" fontFamily="system-ui">Лаборатория</text>
    {/* Drill icon in circle 2 */}
    <line x1="148" y1="148" x2="156" y2="148" stroke="#3F5E7B" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="260" cy="80" r="40" fill="#8EA9C3" opacity="0.08"/>
    <circle cx="70" cy="60" r="20" fill="#3F5E7B" opacity="0.05"/>
  </svg>,
  // 03 — Team: 3 people silhouettes
  <svg key="03" viewBox="0 0 320 280" fill="none" className="w-full h-full">
    <circle cx="160" cy="90" r="36" fill="#D9E0E7" opacity="0.5"/>
    <circle cx="160" cy="82" r="20" fill="white" stroke="#8EA9C3" strokeWidth="1.5"/>
    <path d="M124 148 Q124 120 160 120 Q196 120 196 148" stroke="#8EA9C3" strokeWidth="1.5" fill="#D9E0E7" opacity="0.4"/>
    <circle cx="80" cy="110" r="28" fill="#D9E0E7" opacity="0.3"/>
    <circle cx="80" cy="104" r="16" fill="white" stroke="#8EA9C3" strokeWidth="1"/>
    <path d="M54 156 Q54 134 80 134 Q106 134 106 156" stroke="#8EA9C3" strokeWidth="1" fill="#D9E0E7" opacity="0.3"/>
    <circle cx="240" cy="110" r="28" fill="#D9E0E7" opacity="0.3"/>
    <circle cx="240" cy="104" r="16" fill="white" stroke="#8EA9C3" strokeWidth="1"/>
    <path d="M214 156 Q214 134 240 134 Q266 134 266 156" stroke="#8EA9C3" strokeWidth="1" fill="#D9E0E7" opacity="0.3"/>
    <text x="136" y="220" fontSize="10" fill="#8EA9C3" fontFamily="system-ui">Инженер-геолог</text>
    <text x="36" y="220" fontSize="9" fill="#8EA9C3" fontFamily="system-ui">Буровой мастер</text>
    <text x="206" y="220" fontSize="9.5" fill="#8EA9C3" fontFamily="system-ui">Лаборант</text>
    <circle cx="160" cy="160" r="50" fill="#3F5E7B" opacity="0.04"/>
  </svg>,
  // 04 — Quality control: checklist
  <svg key="04" viewBox="0 0 320 280" fill="none" className="w-full h-full">
    <rect x="80" y="30" width="160" height="220" rx="10" fill="#D9E0E7" opacity="0.3"/>
    <rect x="90" y="40" width="140" height="200" rx="8" fill="white" stroke="#D9E0E7" strokeWidth="1"/>
    {[0,1,2,3,4].map((i) => (
      <g key={i} transform={`translate(0, ${i * 34})`}>
        <rect x="108" y="58" width="14" height="14" rx="3" fill={i < 3 ? "#1E3146" : "none"} stroke="#8EA9C3" strokeWidth="1.5" opacity={i < 3 ? 0.8 : 0.4}/>
        {i < 3 && <polyline points="111,65 114,68 121,61" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>}
        <rect x="130" y="61" width={i < 3 ? 80 : 60} height="7" rx="2" fill={i < 3 ? "#8EA9C3" : "#D9E0E7"} opacity={i < 3 ? 0.6 : 0.4}/>
      </g>
    ))}
    <circle cx="232" cy="200" r="28" fill="#3F5E7B" opacity="0.1"/>
    <circle cx="232" cy="200" r="20" fill="#3F5E7B" opacity="0.12"/>
    <polyline points="222,200 228,206 242,192" stroke="#1E3146" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>,
];

const approachItems = [
  {
    num: "01",
    title: "Работаем строго по нормативам",
    description:
      "Все буровые работы выполняются в соответствии с действующими СНиП, ГОСТ и техническими регламентами. Применяем актуальные методики исследований, результаты оформляем по установленным стандартам.",
    tag: "Нормативы",
    detail: "СНиП · ГОСТ · Технические регламенты",
  },
  {
    num: "02",
    title: "Комплексный подход",
    description:
      "От выезда на объект и бурения до лабораторных испытаний грунтов и подготовки технического заключения — всё выполняем собственными силами, без субподрядчиков.",
    tag: "Полный цикл",
    detail: "Выезд → Бурение → Лаборатория → Отчёт",
  },
  {
    num: "03",
    title: "Квалифицированные специалисты",
    description:
      "В штате — инженеры-геологи, буровые мастера, лаборанты с профильным образованием и опытом работы на сложных объектах.",
    tag: "Команда",
    detail: "Инженеры-геологи · Буровые мастера · Лаборанты",
  },
  {
    num: "04",
    title: "Контроль качества на каждом этапе",
    description:
      "Документируем процесс бурения, ведём полевые журналы, соблюдаем технологию отбора проб и их транспортировки.",
    tag: "Качество",
    detail: "Полевые журналы · Протоколы испытаний · Архив",
  },
];

export function WorkApproach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalScroll = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const index = Math.min(
        approachItems.length - 1,
        Math.floor(progress * approachItems.length)
      );
      setActiveIndex(index);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const active = approachItems[activeIndex];

  return (
    <div
      ref={sectionRef}
      style={{ height: `${approachItems.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-white flex flex-col">

        {/* Background grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" style={{ pointerEvents: "none" }}>
          <defs>
            <pattern id="wa-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E3146" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wa-grid)"/>
        </svg>

        {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-palette-100 z-20">
            <div
              className="h-full bg-palette-800 transition-all duration-500"
            style={{ width: `${((activeIndex + 1) / approachItems.length) * 100}%` }}
          />
        </div>

        <div className="container-section relative z-10 flex flex-col h-full py-16 w-full">

          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-palette-900">
              Подход к работе
            </h2>
            <div className="flex items-center gap-3 mt-3">
              {approachItems.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === activeIndex ? 24 : 6,
                    height: 6,
                    background: i === activeIndex ? "#1E3146" : "rgba(30,49,70,0.15)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 pb-8 flex-1">

            {/* Left — illustration */}
            <div className="lg:w-5/12 flex-shrink-0 flex items-center justify-center">
              <div
                key={active.num + "-ill"}
                className="w-full max-w-xs"
                style={{ animation: "fadeUp 0.5s ease 0.05s both" }}
              >
                {illustrations[activeIndex]}
              </div>
            </div>

            {/* Right — text */}
            <div className="lg:w-7/12">
              <span
                key={active.tag + "tag"}
                className="inline-block text-xs font-medium text-palette-800 border border-palette-900/20 rounded-full px-4 py-1.5 mb-6 tracking-widest uppercase"
                style={{ animation: "fadeUp 0.5s ease 0.05s both" }}
              >
                {active.tag}
              </span>
              <h3
                key={active.title}
                className="font-bold text-palette-900 mb-6"
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                  lineHeight: 1.2,
                  animation: "fadeUp 0.5s ease 0.1s both",
                }}
              >
                {active.title}
              </h3>
              <p
                key={active.description}
                className="text-palette-800 text-lg leading-relaxed mb-8 max-w-xl"
                style={{ animation: "fadeUp 0.5s ease 0.15s both" }}
              >
                {active.description}
              </p>
              <div
                key={active.detail}
                className="text-palette-400 text-sm tracking-wider font-medium"
                style={{ animation: "fadeUp 0.5s ease 0.2s both" }}
              >
                {active.detail}
              </div>
            </div>
          </div>

          {/* Bottom — step list */}
          <div className="border-t border-palette-900/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {approachItems.map((item, i) => (
              <div
                key={item.num}
                className={`transition-all duration-300 ${
                  i === activeIndex ? "opacity-100" : "opacity-25"
                }`}
              >
                <div className="text-xs text-palette-400 mb-1 font-mono">{item.num}</div>
                <div className={`text-sm font-medium ${i === activeIndex ? "text-palette-900" : "text-palette-400"}`}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
