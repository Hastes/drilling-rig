"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
  {
    num: "04",
    depth: "—",
    casing: "—",
    title: "Творческий конкурс к 60-летию Дня геолога",
    description:
      "ООО «Промбурсервис» объявляет творческий конкурс для всех возрастных категорий. Нажмите, чтобы прочитать полное положение о конкурсе.",
    tag: "Конкурс",
    previewImage: "/assets/new1/2026-03-19_14-14-42.png",
    attachmentPdf: "/assets/new1/60 лет ДНЮ ГЕОЛОГА_Положение о конкурсе.pdf",
    fullText:
      "ООО Промбурсервис объявляет о творческом конкурсе к 60-летию Дня геолога!\n\nПосёлок Елань Новокузнецкого района Кемеровской области России связан с геологическими исследованиями. В народе посёлок называют «посёлком геологов». Геологи из Елани вели поиск полезных ископаемых не только в Кемеровской области и на Алтае, но и в зарубежных странах. В связи с чем, большинство семей поселка так или иначе связанно с этой профессией.\n\nОрганизация «Промбурсервис», руководитель которой тоже родился в поселке и продолжает семейное дело по поиску полезных ископаемых, решила организовать творческий конкурс для всех возрастных категорий не только поселка Елань, но и всех желающих.\n\nПобедителей ждут дипломы и памятные призы, а все участники получат сувениры и сертификаты.\n\nКатегории конкурса:\n1. ТЕМАТИЧЕСКИЙ РИСУНОК (изображающий профессии геолога, машиниста буровой установки и т.п., камни и минералы)\n2. О ПРОФЕССИИ ПЕРОМ (стихотворения собственного сочинения, поздравления, эссе, очерки, рассказы, воспоминания)\n3. ОТКРЫТКА (созданная средствами современных технологий или искусственного интеллекта картинка, коллаж)\n4. ФОТО (архивные, тематические фото, фотоколлажи, фото ветеранов отрасли, коллажи геологов тогда/сейчас)\n\nРаботы принимаются до 31 марта 2026.\nПо адресу: п. Елань, Производственное здание напротив общежития по ул. Советская, 1.\nПо телефону: +7 (905) 917-00-23.\nНа электронный адрес: ooo.pbs54@mail.ru.",
  },
];

const featuredNews = newsItems.filter((item) => item.tag === "Конкурс");
const projectNews = newsItems.filter((item) => item.tag !== "Конкурс");

function NewsRow({
  item,
  index,
  showMetrics = true,
  onOpenFullText,
}: {
  item: (typeof newsItems)[0];
  index: number;
  showMetrics?: boolean;
  onOpenFullText?: (item: (typeof newsItems)[0]) => void;
}) {
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

  const hasMetrics = /^\d+$/.test(item.depth) && /^\d+$/.test(item.casing);
  const isFeatured = !showMetrics;

  return (
    <div
      ref={ref}
      className={`group relative border-t border-palette-900/10 py-10 overflow-hidden ${isFeatured ? "cursor-pointer" : "cursor-default"}`}
      onClick={() => isFeatured && onOpenFullText?.(item)}
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
          {showMetrics && (
            <div className="mt-2 flex flex-col gap-0.5">
              <span className="text-xs text-palette-400 uppercase tracking-wider">Глубина / обсадка</span>
              <span className="font-display font-bold text-palette-900 text-lg leading-tight">
                {hasMetrics ? (
                  <>
                    {item.depth}<span className="text-palette-400 font-normal text-sm">м</span>
                    <span className="text-palette-400 mx-1">/</span>
                    {item.casing}<span className="text-palette-400 font-normal text-sm">м</span>
                  </>
                ) : (
                  <span className="text-palette-400 font-normal text-sm">—</span>
                )}
              </span>
            </div>
          )}
          <span className="text-xs font-medium text-palette-800 border border-palette-900/15 rounded-full px-3 py-1 mt-3 inline-block tracking-wider uppercase">
            {item.tag}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-palette-900 leading-snug" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
            {item.title}
          </h3>
          {isFeatured && item.previewImage && (
            <div className="mt-4 mx-auto w-full max-w-lg h-40 md:h-44 rounded-lg border border-palette-900/10 overflow-hidden relative">
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
          {isFeatured && item.attachmentPdf && (
            <a
              href={`${base}${encodeURI(item.attachmentPdf)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 rounded-lg px-4 py-2 text-sm font-medium border border-palette-900/20 text-palette-900 hover:bg-palette-900 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Положение о конкурсе (PDF)
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px bg-palette-900/10 w-0 group-hover:w-full transition-all duration-700" />
    </div>
  );
}

export function News() {
  const [selectedNews, setSelectedNews] = useState<(typeof newsItems)[0] | null>(null);

  const closeModal = () => setSelectedNews(null);

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
            {featuredNews.map((item, i) => (
              <NewsRow
                key={item.num}
                item={item}
                index={i}
                showMetrics={false}
                onOpenFullText={setSelectedNews}
              />
            ))}
          </div>

          <div>
            <h3 className="text-palette-400 text-sm md:text-base mb-3">
              Последние реализованные объекты и проекты
            </h3>
            {projectNews.map((item, i) => (
              <NewsRow key={item.num} item={item} index={i} />
            ))}
          </div>

          <div className="border-t border-palette-900/10" />
        </div>
      </div>

      {selectedNews?.fullText && (
        <div
          className="fixed inset-0 z-[110] bg-black/70 flex items-center justify-center p-4"
          onClick={closeModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && closeModal()}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-palette-900 mb-4">{selectedNews.title}</h3>
            <div className="space-y-4 text-palette-800 leading-relaxed whitespace-pre-line">
              {selectedNews.fullText}
            </div>
            {selectedNews.attachmentPdf && (
              <a
                href={`${base}${encodeURI(selectedNews.attachmentPdf)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 rounded-lg px-4 py-2 text-sm font-medium bg-palette-800 text-white hover:bg-palette-900 transition-colors"
              >
                Открыть PDF-вложение
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
