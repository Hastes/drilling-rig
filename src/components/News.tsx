"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredNews } from "@/data/news";
import type { NewsItem } from "@/data/news";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

function NewsRow({
  item,
  index,
  displayNum,
}: {
  item: NewsItem;
  index: number;
  displayNum?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
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
    <Link
      ref={ref}
      href={`/news/${item.slug}`}
      className="group relative border-t border-palette-900/10 py-10 overflow-hidden cursor-pointer block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      <div className="relative z-10 grid md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 items-start">
        <div>
          <span className="font-display font-bold text-palette-900/20 block" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            {displayNum ?? item.num}
          </span>
          <span className="text-xs font-medium text-palette-800 border border-palette-900/15 rounded-full px-3 py-1 mt-3 inline-block tracking-wider uppercase">
            {item.tag}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-palette-900 leading-snug" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
            {item.title}
          </h3>
          {item.previewImage && (
            <div className="mt-4 mx-auto w-full max-w-lg h-[60vh] max-h-[700px] md:h-44 md:max-h-none rounded-lg border border-palette-900/10 overflow-hidden relative">
              <Image
                src={`${base}${encodeURI(item.previewImage)}`}
                alt={item.title}
                fill
                className="object-cover object-bottom"
                sizes="(max-width: 768px) 100vw, 32rem"
              />
            </div>
          )}
        </div>

        <div>
          <p className="text-palette-800 leading-relaxed text-base">
            {item.description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px bg-palette-900/10 w-0 group-hover:w-full transition-all duration-700" />
    </Link>
  );
}

export function News() {
  const featuredSorted = [...featuredNews].sort(
    (a, b) => Number.parseInt(b.num, 10) - Number.parseInt(a.num, 10)
  );

  return (
    <section id="news" className="relative bg-white py-20 overflow-hidden">
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
            Новости
          </h2>
        </div>

        <div className="mt-8">
          <div className="mb-10">
            <h3 className="text-palette-400 text-sm md:text-base mb-3">
              Актуальные новости
            </h3>
            {featuredSorted.map((item, i) => (
              <NewsRow
                key={item.num}
                item={item}
                index={i}
                displayNum={`${i + 1}`.padStart(2, "0")}
              />
            ))}
          </div>

          {/* Раздел реализованных проектов временно скрыт */}
        </div>
      </div>

    </section>
  );
}
