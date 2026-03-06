"use client";

import { useEffect, useRef, useState } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const DOCS = [
  { href: "/assets/docs/Сертификат.pdf", label: "Сертификат" },
  { href: "/assets/docs/Аттестат.pdf", label: "Аттестат" },
  { href: "/presentation.pdf", label: "Презентация компании", highlight: true },
  { href: "/assets/docs/Разрещение.pdf", label: "Разрешение" },
];

const cards = [
  {
    title: "Лицензии и допуски",
    description: "Полный пакет разрешительной документации для всех видов буровых работ.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="#3F5E7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="6" width="28" height="36" rx="3"/>
        <path d="M17 16h14M17 22h14M17 28h8"/>
        <circle cx="34" cy="34" r="7" fill="#D9E0E7" stroke="#3F5E7B"/>
        <path d="M31 34l2 2 4-4" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: "Аттестованная лаборатория",
    description: "Лабораторные исследования грунтов на сертифицированном оборудовании.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="#3F5E7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6v18L10 38a2 2 0 001.8 2.9h24.4A2 2 0 0038 38L30 24V6"/>
        <path d="M16 6h16"/>
        <circle cx="20" cy="32" r="2" fill="#8EA9C3" stroke="none"/>
        <circle cx="27" cy="28" r="1.5" fill="#8EA9C3" stroke="none"/>
        <circle cx="24" cy="35" r="1" fill="#8EA9C3" stroke="none"/>
      </svg>
    ),
  },
  {
    title: "Технические отчёты",
    description: "Оформляем результаты с протоколами испытаний и заключениями специалистов.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="#3F5E7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="10" width="32" height="28" rx="2"/>
        <path d="M14 20h20M14 26h12"/>
        <polyline points="26,30 30,22 34,26 38,18" strokeWidth="1.5"/>
        <circle cx="38" cy="18" r="2" fill="#3F5E7B" stroke="none"/>
      </svg>
    ),
  },
  {
    title: "Соответствие законодательству",
    description: "Работаем строго по СНиП, ГОСТ и актуальным техническим регламентам.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="#3F5E7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4l4 8h8l-6.5 5 2.5 8L24 20l-8 5 2.5-8L12 12h8z"/>
        <path d="M24 28v16M16 38h16"/>
        <path d="M18 44h12"/>
      </svg>
    ),
  },
];

function CardItem({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
      }}
    >
      {/* Hover accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-palette-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="mb-4">{card.icon}</div>
      <h3 className="text-base font-bold text-palette-900 mb-2">{card.title}</h3>
      <p className="text-sm text-palette-800 leading-relaxed">{card.description}</p>
    </div>
  );
}

export function Documentation() {
  return (
    <section className="relative overflow-hidden py-20" style={{ background: "linear-gradient(145deg, #f0f4f8 0%, #ffffff 60%, #e8edf3 100%)" }}>

      {/* CAD-style background grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" style={{ pointerEvents: "none" }}>
        <defs>
          <pattern id="cadgrid-small" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#3F5E7B" strokeWidth="0.5"/>
          </pattern>
          <pattern id="cadgrid-large" width="120" height="120" patternUnits="userSpaceOnUse">
            <rect width="120" height="120" fill="url(#cadgrid-small)"/>
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#3F5E7B" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cadgrid-large)"/>
      </svg>

      {/* Abstract engineering lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ pointerEvents: "none" }}>
        {/* Cross-section diagram */}
        <line x1="50" y1="300" x2="1150" y2="300" stroke="#1E3146" strokeWidth="1"/>
        <line x1="600" y1="50" x2="600" y2="550" stroke="#1E3146" strokeWidth="1"/>
        {/* Dimension arrows */}
        <path d="M100 200 L200 200" stroke="#3F5E7B" strokeWidth="1" strokeDasharray="4 3"/>
        <path d="M100 400 L200 400" stroke="#3F5E7B" strokeWidth="1" strokeDasharray="4 3"/>
        <path d="M900 150 L1050 150" stroke="#3F5E7B" strokeWidth="1" strokeDasharray="4 3"/>
        <path d="M900 450 L1050 450" stroke="#3F5E7B" strokeWidth="1" strokeDasharray="4 3"/>
        {/* Circles / arcs */}
        <circle cx="600" cy="300" r="180" fill="none" stroke="#3F5E7B" strokeWidth="0.8"/>
        <circle cx="600" cy="300" r="90" fill="none" stroke="#3F5E7B" strokeWidth="0.8"/>
        {/* Corner markers */}
        <path d="M60 60 L120 60 L120 120" fill="none" stroke="#3F5E7B" strokeWidth="1"/>
        <path d="M1140 60 L1080 60 L1080 120" fill="none" stroke="#3F5E7B" strokeWidth="1"/>
        <path d="M60 540 L120 540 L120 480" fill="none" stroke="#3F5E7B" strokeWidth="1"/>
        <path d="M1140 540 L1080 540 L1080 480" fill="none" stroke="#3F5E7B" strokeWidth="1"/>
        {/* Schematic graph line */}
        <polyline points="250,400 320,350 400,370 480,320 560,340 640,290 720,310 800,260 880,280" fill="none" stroke="#8EA9C3" strokeWidth="1.5"/>
      </svg>

      <div className="container-section relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-palette-900 mb-4 text-center">
          Документация и соответствие
        </h2>
        <p className="text-palette-800 text-center text-lg mb-12 max-w-2xl mx-auto">
          Все виды работ выполняем с полным пакетом разрешительной документации в соответствии с требованиями законодательства.
        </p>

        {/* 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, i) => (
            <CardItem key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Document links */}
        <div className="flex flex-wrap gap-4 justify-center">
          {DOCS.map((doc) => (
            <a
              key={doc.href}
              href={`${base}${doc.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 rounded-lg px-5 py-3 font-medium transition-all duration-300 text-sm ${
                (doc as { highlight?: boolean }).highlight
                  ? "bg-palette-800 text-white hover:bg-palette-900"
                  : "bg-white/80 backdrop-blur-sm border border-palette-100 text-palette-800 hover:bg-palette-900 hover:text-white hover:border-palette-900"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              {doc.label}
              <span className="text-xs opacity-70 ml-1">PDF</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
