"use client";

import { useEffect, useRef, useState } from "react";

const newsItems = [
  {
    num: "01",
    depth: "66",
    casing: "6",
    title: "п. Суета, Таштагольский район",
    description:
      "Шерегешское городское поселение, п. Суета. Пробурена скважина глубиной 66 м с обсадкой 6 м. Выполнены геологические изыскания, проведены лабораторные испытания грунта.",
    tag: "Геология",
  },
  {
    num: "02",
    depth: "102",
    casing: "60",
    title: "Шерегеш, гора Зелёная — МИП 3",
    description:
      "Горнолыжная инфраструктура, ул. Горнолыжная. Бурение скважины глубиной 102 м с обсадкой 60 м. Сложные горные условия, задействована тяжёлая буровая установка.",
    tag: "Бурение",
  },
  {
    num: "03",
    depth: "52",
    casing: "8",
    title: "п. Алтамаш, ул. Школьная, 1",
    description:
      "Таштагольский район, п. Алтамаш. Скважина глубиной 52 м, обсадка 8 м. Работы выполнены под инженерно-геологические изыскания для строительного объекта.",
    tag: "Изыскания",
  },
];

function NewsRow({ item, index }: { item: (typeof newsItems)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative border-t border-palette-900/10 py-10 overflow-hidden cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      <div className="relative z-10 grid md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 items-start">
        <div>
          <span className="font-display font-bold text-palette-900/20 block" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            {item.num}
          </span>
          <div className="mt-2 flex flex-col gap-0.5">
            <span className="text-xs text-palette-400 uppercase tracking-wider">Глубина / обсадка</span>
            <span className="font-display font-bold text-palette-900 text-lg leading-tight">
              {item.depth}<span className="text-palette-400 font-normal text-sm">м</span>
              <span className="text-palette-400 mx-1">/</span>
              {item.casing}<span className="text-palette-400 font-normal text-sm">м</span>
            </span>
          </div>
          <span className="text-xs font-medium text-palette-800 border border-palette-900/15 rounded-full px-3 py-1 mt-3 inline-block tracking-wider uppercase">
            {item.tag}
          </span>
        </div>

        <h3 className="font-bold text-palette-900 leading-snug" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
          {item.title}
        </h3>

        <p className="text-palette-800 leading-relaxed text-base">
          {item.description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-px bg-palette-900/10 w-0 group-hover:w-full transition-all duration-700" />
    </div>
  );
}

export function News() {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" style={{ pointerEvents: "none" }}>
        <defs>
          <pattern id="news-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E3146" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#news-grid)"/>
      </svg>

      <div className="container-section relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-palette-900">
            Хроника работ
          </h2>
          <span className="text-palette-400 text-sm md:text-base max-w-xs">
            Последние реализованные объекты и проекты
          </span>
        </div>

        <div className="mt-8">
          {newsItems.map((item, i) => (
            <NewsRow key={item.num} item={item} index={i} />
          ))}
          <div className="border-t border-palette-900/10" />
        </div>
      </div>
    </section>
  );
}
